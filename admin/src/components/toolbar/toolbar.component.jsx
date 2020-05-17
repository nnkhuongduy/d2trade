import React from 'react'

import {
  Grid, IconButton,
} from '@material-ui/core'

const Toolbar = ({ tools, onChange }) => {

  const onIconClick = (label) => {
    if (label === 'refresh') {
      tools.find(tool => tool.label === 'refresh').func()
      onChange(tools.map(tool => ({ ...tool, active: false })))
    } else {
      onChange(tools.map(tool => ({ ...tool, active: tool.label === label && tool.active === false })))
    }
  }

  return (
    <Grid container spacing={1}>
      {tools.map((tool, index) => (
        <Grid key={index} item>
          <IconButton color={tool.active ? 'primary' : 'default'} onClick={() => onIconClick(tool.label)}>
            {tool.Icon}
          </IconButton>
        </Grid>
      ))}
    </Grid>
  )
}

export default Toolbar