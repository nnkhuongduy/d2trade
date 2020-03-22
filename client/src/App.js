import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import BodyContainer from './components/body-container/body-container.component';
import Footer from './components/footer/footer.component';
import BlackScreen from './components/black-screen/black-screen.component';

import { setBotInventory, setUserInventory } from './redux/inventory/inventory.actions';
import { selectBlackScreenState } from './redux/client-states/client-states.selectors';

import './App.scss';

const App = ({ setBotInventory, setUserInventory, blackScreenState }) => {
  useEffect(() => {

    async function fetchData() {
      const botResult = await axios('/inventory');
      const userResult = await axios('/inventory2')
      const botInventory = botResult.data.map(item => ({
        ...item,
        item: {
          ...item.item,
          market_price: "2.25"
        }
      }));
      const userInventory = userResult.data.map(item => ({
        ...item,
        item: {
          ...item.item,
          market_price: "2.00"
        }
      }));
      setBotInventory(botInventory);
      setUserInventory(userInventory);
    }

    fetchData();
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
  setBotInventory: inventory => dispatch(setBotInventory(inventory)),
  setUserInventory: inventory => dispatch(setUserInventory(inventory))
})

const mapStateToProps = createStructuredSelector({
  blackScreenState: selectBlackScreenState
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
