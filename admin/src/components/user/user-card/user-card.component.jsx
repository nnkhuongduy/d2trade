import React from 'react'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Typography
} from '@material-ui/core'

import UserAvatar from '../user-avatar/user-avatar.component'

const useStyles = makeStyles(theme => ({
  contentSmall: {
    padding: theme.spacing(1)
  },
  contentMedium: {
    padding: theme.spacing(3)
  },
  balance: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.primary.dark,
    color: 'white'
  }
}))

const UserCard = ({ user, size }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='column'
      spacing={size === 'small' ? 1 : 3}
      alignItems='center'
      className={clsx({
        [classes.contentSmall]: size === 'small',
        [classes.contentMedium]: size === 'medium',
      })}
    >
      <Grid item>
        <UserAvatar user={user} size={size} />
      </Grid>
      <Grid item>
        <Typography variant={size === 'small' ? 'h6' : 'h4'}>{user.personaname}</Typography>
      </Grid>
      <Grid item>
        <Typography variant='body2' style={size === 'small' ? null : { marginTop: '-15px' }}>{user.steamid}</Typography>
      </Grid>
      <Grid item>
        <Typography variant='subtitle2'>Số dư tài khoản:</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.balance}>{user.accountBalance.toLocaleString('en-US')}</Typography>
      </Grid>
    </Grid>
  )
}

export default UserCard