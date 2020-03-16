import React from 'react';

import './button.component.scss';

const Button = (props) => {
  const classes = props.classes ? "btn " + props.classes.join(' ') : "btn";

  return (
    <button className={classes}>{props.children}</button>
  )
}

export default Button;