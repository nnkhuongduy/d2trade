import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles'
import { Toolbar } from '@material-ui/core'

import CustomizedDrawer from './components/drawer/drawer.component'

import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import Menu from './components/menu/menu.component'

import Dashboard from './pages/dashboard/dashboard.component'
import UsersPage from './pages/user/users-page/users-page.component'
import ItemsPage from './pages/item/items-page/items-page.component'
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

const App = ({ pageFilterState, ...props }) => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className={classes.root}>
      {/* <div className={'page-container'}>
        <Menu />
        <div className={'menu-content'}>
          <Switch>
            <Route path='*' component={Header} />
          </Switch>
          <div className={'page-content'}>
            <Switch>
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/users' component={UsersPage} />
              <Route exact path='/items' component={ItemsPage} />
              <Route exact path='/offers' component={OffersPage} />
              <Route exact path='/configs' component={ConfigsPage} />
              <Route exact path='/users/:steamid' component={UserPage} />
              <Route path='*'>
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </div> */}
      <Header onMenuClick={() => setDrawerOpen(!drawerOpen)} />
      <CustomizedDrawer open={drawerOpen} />
      <div className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/users' component={UsersPage} />
          <Route exact path='/users/:steamid' component={UserPage} />
          <Route exact path='/items' component={ItemsPage} />
          <Route exact path='/offers' component={OffersPage} />
          <Route exact path='/configs' component={ConfigsPage} />
          <Route path='*'><Redirect to='/dashboard' /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
