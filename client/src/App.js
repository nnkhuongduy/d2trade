import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/header/header.component';
import BodyContainer from './components/body-container/body-container.component';
import Footer from './components/footer/footer.component';

import './App.scss';

const App = () => {
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await axios('/inventory');
      setInventory(result.data);
    }
    fetchData();
  }, [])

  return (
    <>
      <Header />
      <BodyContainer />
      <Footer />
    </>
  )
}

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       inventory: {}
//     }
//   }

//   componentWillMount() {
//     fetch('/inventory')
//       .then(res => res.json())
//       .then(inventory => this.setState({ inventory }));
//   }

//   render() {
//     return (
//       <>
//         <Header />
//         <BodyContainer />
//         <Footer />
//       </>
//     )
//   }
// }

export default App;
