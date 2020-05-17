import React, { useState } from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Collapse, TextField, Typography, Slider, Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  slider: {
    width: '150px'
  },
}))

const ToolbarContent = ({ tools, onChange }) => {
  const classes = useStyles()
  const [slideValue, setSlideValue] = useState(700)
  const [searchValue, setSearchValue] = useState('')

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
    <div className={classes.root}>
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
    </div>
  )
}

export default ToolbarContent