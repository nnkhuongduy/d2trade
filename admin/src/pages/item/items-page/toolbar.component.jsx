import React from 'react'
import { connect } from 'react-redux'

import {
  Grid, IconButton,
} from '@material-ui/core'

import { fetchItemsStart } from '../../../redux/item/item.actions'

const Toolbar = ({ tools, onChange, fetchItems }) => {

  const onIconClick = (label) => {
    if (label === 'refresh') {
      fetchItems()
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

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(fetchItemsStart())
})

export default connect(null, mapDispatchToProps)(Toolbar)