import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Tabs, Tab, Box, Collapse, Button,
  Dialog, DialogContent, DialogActions
} from '@material-ui/core'

import Info from './info.component'
import Configs from './configs.component'
import DateTab from './date.component'
import ItemCard from '../../item/item-card/item-card.component'

import { putItemStart } from '../../../redux/item/item.actions'

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

const ItemInfoDialog = ({ open, onClose, item, putItem }) => {
  const classes = useStyles()
  const [currentItem, setCurrentItem] = useState(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    setTab(0)
    if (open) setCurrentItem(item)
    else setCurrentItem(null)
    //eslint-disable-next-line
  }, [open])

  const onConfirm = () => {
    putItem(currentItem)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='lg'
    >
      <DialogContent className={classes.root}>
        {currentItem &&
          <Grid container spacing={5}>
            <Grid item>
              <ItemCard item={currentItem} />
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
                  label='Thông tin'
                  classes={{ root: classes.tab }}
                />
                <Tab
                  id='item-tabs-1'
                  aria-controls='item-tabpanel-1'
                  label='Thiết lập'
                  classes={{ root: classes.tab }}
                />
                <Tab
                  id='item-tabs-2'
                  aria-controls='item-tabpanel-2'
                  label='Khác'
                  classes={{ root: classes.tab }}
                />
              </Tabs>
              <Box p={1} style={{ marginTop: 20 }}>
                <Collapse in={tab === 0}>
                  <Info item={currentItem} onChange={item => setCurrentItem(item)} />
                </Collapse>
                <Collapse in={tab === 1}>
                  <Configs item={currentItem} onChange={item => setCurrentItem(item)} />
                </Collapse>
                <Collapse in={tab === 2}>
                  <DateTab item={currentItem} />
                </Collapse>
              </Box>
            </Grid>
          </Grid>}
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' className={classes.cancel} onClick={onClose}>Hủy bỏ</Button>
        <Button variant='contained' color='primary' onClick={onConfirm}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
  putItem: item => dispatch(putItemStart(item))
})

export default connect(null, mapDispatchToProps)(ItemInfoDialog)