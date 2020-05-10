import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid,
  Dialog, DialogContent,
} from '@material-ui/core'

import FetchItem from './fetch-item.component'
import Result from './result.component'
import Info from './info.component'

import { selectItem } from '../../../redux/item/item.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`
  },
}))

const ItemNewDialog = ({ open, onClose, item }) => {
  const classes = useStyles()
  const [currentItem, setCurrentItem] = useState(null)

  useEffect(() => {
    if (item) setCurrentItem({ ...item, hero: null })
  }, [item])

  useEffect(() => {
    console.log(currentItem)
  }, [currentItem])

  const onChangeItem = useCallback(obj => {
    if (currentItem) {
      const newItem = { ...currentItem }

      Object.keys(obj).forEach(key => {
        if (newItem[key])
          newItem[key] = obj[key]
      })

      setCurrentItem(newItem)
    }
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
          <Grid item>
            <Grid container spacing={2} direction='column' style={{ width: 300 }} alignItems='center'>
              <Grid item>
                <FetchItem />
              </Grid>
              <Grid item>
                <Info item={currentItem} onChange={onChangeItem} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = createStructuredSelector({
  item: selectItem
})


export default connect(mapStateToProps)(ItemNewDialog)