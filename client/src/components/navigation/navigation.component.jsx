import React from 'react';

import User from '../user/user.component';
import { ReactComponent as Setting } from '../../assets/setting.svg';

import './navigation.component.scss';

const Navigation = () => {
  return (
    <div className="navigation">
      <Setting className="setting" />
      <User />
    </div>
  );
}

export default Navigation;