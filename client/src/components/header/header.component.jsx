import React from 'react';

import Navigation from '../navigation/navigation.component';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.component.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Logo className="logo" />
        <Navigation />
      </div>
    );
  }
}

export default Header;
