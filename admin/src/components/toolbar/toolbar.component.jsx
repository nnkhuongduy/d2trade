import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  FormControl, Slider, Grid,
  TextField, IconButton, Collapse, Typography
} from '@material-ui/core'
import { Search, Refresh, Tune } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'max-content',
    marginLeft: 'auto',
  },
  open: {
    marginBottom: theme.spacing(3)
  },
  items: {
    marginLeft: theme.spacing(1)
  },
  slider: {
    width: '150px'
  }
}))

const Toolbar = ({ onRefresh, hasSlide, slideValue, onSlideCommit, slideTitle, searchValue, onSearchChange }) => {
  const classes = useStyles()
  const [search, setSearch] = useState(false)
  const [slide, setSlide] = useState(false)
  const [value, setValue] = useState(70)

  useEffect(() => {
    setValue(slideValue)
  }, [slideValue])

  return (
    <Grid container direction='column' spacing={1} className={clsx(classes.root, { [classes.open]: search || slide })} alignItems='flex-end'>
      <Grid item>
        {searchValue !== undefined && <IconButton color={search ? 'primary' : 'inherit'} className={classes.items} onClick={() => { setSearch(!search); setSlide(false) }}>
          <Search />
        </IconButton>}
        {hasSlide &&
          <IconButton color={slide ? 'primary' : 'inherit'} className={classes.items} onClick={() => { setSlide(!slide); setSearch(false) }}>
            <Tune />
          </IconButton>
        }
        {onRefresh && <IconButton color='inherit' onClick={onRefresh}>
          <Refresh />
        </IconButton>}
      </Grid>
      <Grid item>
        {searchValue !== undefined && <Collapse in={search} >
          <form noValidate autoComplete="off">
            <FormControl>
              <TextField id='search' label='Search' variant='outlined' size='small' value={searchValue} onChange={onSearchChange} />
            </FormControl>
          </form>
        </Collapse>}
        {hasSlide && <Collapse in={slide}>
          <Typography>{slideTitle}</Typography>
          <Slider
            aria-labelledby='slide'
            getAriaLabel={() => `${slideValue}%`}
            valueLabelDisplay="auto"
            value={value}
            onChangeCommitted={onSlideCommit}
            onChange={(e, newValue) => setValue(newValue)}
            min={40}
            max={90}
            className={classes.slider}
          />
        </Collapse>}
      </Grid>
    </Grid>
  )
}

export default Toolbar