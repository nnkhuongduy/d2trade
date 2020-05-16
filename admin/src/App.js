import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root'

import { makeStyles } from '@material-ui/styles'
import { Toolbar } from '@material-ui/core'

import CustomizedDrawer from './components/drawer/drawer.component'
import Header from './components/header/header.component'
import Backdrop from './components/backdrop/backdrop.component'
import Snackbar from './components/snackbar/snackbar.component'

import Dashboard from './pages/dashboard/dashboard.component'
import UsersPage from './pages/user/users-page/users-page.component'
import ItemsPage from './pages/item/items-page/items-page.component'
import BotPage from './pages/item/bot-page/bot-page.component'
import OffersPage from './pages/offers-page/offers-page.component'
import ConfigsPage from './pages/configs-page/configs-page.component'
import UserPage from './pages/user/user-page/user-page.component'

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

const App = ({ backdrop }) => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className={classes.root}>
      <Header onMenuClick={() => setDrawerOpen(!drawerOpen)} />
      <CustomizedDrawer open={drawerOpen} />
      <div className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/users' component={UsersPage} />
          <Route exact path='/users/:steamid' component={UserPage} />
          <Route exact path='/items' component={ItemsPage} />
          <Route exact path='/items/bot' component={BotPage} />
          <Route exact path='/offers' component={OffersPage} />
          <Route exact path='/configs' component={ConfigsPage} />
          <Route path='*'><Redirect to='/dashboard' /></Route>
        </Switch>
      </div>
      <Backdrop />
      <Snackbar />
    </div>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
