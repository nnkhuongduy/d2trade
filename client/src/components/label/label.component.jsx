import React from 'react';

import './label.component.scss';

const Label = ({ type, children }) => {
  return (
    <div className={`label ${type}`}>
      {children}
    </div>
  )
}

export default Label;