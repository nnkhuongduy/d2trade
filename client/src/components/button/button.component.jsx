import React from 'react';

import './button.component.scss';

const Button = ({ classes, onClickHandle, children, available }) => {
  let propClasses = classes ? "btn " + classes.join(' ') : "btn";
  propClasses = available ? propClasses + " available" : propClasses;

  return (
    <button className={propClasses} onClick={onClickHandle}>{children}</button>
  )
}

export default Button;