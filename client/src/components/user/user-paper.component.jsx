import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Grid, Avatar, Typography, Badge
} from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'

import { checkTradeUrl } from '../../helpers/helpers'

import { selectCurrentUser } from '../../redux/user/user.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    boxSizing: 'borderBox',
    textAlign: 'center'
  },
  check: {
    width: 30,
    height: 30,
    color: theme.palette.success.main,
  },
  avatar: {
    width: 150,
    height: 150
  },
  balance: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    color: 'white'
  }
}))

const UserPaper = ({ user }) => {
  const classes = useStyles()

  if (user) return (
    <Paper elevation={3} className={classes.root}>
      <Grid container direction='column' spacing={3} alignItems='center'>
        <Grid item>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={checkTradeUrl(user.tradeOfferUrl) && <CheckCircle className={classes.check} />}
          >
            <Avatar src={user.avatar} className={classes.avatar} />
          </Badge>
        </Grid>
        <Grid item>
          <Typography variant='h6'>{user.personaname}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle2'>Số dư tài khoản:</Typography>
          <Typography className={classes.balance}>{user.accountBalance.toLocaleString('en-US')} VND</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
  else return (
    <>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

export default connect(mapStateToProps)(UserPaper)