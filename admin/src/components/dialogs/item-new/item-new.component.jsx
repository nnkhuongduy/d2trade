import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Tabs, Tab, Box, Collapse, Button,
  Dialog, DialogContent, DialogActions
} from '@material-ui/core'

import FetchItem from './fetch-item.component'
import Result from './result.component'
import Info from './info.component'
import Configs from './configs.component'
import ConfigSwitch from './switch.component'

import { postItemStart } from '../../../redux/item/item.actions'

import { selectItem } from '../../../redux/item/item.selectors'

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

const ItemNewDialog = ({ open, onClose, item, postItem }) => {
  const classes = useStyles()
  const [currentItem, setCurrentItem] = useState(null)
  const [tab, setTab] = useState(0)
  const [market, setMarket] = useState(false)

  useEffect(() => {
    if (item) {
      setCurrentItem({
        ...item,
        hero: {
          name: null,
          src: null
        },
        rarity: {
          label: null,
          color: null
        },
        configs: {
          isNonMarket: false,
          isInscribed: false,
        }
      })
      setTab(1)
    } else {
      setCurrentItem(null)
    }
  }, [item])

  useEffect(() => {
    if (market) {
      if (!currentItem)
        setCurrentItem({
          commodity: true,
          icon_url: "",
          name: "",
          nameColor: "D2D2D2",
          prices: {
            usd: 0,
            vnd: 0
          },
          hero: {
            name: null,
            src: null
          },
          rarity: {
            label: null,
            color: null
          },
          configs: {
            isNonMarket: true,
            isInscribed: false,
          }
        })
    } else {
      if (item)
        setCurrentItem({
          ...item,
          hero: {
            name: null,
            src: null
          },
          rarity: {
            label: null,
            color: null
          },
          configs: {
            isNonMarket: false,
            isInscribed: false,
          }
        })
      else setCurrentItem(null)
    }
    //eslint-disable-next-line
  }, [market])

  useEffect(() => {
    setCurrentItem(null)
    setTab(0)
    //eslint-disable-next-line
  }, [open])

  const onChangeItem = useCallback(obj => {
    if (currentItem) {
      const newItem = { ...currentItem }

      Object.keys(obj).forEach(key => {
        if (newItem[key] !== undefined) {
          if (typeof obj[key] === "object" && typeof obj[key] !== "null")
            Object.keys(obj[key]).forEach(subKey => {
              newItem[key][subKey] = obj[key][subKey]
            })
          else newItem[key] = obj[key]
        }
      })

      setCurrentItem(newItem)
    }
  }, [currentItem])

  const confirmClick = useCallback(() => {
    if (currentItem) postItem(currentItem)
    onClose()
    //eslint-disable-next-line
  }, [currentItem])

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
            <Result item={currentItem} />
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
                disabled={!currentItem}
              />
              <Tab
                id='item-tabs-2'
                aria-controls='item-tabpanel-2'
                label='Thiết lập'
                classes={{ root: classes.tab }}
                disabled={!currentItem}
              />
            </Tabs>
            <Collapse in={tab === 0}>
              <Box p={1} style={{ marginTop: 20 }}>
                <Grid container direction='column' spacing={2} alignItems='center'>
                  <Grid item>
                    <FetchItem currentItem={currentItem} nonMarket={market} setMarket={val => setMarket(val)} />
                  </Grid>
                  <Grid item>
                    <ConfigSwitch
                      label='Item không có trên market'
                      caption='Không sử dụng market để tìm item. Dùng cho những item không có trên market'
                      name='isMarket'
                      value={market}
                      onChange={() => setMarket(!market)}
                      disabled={Boolean(item)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
            <Collapse in={tab === 1}>
              <Box p={1} style={{ marginTop: 20 }}>
                <Info item={currentItem} onChange={onChangeItem} />
              </Box>
            </Collapse>
            <Collapse in={tab === 2}>
              <Box p={1} style={{ marginTop: 20 }}>
                <Configs item={currentItem} onChange={onChangeItem} />
              </Box>
            </Collapse>
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
  postItem: item => dispatch(postItemStart(item))
})

const mapStateToProps = createStructuredSelector({
  item: selectItem
})


export default connect(mapStateToProps, mapDispatchToProps)(ItemNewDialog)