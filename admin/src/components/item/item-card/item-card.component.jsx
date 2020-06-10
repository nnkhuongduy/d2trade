import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Grid, Typography, Divider, Chip, Avatar
} from '@material-ui/core'

import { selectHeroes } from '../../../redux/hero/hero.selectors'

const useStyles = makeStyles(theme => ({
  result: {
    width: 280,
    padding: theme.spacing(3),
    boxSizing: 'border-box',
  },
  unavailable: {
    filter: 'brightness(60%)'
  },
  selectable: {
    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(110%)'
    }
  },
  selectableUnavailable: {
    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(65%)'
    }
  },
  img: {
    width: (256 * 60 / 100),
    height: (171 * 60 / 100),
    backgroundColor: 'gray'
  },
  imgDisabled: {
    filter: 'grayscale(100%)'
  },
  nameDisabled: {
    textDecoration: 'line-through'
  },
  chip: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      filter: 'brightness(105%)'
    }
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

const ItemCard = ({ item, heroes, width, selectable, onClick }) => {
  const classes = useStyles()
  const [hero, setHero] = useState(null)

  useEffect(() => {
    if (heroes)
      setHero(heroes.filter(hero => hero.localized_name === item.hero)[0])
    //eslint-disable-next-line
  }, [item])

  return (
    <Paper
      elevation={3}
      className={clsx(classes.result, {
        [classes.selectable]: selectable,
        [classes.unavailable]: item.unavailable,
        [classes.selectableUnavailable]: selectable && item.unavailable,
      })}
      style={{ width: width && width }}
      onClick={() => selectable && onClick(item)}
    >
      <Grid container spacing={1} direction='column' alignItems='center'>
        <Grid item>
          <div className={classes.img} style={{ width: width && (width / 100 * 60), height: width && ((width / 100 * 60) * 171 / 256) }}>
            {(item.iconUrl || item.icon_url) && <img
              src={iconUrl + (item.iconUrl ? item.iconUrl : item.icon_url)}
              alt='item_icon'
              style={{ width: '100%', height: '100%' }}
              className={clsx({ [classes.imgDisabled]: item.configs.isDisabled })}
            />}
          </div>
        </Grid>
        <Grid item>
          <Typography
            variant='h6'
            style={{
              textAlign: 'center',
              fontSize: width <= 240 ? 14 : 16
            }}
            className={clsx({ [classes.nameDisabled]: item.configs.isDisabled })}
          >
            {item.name}
          </Typography>
        </Grid>
        <Divider flexItem />
        <Grid item>
          <Typography variant='body2'>Giá:</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1} justify='center'>
            <Grid item>
              <Typography variant='body2'>{item.prices.usd}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>-</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>{item.prices.vnd.toLocaleString('en-US')}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 12, alignSelf: 'flex-start' }}>
          <Grid container spacing={1}>
            {item.hero &&
              <Grid item>
                <Chip
                  size='small'
                  label={item.hero}
                  avatar={<Avatar src={hero && hero.portrait_url} />}
                  clickable={!selectable}
                  color='primary'
                />
              </Grid>
            }
            {item.rarity &&
              <Grid item>
                <Chip
                  size='small'
                  label={item.rarity}
                  clickable={!selectable}
                  className={classes[item.rarity.toLowerCase()]}
                />
              </Grid>
            }
            {item.configs.isNonMarket &&
              <Grid item>
                <Chip
                  size='small'
                  label='Non-market'
                  clickable={!selectable}
                  color='secondary'
                />
              </Grid>
            }
            {item.configs.isDisabled &&
              <Grid item>
                <Chip
                  size='small'
                  label='Disabled'
                  clickable={!selectable}
                />
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

const mapStateToProps = createStructuredSelector({
  heroes: selectHeroes
})

export default connect(mapStateToProps)(ItemCard)