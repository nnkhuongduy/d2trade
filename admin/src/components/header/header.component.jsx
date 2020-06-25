import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import {
  AppBar, Toolbar, IconButton, Typography, Menu, MenuItem
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon
} from '@material-ui/icons'

import { ReactComponent as Logo } from '../../assets/svg/logo.svg'

import { logOutStart } from '../../redux/admin/admin.actions'

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

const Header = ({ onMenuClick, logOut }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const onPersonClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const logOutClick = () => {
    setAnchorEl(null)
    logOut()
  }

  return (
    <>
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
            <IconButton aria-label="person" onClick={onPersonClick}>
              <PersonIcon />
            </IconButton>
            <Typography className={classes.typography}>
              Admin
          </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        id='admin-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={logOutClick}>Đăng Xuất</MenuItem>
      </Menu>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutStart())
})

export default connect(null, mapDispatchToProps)(Header);