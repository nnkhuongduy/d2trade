import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import TradePage from './pages/trade-page/trade-page.component'
import Footer from './components/footer/footer.component';
import BlackScreen from './components/black-screen/black-screen.component';
import PrivateRoute from './pages/private-route/private-route.component';
import UnknownPage from './pages/unknown-page/unknown-page.component'
import UserProfilePage from './pages/user-profile-page/user-profile-page.component'
import TransactionPage from './pages/transaction-page/transaction-page.component'

import { fetchHeroesStart } from './redux/heroes/heroes.actions'
import { fetchInventoryStart, updateRenderedInventory, setRenderingInventory } from './redux/inventory/inventory.actions'
import { fetchCurrencyStart } from './redux/currency/currency.actions'
import { logInStart } from './redux/user/user.actions'

import { selectBlackScreenState } from './redux/client-states/client-states.selectors';
import { selectCurrentUser } from './redux/user/user.selectors'

import './App.scss';

const App = ({
  blackScreenState,
  fetchHeroesStart, fetchInventoryStart,
  currentUser, updateRenderedInventory, setRenderingInventory,
  fetchCurrencyStart, logInStart
}) => {

  useEffect(() => {
    fetchHeroesStart();
    fetchInventoryStart("bot");
    fetchCurrencyStart();
  }, [fetchHeroesStart, fetchInventoryStart, fetchCurrencyStart]);

  useEffect(() => {
    if (currentUser) {
      updateRenderedInventory("user", []);
      setRenderingInventory("user", []);
      fetchInventoryStart("user");
    }
    // eslint-disable-next-line
  }, [currentUser])

  useEffect(() => {
    logInStart();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {blackScreenState && <BlackScreen />}
      <Header />
      <Switch>
        <Route exact path='/' component={TradePage} />
        <PrivateRoute exact path='/user/profile' component={UserProfilePage} />
        <PrivateRoute exact path='/user/transaction' component={TransactionPage} />
        <Route path='*' component={UnknownPage} />
      </Switch>
      <Footer />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchHeroesStart: () => dispatch(fetchHeroesStart()),
  fetchInventoryStart: type => dispatch(fetchInventoryStart(type)),
  updateRenderedInventory: (type, arr) => dispatch(updateRenderedInventory(type, arr)),
  setRenderingInventory: (type, arr) => dispatch(setRenderingInventory(type, arr)),
  fetchCurrencyStart: () => dispatch(fetchCurrencyStart()),
  logInStart: () => dispatch(logInStart())
})

const mapStateToProps = createStructuredSelector({
  blackScreenState: selectBlackScreenState,
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
