import React from 'react'

import './button.component.scss'

const Button = ({ active, children, className, ...props }) => (
  <button className={`normal-btn ${className ? className : ''} ${active ? 'activated' : ''}`} {...props}>{children}</button>
)


export default Button