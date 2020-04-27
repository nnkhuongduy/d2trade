import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

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

import { fetchUsersStart } from './redux/users/users.actions'
import { selectUsers } from './redux/users/users.selectors'

import './App.scss';

function App({ users, fetchUsersStart, pageFilterState, ...props }) {
  useEffect(() => {
    if (!users)
      fetchUsersStart();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Overlay />
      <div className={'page-container'}>
        <Menu />
        <div className={'menu-content'}>
          <Header />
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

const mapDispatchToProps = dispatch => ({
  fetchUsersStart: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
