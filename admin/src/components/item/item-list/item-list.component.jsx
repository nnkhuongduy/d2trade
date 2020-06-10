import React from 'react'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Grid
} from '@material-ui/core'

import ItemChips from '../item-chips/item-chips.component'
import ItemImg from '../item-img/item-img.component'

const useStyles = makeStyles(theme => ({
  img: {
    margin: '0 auto',
    width: 'max-content',
    height: 'max-content',
    display: 'flex',
    alignItems: 'center',
  },
  unAvailable: {
    filter: 'grayscale(100%)'
  },
  nameDisabled: {
    textDecoration: 'line-through'
  }
}))

const ItemList = ({ item }) => {
  const classes = useStyles()

  return (
    <Grid container wrap='nowrap' alignItems='center'>
      <Grid item xs={2}>
        <div className={clsx(classes.img, {
          [classes.unAvailable]: !item.available || item.configs.isDisabled
        })}>
          <ItemImg perc={30} src={item.iconUrl} />
        </div>
      </Grid>
      <Grid item xs={3} className={clsx({
        [classes.nameDisabled]: item.configs.isDisabled
      })}>
        {item.name}
      </Grid>
      <Grid item xs={2}>
        {item.prices.vnd.toLocaleString('en-US')}
      </Grid>
      <Grid item xs={5}>
        <ItemChips item={item} />
      </Grid>
    </Grid>
  )
}

export default ItemList