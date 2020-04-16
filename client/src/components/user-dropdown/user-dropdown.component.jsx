import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logOut } from '../../redux/user/user.actions'

import './user-dropdown.component.scss'

const UserDropdown = ({ fowardRef, logOut }) => {
  const logOutHandle = () => {
    logOut();
  }

  return (
    <div ref={fowardRef} className="user-drop-down">
      <Link className="option" to={'/user/profile'}>
        <span>Profile</span>
      </Link>
      <Link className="option" to={'/user/profile'}>
        <span>Steam's Offer link</span>
      </Link>
      <div className="option" onClick={logOutHandle}><span>Log out</span></div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(null, mapDispatchToProps)(UserDropdown);