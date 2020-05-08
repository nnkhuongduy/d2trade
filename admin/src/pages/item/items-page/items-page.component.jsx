import React, { useState } from 'react'
import clsx from 'clsx'

import Toolbar from '../../../components/toolbar/toolbar.component'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  deleteBtn: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginLeft: theme.spacing(2),
    '&:hover': {
      borderColor: theme.palette.error.light,
    }
  },
  deleteBtnActive: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    }
  }
}))

const ItemsPage = () => {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState('')
  const [deleteState, setDeleteState] = useState(false)

  return (
    <>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Grid container justify='space-between'>
            <Grid item>
              <Button variant='contained' color='primary'>NEW</Button>
              <Button
                variant={deleteState ? 'contained' : 'outlined'}
                className={clsx(classes.deleteBtn, {
                  [classes.deleteBtnActive]: deleteState
                })}
                onClick={() => setDeleteState(!deleteState)}
              >
                DELETE
              </Button>
            </Grid>
            <Grid item>
              <Toolbar searchValue={searchValue} onSearchChange={e => setSearchValue(e.target.value)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
    </>
  )
}

export default ItemsPage