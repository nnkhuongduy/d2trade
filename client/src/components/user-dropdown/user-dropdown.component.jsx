import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { logOut } from '../../redux/user/user.actions'

import './user-dropdown.component.scss'

const UserDropdown = ({ fowardRef, logOut }) => {
  const logOutHandle = () => {
    logOut();
  }

  return (
    <div ref={fowardRef} className="user-drop-down">
      <div className="option"><span>Profile</span></div>
      <div className="option"><span>Steam's Offer link</span></div>
      <div className="option" onClick={logOutHandle}><span>Log out</span></div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(null, mapDispatchToProps)(UserDropdown);