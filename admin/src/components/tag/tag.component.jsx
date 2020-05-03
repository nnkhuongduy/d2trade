import React from 'react'

import './tag.component.scss'

const Tag = ({ children, color, ...props }) => {
  return (
    <div className={'tag'} style={{ backgroundColor: color }}>
      {children}
    </div>
  )
}

export default Tag