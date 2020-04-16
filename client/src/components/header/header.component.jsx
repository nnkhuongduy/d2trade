import React from 'react';
import { Link } from 'react-router-dom'

import Navigation from '../navigation/navigation.component';

import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

import './header.component.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link to='/'>
          <Logo className="logo" />
        </Link>
        <Navigation />
      </div>
    );
  }
}

export default Header;
