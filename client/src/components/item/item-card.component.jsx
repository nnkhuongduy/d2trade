import React from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles, withStyles } from '@material-ui/styles'
import {
  Paper, Grid, Typography, Divider, Tooltip
} from '@material-ui/core'

import { selectHeroes } from '../../redux/heroes/heroes.selectors'

const useStyles = makeStyles(theme => ({
  result: {
    width: 100,
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      width: 80,
    }
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
    backgroundColor: 'gray',
    [theme.breakpoints.down('md')]: {
      width: (256 * 20 / 100),
      height: (171 * 20 / 100),
    }
  },
  price: {
    fontSize: theme.typography.pxToRem(13),
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(10),
    }
  },
  immortal: {
    border: `2px solid ${theme.palette.item.immortal}`
  },
  arcana: {
    border: `2px solid ${theme.palette.item.aracana}`
  },
  hero: {
    width: (127 / 3),
    height: (71 / 3)
  }
}))

const iconUrl = 'https://steamcommunity-a.akamaihd.net/economy/image/'

const ItemTooltip = withStyles(theme => ({
  tooltip: {
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(2)
  }
}))(Tooltip)

const ItemCard = ({ item, selectable, onClick, disabled, heroes }) => {
  const classes = useStyles()

  return (
    <ItemTooltip
      title={item.assetId !== 'moneyItem' ?
        <>
          <Grid container direction='column' alignItems='center' spacing={1}>
            <Grid item>
              <Typography>{item.name}</Typography>
            </Grid>
            {heroes && <Grid item>
              <img className={classes.hero} src={heroes.find(hero => hero.localized_name === item.hero).portrait_url} alt='hero_img' />
            </Grid>}
          </Grid>
        </> :
        'Số dư'
      }
      interactive
      enterDelay={1000}
      arrow
    >
      <Paper
        elevation={2}
        className={clsx(classes.result, classes[item.rarity.toLowerCase()], {
          [classes.selectable]: selectable,
          [classes.disabled]: disabled,
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
              {item.prices.vnd.toLocaleString('en-US')} VND
          </Typography>
          </Grid>
        </Grid>
      </Paper>
    </ItemTooltip>
  )
}

const mapStateToProps = createStructuredSelector({
  heroes: selectHeroes
})

export default connect(mapStateToProps)(ItemCard)