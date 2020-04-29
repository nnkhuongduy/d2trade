import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import Menu from './components/menu/menu.component'
import Overlay from './components/overlay/overlay.component'

import Dashboard from './pages/dashboard/dashboard.component'
import UsersPage from './pages/users-page/users-page.component'
import ItemsPage from './pages/items-page/items-page.component'
import OffersPage from './pages/offers-page/offers-page.component'
import ConfigsPage from './pages/configs-page/configs-page.component'
import UserPage from './pages/user-page/user-page.component'

import './App.scss';

function App({ pageFilterState, ...props }) {
  return (
    <>
      <Overlay />
      <div className={'page-container'}>
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
      </div>
    </>
  );
}

export default App;
