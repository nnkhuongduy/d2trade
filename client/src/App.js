import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import BodyContainer from './components/body-container/body-container.component';
import Footer from './components/footer/footer.component';
import BlackScreen from './components/black-screen/black-screen.component';

import { fetchHeroesStart } from './redux/heroes/heroes.actions'
import { fetchInventoryStart, updateRenderedInventory, setRenderingInventory } from './redux/inventory/inventory.actions'
import { fetchCurrencyStart } from './redux/currency/currency.actions'

import { selectBlackScreenState } from './redux/client-states/client-states.selectors';
import { selectCurrentUser } from './redux/user/user.selectors'

import './App.scss';

const App = ({
  blackScreenState,
  fetchHeroesStart, fetchInventoryStart,
  currentUser, updateRenderedInventory, setRenderingInventory,
  fetchCurrencyStart
}) => {

  useEffect(() => {
    fetchHeroesStart();
    fetchInventoryStart("bot");
    fetchCurrencyStart();
  }, [fetchHeroesStart, fetchInventoryStart]);

  useEffect(() => {
    if (currentUser) {
      updateRenderedInventory("user", []);
      setRenderingInventory("user", []);
      fetchInventoryStart("user");
    }
  }, [currentUser, updateRenderedInventory, setRenderingInventory, fetchInventoryStart])

  return (
    <>
      {blackScreenState && <BlackScreen />}
      <Header />
      <BodyContainer />
      <Footer />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchHeroesStart: () => dispatch(fetchHeroesStart()),
  fetchInventoryStart: type => dispatch(fetchInventoryStart(type)),
  updateRenderedInventory: (type, arr) => dispatch(updateRenderedInventory(type, arr)),
  setRenderingInventory: (type, arr) => dispatch(setRenderingInventory(type, arr)),
  fetchCurrencyStart: () => dispatch(fetchCurrencyStart())
})

const mapStateToProps = createStructuredSelector({
  blackScreenState: selectBlackScreenState,
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
