import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Grid, Typography, Divider, Chip, Avatar
} from '@material-ui/core'

import { selectHeroes } from '../../redux/hero/hero.selectors'

const useStyles = makeStyles(theme => ({
  result: {
    width: 220,
    padding: theme.spacing(3),
    boxSizing: 'border-box'
  },
  img: {
    width: (256 * 60 / 100),
    height: (171 * 60 / 100),
    backgroundColor: 'gray'
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
    }
  },
  immortal: {
    backgroundColor: theme.palette.item.immortal,
    '&:hover': {
      backgroundColor: theme.palette.item.immortal,
    }
  },
  arcana: {
    backgroundColor: theme.palette.item.arcana,
    '&:hover': {
      backgroundColor: theme.palette.item.arcana,
    }
  }
}))

const iconUrl = 'https://steamcommunity-a.akamaihd.net/economy/image/'

const ItemCard = ({ item, heroes, width }) => {
  const classes = useStyles()
  const [hero, setHero] = useState(null)

  useEffect(() => {
    if (heroes)
      setHero(heroes.filter(hero => hero.localized_name === item.hero.name)[0])
  }, [heroes])

  return (
    <Paper elevation={2} className={classes.result} style={{ width: width && width }}>
      <Grid container spacing={1} direction='column' alignItems='center'>
        <Grid item>
          <div className={classes.img} style={{ width: width && (width / 100 * 60), height: width && ((width / 100 * 60) * 171 / 256) }}>
            {item.icon_url && <img
              src={iconUrl + item.icon_url}
              alt='item_icon'
              style={{ width: '100%', height: '100%' }}
            />}
          </div>
        </Grid>
        <Grid item>
          <Typography
            variant='h6'
            style={{
              color: item.nameColor !== 'D2D2D2' && `#${item.nameColor}`,
              textAlign: 'center',
              fontSize: width <= 240 ? 14 : 16
            }}
          >
            {item.name}
          </Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
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
        <Grid item style={{ marginTop: 20, alignSelf: 'flex-start' }}>
          <Grid container spacing={1}>
            <Grid item>
              {item.hero.name &&
                <Chip
                  label={item.hero.name}
                  avatar={<Avatar src={hero && hero.portrait_url} />}
                  clickable
                  color='primary'
                />
              }
            </Grid>
            <Grid item>
              {item.rarity.label &&
                <Chip
                  label={item.rarity.label}
                  clickable
                  style={{ backgroundColor: item.rarity.color }}
                />
              }
            </Grid>
            <Grid item>
              {item.configs.isInscribed &&
                <Chip
                  label='Inscribed'
                  clickable
                  style={{ backgroundColor: '#CF6A32', color: 'white' }}
                />
              }
            </Grid>
            <Grid item>
              {item.configs.isNonMarket &&
                <Chip
                  label='Non-market'
                  clickable
                  color='secondary'
                />
              }
            </Grid>
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