import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Toolbar from '../../../components/toolbar/toolbar.component'
import ItemNewDialog from '../../../components/dialogs/item-new/item-new.component'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Button
} from '@material-ui/core'

import { fetchHeroesStart } from '../../../redux/hero/hero.actions'

import { selectHeroes } from '../../../redux/hero/hero.selectors'

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

const ItemsPage = ({ heroes, fetchHeroesStart }) => {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState('')
  const [deleteState, setDeleteState] = useState(false)
  const [dialog, setDialog] = useState(false)

  useEffect(() => {
    if (!heroes) fetchHeroesStart()
  }, [])

  return (
    <>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Grid container justify='space-between'>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setDialog(true)}
              >NEW</Button>
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
      <ItemNewDialog open={true} onClose={() => setDialog(false)} />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchHeroesStart: () => dispatch(fetchHeroesStart())
})

const mapStateToProps = createStructuredSelector({
  heroes: selectHeroes
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)