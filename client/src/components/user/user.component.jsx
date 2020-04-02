import React, { useState, useEffect, useRef } from 'react';

import { Icon } from '@iconify/react';
import dropDown from '@iconify/icons-fe/drop-down';
import creditCardPlus from '@iconify/icons-mdi/credit-card-plus';

import UserDropdown from '../user-dropdown/user-dropdown.component'

import './user.component.scss';

const User = ({ user }) => {
  const [dropdownState, setDropdownState] = useState(false);
  const dropdown = useRef(null)

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
      <Icon icon={creditCardPlus} width={"2em"} height={"2em"} className={"credit-card"} />
      <span className="account-balance">$ {user.accountBalance}</span>
      <img src={user.avatarmedium} alt="avatar" className="avatar" />
      <span className="username">{user.personaname}</span>
      {dropdownState ? <div className="dropdown-arrow" onClick={dropdownHandleOff} ><Icon icon={dropDown} width={"1.5em"} height={"1.5em"} rotate={"180deg"} /></div> :
        <div className="dropdown-arrow" onClick={dropdownHandleOn} ><Icon icon={dropDown} width={"1.5em"} height={"1.5em"} /></div>}
      {dropdownState && <UserDropdown fowardRef={dropdown} />}
    </div>
  )
}

export default User;