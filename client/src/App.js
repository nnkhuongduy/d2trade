import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Header from './components/header/header.component';
import BodyContainer from './components/body-container/body-container.component';
import Footer from './components/footer/footer.component';

import { getBotInventory } from './redux/inventory/inventory.actions';

import './App.scss';

const App = (props) => {
  useEffect(() => {
    const { getBotInventory } = props;

    async function fetchData() {
      const result = await axios('/inventory');
      getBotInventory(result.data);
    }

    fetchData();
  }, []);


  return (
    <>
      <Header />
      <BodyContainer />
      <Footer />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  getBotInventory: inventory => dispatch(getBotInventory(inventory))
})


export default connect(null, mapDispatchToProps)(App);
