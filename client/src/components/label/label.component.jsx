import React from 'react';

import './label.component.scss';

const Label = (props) => {
  return (
    <div className="label">
      {props.children}
    </div>
  )
}

export default Label;