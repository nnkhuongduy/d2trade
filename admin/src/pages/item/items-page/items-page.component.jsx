import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Button, LinearProgress, Collapse, Typography
} from '@material-ui/core'
import {
  Search, Refresh, Tune, FilterList
} from '@material-ui/icons'

import ItemNewDialog from '../../../components/dialogs/item-new/item-new.component'
import Toolbar from './toolbar.component'
import ItemsMasonry from './virtualized-items.component'
import Filter from './filter.component'

import { fetchHeroesStart } from '../../../redux/hero/hero.actions'
import { fetchItemsStart } from '../../../redux/item/item.actions'

import { selectHeroes } from '../../../redux/hero/hero.selectors'
import { selectFetchingItems, selectItems } from '../../../redux/item/item.selectors'

const useStyles = makeStyles(theme => ({
  deleteBtn: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
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
  },
}))

const ItemsPage = ({ heroes, fetchHeroes, items, fetching, fetchItems }) => {
  const classes = useStyles()
  const [deleteState, setDeleteState] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [currentItems, setCurrentItems] = useState(null)
  const [handling, setHandling] = useState(false)
  const [tools, setTools] = useState([
    {
      label: 'search',
      Icon: <Search />,
      value: '',
      active: false
    },
    {
      label: 'slider',
      Icon: <Tune />,
      value: 700,
      active: false
    },
    {
      label: 'filter',
      Icon: <FilterList />,
      value: null,
      active: false
    },
    {
      label: 'refresh',
      Icon: <Refresh />
    }
  ])

  useEffect(() => {
    if (!heroes) fetchHeroes()
    if (!items) fetchItems()
    if (items) setCurrentItems(items)
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (items) {
      setCurrentItems(items)
    } else {
      setCurrentItems(null)
    }
    //eslint-disable-next-line
  }, [items])

  useEffect(() => {
    const filter = async () => {
      setCurrentItems(null)
      if (currentItems) {
        const newItems = await items.filter(item => item.name.toLowerCase().includes(tools[0].value.toLowerCase()))
        setCurrentItems(newItems)
      }
    }
    filter()
    //eslint-disable-next-line
  }, [tools[0].value])

  useEffect(() => {
    const filter = async () => {
      const filter = tools[2].value

      setCurrentItems(null)
      setHandling(true)

      if (currentItems) {
        const newItems = await items.filter(item =>
          (filter.hero ? filter.hero.name === item.hero.name : true) &&
          (filter.rarity ? filter.rarity === item.rarity.label : true) &&
          (!filter.configs.any ?
            (filter.configs.isInscribed === item.configs.isInscribed &&
              filter.configs.isNonMarket === item.configs.isNonMarket)
            : true)
        )
        setCurrentItems(newItems)
      }

      setHandling(false)
    }
    filter()
    //eslint-disable-next-line
  }, [tools[2].value])

  return (
    <>
      <Grid container direction='column' spacing={2}>
        <Collapse in={fetching || handling}>
          <Grid item>
            <LinearProgress />
          </Grid>
        </Collapse>
        <Grid item>
          <Grid container justify='space-between'>
            <Grid item>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setDialog(true)}
                  >NEW
              </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant={deleteState ? 'contained' : 'outlined'}
                    className={clsx(classes.deleteBtn, {
                      [classes.deleteBtnActive]: deleteState
                    })}
                    onClick={() => setDeleteState(!deleteState)}
                  >DELETE
              </Button>
                </Grid>
                <Grid item>
                  <Typography>Lọc hiện tại:</Typography>
                </Grid>
                <Grid item>
                  <Filter filter={tools[2].value} search={tools[0].value} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Toolbar tools={tools} onChange={tools => setTools(tools)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {currentItems && <ItemsMasonry items={currentItems} height={tools[1].value} />}
        </Grid>
      </Grid>
      <ItemNewDialog open={dialog} onClose={() => setDialog(false)} />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchHeroes: () => dispatch(fetchHeroesStart()),
  fetchItems: () => dispatch(fetchItemsStart())
})

const mapStateToProps = createStructuredSelector({
  heroes: selectHeroes,
  items: selectItems,
  fetching: selectFetchingItems
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)