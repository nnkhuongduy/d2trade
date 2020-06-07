import React from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'

import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

import User from '../user/user.component'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  logo: {
    '&:hover': {
      cursor: 'pointer'
    },
    [theme.breakpoints.down('md')]: {
      height: '100%',
      maxWidth: '50%'
    }
  }
}))

const Header = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Logo className={classes.logo} onClick={() => history.push('/')} />
        <User />
      </Toolbar>
    </AppBar>
  )
}

export default Header