import React from 'react';

import './button.component.scss';

const Button = ({ classes, onClickHandle, children }) => {
  const propClasses = classes ? "btn " + classes.join(' ') : "btn";

  return (
    <button className={propClasses} onClick={onClickHandle}>{children}</button>
  )
}

export default Button;