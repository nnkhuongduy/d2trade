import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import { Toolbar } from '@material-ui/core'

import CustomizedDrawer from './components/drawer/drawer.component'
import Header from './components/header/header.component'
import Backdrop from './components/backdrop/backdrop.component'
import Snackbar from './components/snackbar/snackbar.component'

import PrivateRoute from './pages/private-route/private-route.component'
import Dashboard from './pages/dashboard/dashboard.component'
import UsersPage from './pages/user/users-page/users-page.component'
import ItemsPage from './pages/item/items-page/items-page.component'
import BotPage from './pages/item/bot-page/bot-page.component'
import OffersPage from './pages/offers-page/offers-page.component'
import ConfigsPage from './pages/configs-page/configs-page.component'
import UserPage from './pages/user/user-page/user-page.component'
import RevenuePage from './pages/revenue/revenue-page.component'
import LoginPage from './pages/log-in/log-in-page.component'

import { backgroundLogInStart } from './redux/admin/admin.actions'

import { selectAdmin } from './redux/admin/admin.selectors'

import './App.scss';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const App = ({ logIn, admin }) => {
  const classes = useStyles()
  const history = useHistory()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    logIn();
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!admin) history.push('/')
    //eslint-disable-next-line
  }, [admin])

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route path='*'>
          <Header onMenuClick={() => setDrawerOpen(!drawerOpen)} />
          <CustomizedDrawer open={drawerOpen} />
          <div className={classes.content}>
            <Toolbar />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/users' component={UsersPage} />
              <PrivateRoute exact path='/users/:steamid' component={UserPage} />
              <PrivateRoute exact path='/items' component={ItemsPage} />
              <PrivateRoute exact path='/items/bot' component={BotPage} />
              <PrivateRoute exact path='/offers' component={OffersPage} />
              <PrivateRoute exact path='/revenue' component={RevenuePage} />
              <PrivateRoute exact path='/configs' component={ConfigsPage} />
              <Route path='*'><Redirect to='/dashboard' /></Route>
            </Switch>
          </div>
          <Backdrop />
          <Snackbar />
        </Route>
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(backgroundLogInStart())
})

const mapStateToProps = createStructuredSelector({
  admin: selectAdmin
})

export default connect(mapStateToProps, mapDispatchToProps)(process.env.NODE_ENV === 'development' ? hot(App) : App);
