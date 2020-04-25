import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'

import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/icomoon/plus'
import { ic_keyboard_arrow_down } from 'react-icons-kit/md/ic_keyboard_arrow_down'
import { ic_keyboard_arrow_up } from 'react-icons-kit/md/ic_keyboard_arrow_up'

import UserDropdown from '../user-dropdown/user-dropdown.component'
import TradeUrl from '../trade-url/trade-url.component'

import './user.component.scss';

const User = ({ user }) => {
  const [dropdownState, setDropdownState] = useState(false);

  const dropdown = useRef(null);

  useEffect(() => {
    const clickOutsideHandle = e => {
      if (dropdown.current && !dropdown.current.contains(e.target) && e.target.tagName !== "svg")
        setDropdownState(false)
    }

    document.addEventListener("mousedown", clickOutsideHandle)

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandle)
    }

  }, [dropdown])

  const dropdownHandleOn = () => {
    setDropdownState(true);
  }

  const dropdownHandleOff = () => {
    setDropdownState(false);
  }

  return (
    <div className="user-container">
      <TradeUrl />
      <Link to={'/user/transaction'}>
        <Icon icon={plus} className={"credit-card"} />
      </Link>
      <span className="account-balance">{parseInt(user.accountBalance).toLocaleString()} VND</span>
      <img src={user.avatar} alt="avatar" className="avatar" />
      <Link to={'/user/profile'}>
        <span className="username">{user.personaname}</span>
      </Link>
      {dropdownState ? <div className="dropdown-arrow" onClick={dropdownHandleOff} ><Icon icon={ic_keyboard_arrow_up} size={32} /></div> :
        <div className="dropdown-arrow" onClick={dropdownHandleOn} ><Icon icon={ic_keyboard_arrow_down} size={32} /></div>}
      {dropdownState && <UserDropdown fowardRef={dropdown} />}
    </div>
  )
}


export default User;