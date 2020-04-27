import React, { useState } from 'react';

import './dropdown-bar.component.scss'

const DropdownBar = ({ children, title, ...props }) => {
  const [dropdownState, setDropdownState] = useState(false);

  return (
    <>
      <div className={`dropdown-container${dropdownState ? ' active' : ''}`} onClick={() => setDropdownState(state => !state)}>
        {title}
      </div>
      {dropdownState && <div className={'dropdown-info'}>
        {children}
      </div>}
    </>
  )
}

export default DropdownBar;