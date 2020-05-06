import React, { useState } from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  TextField, IconButton, Fade
} from '@material-ui/core'
import { Search, Refresh } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    marginLeft: 'auto'
  },
  items: {
    marginLeft: theme.spacing(1)
  },
}))

const Toolbar = ({ onRefresh }) => {
  const classes = useStyles()
  const [search, setSearch] = useState(false)

  return (
    <div className={classes.root}>
      <Fade in={search} >
        <form noValidate autoComplete="off">
          <FormControl>
            <TextField id='search' label='Search' variant='outlined' size='small' />
          </FormControl>
        </form>
      </Fade>
      <IconButton color='inherit' className={classes.items} onClick={() => setSearch(!search)}>
        <Search />
      </IconButton>
      <IconButton color='inherit' onClick={onRefresh}>
        <Refresh />
      </IconButton>
    </div>
  )
}

export default Toolbar