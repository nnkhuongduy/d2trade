import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  AppBar, Toolbar, IconButton, Typography
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon
} from '@material-ui/icons'

import { ReactComponent as Logo } from '../../assets/svg/logo.svg'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    padding: `0px ${theme.spacing(2)}px`
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  typography: {
    marginLeft: theme.spacing(1)
  }
}))

const Header = ({ onMenuClick }) => {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar} position="fixed" color='default'>
      <Toolbar className={classes.toolBar}>
        <div className={classes.logoContainer}>
          <IconButton aria-label="open drawer" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Link className={classes.logo} to="/dashboard"><Logo /></Link>
        </div>
        <div className={classes.actions}>
          <Link to="/dashboard">
            <IconButton aria-label="to dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <IconButton aria-label="person">
            <PersonIcon />
          </IconButton>
          <Typography className={classes.typography}>
            Admin
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;