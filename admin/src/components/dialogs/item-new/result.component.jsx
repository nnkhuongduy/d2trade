import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Grid, CircularProgress, Typography, Divider, Chip, Avatar
} from '@material-ui/core'

import { selectFetchingState } from '../../../redux/item/item.selectors'

const useStyles = makeStyles(theme => ({
  result: {
    width: 280,
    padding: theme.spacing(3)
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

const Result = ({ item, fetching }) => {
  const classes = useStyles()

  return (
    <Paper elevation={2} className={classes.result}>
      <Grid container spacing={1} direction='column' alignItems='center'>
        {fetching && <CircularProgress color='primary' />}
        {!fetching &&
          <>
            <Grid item>
              <div className={classes.img}>
                {item && item.icon_url && <img
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
                  color: item && item.nameColor !== 'D2D2D2' && `#${item.nameColor}`,
                  textAlign: 'center'
                }}
              >
                {item ? item.name : 'Tên Item'}
              </Typography>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant='body2'>Giá:</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Typography>{item && item.prices.usd && item.prices.usd}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{item && '-'}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{item && item.prices.vnd && item.prices.vnd.toLocaleString('en-US')}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: 20, alignSelf: 'flex-start' }}>
              <Grid container spacing={1}>
                <Grid item>
                  {item && item.hero.name &&
                    <Chip
                      label={item.hero.name}
                      avatar={<Avatar src={item.hero.src} />}
                      clickable
                      color='primary'
                    />
                  }
                </Grid>
                <Grid item>
                  {item && item.rarity.label &&
                    <Chip
                      label={item.rarity.label}
                      clickable
                      style={{ backgroundColor: item.rarity.color }}
                    />
                  }
                </Grid>
                <Grid item>
                  {item && item.configs.isInscribed &&
                    <Chip
                      label='Inscribed'
                      clickable
                      style={{ backgroundColor: '#CF6A32', color: 'white' }}
                    />
                  }
                </Grid>
                <Grid item>
                  {item && item.configs.isNonMarket &&
                    <Chip
                      label='Non-market'
                      clickable
                      color='secondary'
                    />
                  }
                </Grid>
              </Grid>
            </Grid>
          </>
        }
      </Grid>
    </Paper>
  )
}

const mapStateToProps = createStructuredSelector({
  fetching: selectFetchingState
})

export default connect(mapStateToProps)(Result)