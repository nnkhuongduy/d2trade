import React, { useState, useEffect, Fragment } from 'react'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Slider, Grid,
  TextField, IconButton, Collapse, Typography,
} from '@material-ui/core'
import { Search, Refresh, Tune, FilterList } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
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

const Toolbar = ({
  onRefresh,
  hasSlide, slideValue, onSlideCommit, slideTitle, slideProps,
  searchValue, onSearchChange,
  hasFilter, filters
}) => {
  const classes = useStyles()
  const [search, setSearch] = useState(false)
  const [slide, setSlide] = useState(false)
  const [filter, setFilter] = useState(false)
  const [value, setValue] = useState(70)

  useEffect(() => {
    setValue(slideValue)
  }, [slideValue])

  return (
    <Grid container direction='column' spacing={1} className={clsx(classes.root, { [classes.open]: search || slide })} alignItems='flex-end'>
      <Grid item>
        {searchValue !== undefined &&
          <IconButton color={search ? 'primary' : 'inherit'} onClick={() => {
            setSearch(!search);
            setSlide(false);
            setFilter(false);
          }}>
            <Search />
          </IconButton>
        }
        {hasSlide &&
          <IconButton color={slide ? 'primary' : 'inherit'} onClick={() => {
            setSlide(!slide);
            setSearch(false);
            setFilter(false);
          }}>
            <Tune />
          </IconButton>
        }
        {hasFilter &&
          <IconButton color={filter ? 'primary' : 'inherit'} onClick={() => {
            setFilter(!filter);
            setSearch(false);
            setSlide(false);
          }}>
            <FilterList />
          </IconButton>
        }
        {onRefresh && <IconButton color='inherit' onClick={onRefresh}>
          <Refresh />
        </IconButton>}
      </Grid>
      <Grid item>
        {searchValue !== undefined && <Collapse in={search} >
          <form noValidate autoComplete="off">
            <TextField
              id='search'
              label='Search'
              variant='outlined'
              size='small'
              value={searchValue}
              onChange={onSearchChange}
              type='search'
            />
          </form>
        </Collapse>}
        {hasSlide && <Collapse in={slide}>
          <Typography>{slideTitle}</Typography>
          <Slider
            aria-labelledby='slide'
            getAriaLabel={() => `${slideValue}%`}
            valueLabelDisplay="auto"
            value={value}
            onChangeCommitted={(e, val) => onSlideCommit(val)}
            onChange={(e, newValue) => setValue(newValue)}
            className={classes.slider}
            {...slideProps}
          />
        </Collapse>}
        {hasFilter && <Collapse in={filter}>
          {filters && filters.map((filter, index) => (
            <Fragment key={index}>
              {filter}
            </Fragment>
          ))}
        </Collapse>}
      </Grid>
    </Grid>
  )
}

export default Toolbar