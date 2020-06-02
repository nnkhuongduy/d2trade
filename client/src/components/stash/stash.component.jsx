import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Paper, Typography
} from '@material-ui/core'

import UserInfo from '../info/user-info.component'
import StashUser from './stash-user.component'
import StashBot from './stash-bot.component'

import { selectBotTotal, selectUserTotalwMoney } from '../../redux/stash/stash.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    width: '100%'
  }
}))

const Stash = ({ type, botTotal, userTotal }) => {
  const classes = useStyles()

  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Grid container alignItems='center' justify='space-between'>
            <Grid item>
              <UserInfo user={type === 'user'} />
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>
                {(type === 'user' ? userTotal : botTotal).toLocaleString('en-US')} VND
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {type === 'user' ? <StashUser /> : <StashBot />}
        </Grid>
      </Grid>
    </Paper>
  )
}

const mapStateToProps = createStructuredSelector({
  botTotal: selectBotTotal,
  userTotal: selectUserTotalwMoney,
})

export default connect(mapStateToProps)(Stash)