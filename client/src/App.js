import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import BodyContainer from './components/body-container/body-container.component';
import Footer from './components/footer/footer.component';
import BlackScreen from './components/black-screen/black-screen.component';

import { fetchHeroesStart } from './redux/heroes/heroes.actions'

import { selectBlackScreenState } from './redux/client-states/client-states.selectors';

import './App.scss';

const App = ({ blackScreenState, fetchHeroesStart }) => {
  useEffect(() => {
    fetchHeroesStart()
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
  fetchHeroesStart: () => dispatch(fetchHeroesStart())
})

const mapStateToProps = createStructuredSelector({
  blackScreenState: selectBlackScreenState
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
