import React from 'react'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Grid, Typography, Divider
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  result: {
    width: 100,
    padding: theme.spacing(1),
    boxSizing: 'border-box',
  },
  selectable: {
    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(105%)'
    }
  },
  disabled: {
    filter: 'brightness(50%)',
    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(60%)'
    }
  },
  img: {
    width: (256 * 30 / 100),
    height: (171 * 30 / 100),
    backgroundColor: 'gray'
  },
  price: {
    fontSize: theme.typography.pxToRem(13)
  },
  inscribed: {
    backgroundColor: theme.palette.item.inscribed,
    '&:hover': {
      backgroundColor: theme.palette.item.inscribed,
    },
    '&:focus': {
      backgroundColor: theme.palette.item.inscribed,
    },
  },
  immortal: {
    backgroundColor: theme.palette.item.immortal,
    '&:hover': {
      backgroundColor: theme.palette.item.immortal,
    },
    '&:focus': {
      backgroundColor: theme.palette.item.immortal,
    },
  },
  arcana: {
    backgroundColor: theme.palette.item.arcana,
    '&:hover': {
      backgroundColor: theme.palette.item.arcana,
    },
    '&:focus': {
      backgroundColor: theme.palette.item.arcana,
    },
  }
}))

const iconUrl = 'https://steamcommunity-a.akamaihd.net/economy/image/'

const ItemCard = ({ item, selectable, onClick, disabled }) => {
  const classes = useStyles()

  return (
    <Paper
      elevation={2}
      className={clsx(classes.result, {
        [classes.selectable]: selectable,
        [classes.disabled]: disabled
      })}
      onClick={() => selectable && onClick(item)}
    >
      <Grid container spacing={1} direction='column' alignItems='center'>
        <Grid item>
          <div className={classes.img}>
            <img
              src={item.assetId === 'moneyItem' ? item.iconUrl : iconUrl + item.iconUrl}
              alt='item_icon'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Typography
            variant='body2'
            className={classes.price}
          >
            {/* {item.assetId === 'moneyItem' ? 'Số dư' : `${item.prices.vnd.toLocaleString('en-US')} VND`} */}
            {item.prices.vnd.toLocaleString('en-US')} VND
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ItemCard