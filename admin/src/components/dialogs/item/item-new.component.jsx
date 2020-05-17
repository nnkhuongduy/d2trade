import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Tabs, Tab, Box, Collapse, Button,
  Dialog, DialogContent, DialogActions, CircularProgress
} from '@material-ui/core'

import FetchItem from './fetch.component'
import Info from './info.component'
import Configs from './configs.component'
import ItemCard from '../../item/item-card/item-card.component'

import { postItemStart, fetchItemSuccess } from '../../../redux/item/item.actions'

import { selectItem, selectFetchingState } from '../../../redux/item/item.selectors'

const INITIAL_ITEM = {
  icon_url: "",
  name: "Tên Item",
  nameColor: "D2D2D2",
  prices: {
    usd: 0,
    vnd: 0
  },
  hero: null,
  rarity: null,
  configs: {
    isNonMarket: false,
    isDisabled: false
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`
  },
  tab: {
    minWidth: 100
  },
  cancel: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  }
}))

const ItemNewDialog = ({ fetchItemSuccess, open, onClose, item, postItem, fetching, initialItem }) => {
  const classes = useStyles()
  const [currentItem, setCurrentItem] = useState(initialItem ? initialItem : INITIAL_ITEM)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (item) {
      setCurrentItem({
        ...INITIAL_ITEM,
        ...item,
        configs: {
          ...INITIAL_ITEM.configs,
        }
      })
      setTab(1)
    } else {
      setCurrentItem(INITIAL_ITEM)
    }
    //eslint-disable-next-line
  }, [item])

  useEffect(() => {
    setCurrentItem(initialItem ? initialItem : INITIAL_ITEM)
    setTab(initialItem ? 1 : 0)
    fetchItemSuccess(initialItem ? initialItem : null)
    //eslint-disable-next-line
  }, [open])

  const confirmClick = () => {
    if (currentItem && (currentItem.hero && currentItem.rarity && currentItem.prices.usd && currentItem.prices.vnd)) {
      postItem(currentItem)
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick
      maxWidth='lg'
    >
      <DialogContent className={classes.root}>
        <Grid container spacing={5}>
          <Grid item>
            {fetching ?
              <Box style={{ width: 280, position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
              </Box> : <ItemCard item={currentItem} />}
          </Grid>
          <Grid item style={{ width: 400 }}>
            <Tabs
              value={tab}
              onChange={(e, val) => setTab(val)}
              indicatorColor="primary"
              textColor="primary"
              aria-label='item tabs'
              variant='fullWidth'
            >
              <Tab
                id='item-tabs-0'
                aria-controls='item-tabpanel-0'
                label='Tìm'
                classes={{ root: classes.tab }}

              />
              <Tab
                id='item-tabs-1'
                aria-controls='item-tabpanel-1'
                label='Thông tin'
                classes={{ root: classes.tab }}
                disabled={!item}
              />
              <Tab
                id='item-tabs-2'
                aria-controls='item-tabpanel-2'
                label='Thiết lập'
                classes={{ root: classes.tab }}
                disabled={!item}
              />
            </Tabs>
            <Box p={1} style={{ marginTop: 20 }}>
              <Collapse in={tab === 0}>
                <FetchItem item={currentItem} onMarketChange={item => setCurrentItem(item)} />
              </Collapse>
              <Collapse in={tab === 1}>
                <Info item={currentItem} onChange={item => setCurrentItem(item)} />
              </Collapse>
              <Collapse in={tab === 2}>
                <Configs item={currentItem} onChange={item => setCurrentItem(item)} />
              </Collapse>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' className={classes.cancel} onClick={onClose}>Hủy bỏ</Button>
        <Button variant='contained' color='primary' onClick={confirmClick}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
  postItem: item => dispatch(postItemStart(item)),
  fetchItemSuccess: item => dispatch(fetchItemSuccess(item))
})

const mapStateToProps = createStructuredSelector({
  item: selectItem,
  fetching: selectFetchingState
})


export default connect(mapStateToProps, mapDispatchToProps)(ItemNewDialog)