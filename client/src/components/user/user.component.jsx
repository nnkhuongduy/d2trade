import React from 'react';

import { ReactComponent as ArrowSVG } from '../../assets/svg/arrow.svg';

import './user.component.scss';

const User = ({ user }) => (
  <div className="user-container">
    <span className="account-balance">$ {user.accountBalance}</span>
    <img src={user.portraitUrl} alt="avatar" className="avatar" />
    <span className="username">{user.username}</span>
    <ArrowSVG className="dropdown-arrow" />
  </div>
)

export default User;