import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Grid, CircularProgress, Typography, Divider
} from '@material-ui/core'

import InfoContainer from '../../info-container/info-container.component'

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
  info: {
    width: '50%'
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
                {item && <img src={iconUrl + item.icon_url} alt='item_icon' style={{ width: '100%', height: '100%' }} />}
              </div>
            </Grid>
            <Grid item style={{ textAlign: 'center' }}>
              <Typography variant='h6' style={{ color: item && item.nameColor !== 'D2D2D2' && `#${item.nameColor}` }}>{item ? item.name : 'Tên Item'}</Typography>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant='body2'>Giá:</Typography>
            </Grid>
            <Grid item className={classes.info}>
              <InfoContainer info={{ label: 'USD', value: item ? item.prices.usd : '0' }} dense />
            </Grid>
            <Grid item className={classes.info}>
              <InfoContainer info={{ label: 'VND', value: item ? item.prices.vnd : '0', isBalance: true }} dense />
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