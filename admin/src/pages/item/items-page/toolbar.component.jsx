import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, IconButton, Collapse, TextField, Typography, Slider, Button
} from '@material-ui/core'

import { fetchItemsStart } from '../../../redux/item/item.actions'

const useStyles = makeStyles(theme => ({
  toolbar: {
    width: 'max-content',
    marginLeft: 'auto',
  },
  open: {
    marginBottom: theme.spacing(3)
  },
  slider: {
    width: '150px'
  }
}))

const Toolbar = ({ tools, onChange, fetchItems }) => {
  const classes = useStyles()
  const [slideValue, setSlideValue] = useState(700)
  const [searchValue, setSearchValue] = useState('')

  const onIconClick = useCallback((label) => {
    if (label === 'refresh') {
      fetchItems()
      onChange(tools.map(tool => ({ ...tool, active: false })))
    } else {
      onChange(tools.map(tool => ({ ...tool, active: tool.label === label && tool.active === false })))
    }
  }, [tools])

  const onSearchClick = e => {
    e.preventDefault()
    const newTools = [...tools]

    newTools[0] = { ...newTools[0], value: searchValue }

    onChange(newTools)
  }

  const onSlideCommit = () => {
    const newTools = [...tools]

    newTools[1] = { ...newTools[1], value: slideValue }

    onChange(newTools)
  }

  return (
    <Grid container direction='column' spacing={1} className={classes.toolbar} alignItems='flex-end'>
      <Grid item>
        <Grid container spacing={1}>
          {tools.map((tool, index) => (
            <Grid key={index} item>
              <IconButton color={tool.active ? 'primary' : 'default'} onClick={() => onIconClick(tool.label)}>
                {tool.Icon}
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Collapse in={tools[0].active} mountOnEnter unmountOnExit>
          <form noValidate autoComplete="off">
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <TextField
                  id='search'
                  label='Search'
                  variant='outlined'
                  size='small'
                  type='search'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button variant='contained' color='primary' onClick={onSearchClick} type='submit'>
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Collapse>
        <Collapse in={tools[1].active} mountOnEnter unmountOnExit>
          <Typography variant='body2'>Chiều cao khung</Typography>
          <Slider
            aria-labelledby='slide'
            getAriaLabel={() => `${slideValue}%`}
            valueLabelDisplay="auto"
            value={slideValue}
            onChangeCommitted={onSlideCommit}
            onChange={(e, newValue) => setSlideValue(newValue)}
            className={classes.slider}
            min={400}
            max={800}
          />
        </Collapse>
        {/*{hasFilter && <Collapse in={filter}>
          {filters && filters.map((filter, index) => (
            <Fragment key={index}>
              {filter}
            </Fragment>
          ))}
        </Collapse>} */}
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchItems: () => dispatch(fetchItemsStart())
})

export default connect(null, mapDispatchToProps)(Toolbar)