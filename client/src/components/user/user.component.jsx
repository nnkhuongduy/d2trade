import React from 'react';

import { ReactComponent as ArrowSVG } from '../../assets/svg/arrow.svg';
import avatar from '../../assets/images/ava.jpg';

import './user.component.scss';

const User = () => (
  <div className="user-container">
    <img src={avatar} alt="avatar" className="avatar" />
    <span className="username">khuongduy</span>
    <ArrowSVG className="dropdown-arrow" />
  </div>
)

export default User;