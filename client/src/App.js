import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import BodyContainer from './components/body-container/body-container.component';
import Footer from './components/footer/footer.component';
import BlackScreen from './components/black-screen/black-screen.component';

import { fetchHeroesStart } from './redux/heroes/heroes.actions'
import { fetchInventoryStart } from './redux/inventory/inventory.actions'

import { selectBlackScreenState } from './redux/client-states/client-states.selectors';
import { selectCurrentUser } from './redux/user/user.selectors'

import './App.scss';

const App = ({ blackScreenState, fetchHeroesStart, fetchInventoryStart, currentUser }) => {

  useEffect(() => {
    fetchHeroesStart();
    fetchInventoryStart("bot");
  }, []);

  useEffect(() => {
    if (currentUser) fetchInventoryStart("user");
  }, [currentUser])

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
  fetchInventoryStart: type => dispatch(fetchInventoryStart(type))
})

const mapStateToProps = createStructuredSelector({
  blackScreenState: selectBlackScreenState,
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
