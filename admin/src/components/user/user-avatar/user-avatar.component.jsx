import React from 'react'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Badge, Avatar
} from '@material-ui/core'
import {
  CheckCircle
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  avatarSmall: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarMedium: {
    width: theme.spacing(10) * 2,
    height: theme.spacing(10) * 2,
  },
  badge: {
    height: 'unset',
    minWidth: 'unset',
    padding: 'unset',
    backgroundColor: 'white',
    color: theme.palette.success.main,
  },
  icon: {
    fontSize: '0.8rem'
  },
  iconSmall: {
    fontSize: '1rem'
  },
  iconMedium: {
    fontSize: '1.5rem'
  },
}))

const UserAvatar = ({ user, size }) => {
  const classes = useStyles()

  return (
    <Badge
      overlap='circle'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      color='primary'
      badgeContent={
        user.tradeOfferUrl && <CheckCircle classes={{
          root: clsx({
            [classes.icon]: !size,
            [classes.iconSmall]: size === 'small',
            [classes.iconMedium]: size === 'medium'
          })
        }} />
      }
      classes={{
        badge: classes.badge,
      }}
      style={{ marginRight: '16px' }}
    >
      <Avatar src={user.avatar} className={clsx({
        [classes.avatarSmall]: size === 'small',
        [classes.avatarMedium]: size === 'medium'
      })} />
    </Badge>
  )
}

export default UserAvatar