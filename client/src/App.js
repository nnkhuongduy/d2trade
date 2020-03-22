import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import BodyContainer from './components/body-container/body-container.component';
import Footer from './components/footer/footer.component';
import BlackScreen from './components/black-screen/black-screen.component';

import { fetchBotInventoryStart, fetchUserInventoryStart } from './redux/inventory/inventory.actions';
import { selectBlackScreenState } from './redux/client-states/client-states.selectors';

import './App.scss';

const App = ({ fetchBotInventoryStart, fetchUserInventoryStart, blackScreenState }) => {
  useEffect(() => {
    fetchBotInventoryStart()
    fetchUserInventoryStart()
  }, []);


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
  fetchBotInventoryStart: () => dispatch(fetchBotInventoryStart()),
  fetchUserInventoryStart: () => dispatch(fetchUserInventoryStart())
})

const mapStateToProps = createStructuredSelector({
  blackScreenState: selectBlackScreenState
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
