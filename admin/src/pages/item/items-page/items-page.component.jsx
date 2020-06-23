import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import _ from 'lodash'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Button, LinearProgress, Collapse, Typography
} from '@material-ui/core'
import {
  Search, Refresh, Tune, FilterList
} from '@material-ui/icons'

import ItemNewDialog from '../../../components/dialogs/item/item-new.component'
import Toolbar from '../toolbar.component'
import ToolbarContent from '../toolbar-content.component'
import ItemsMasonry from './virtualized-items.component'
import Filter from '../filter.component'
import Confirmation from '../../../components/dialogs/confirmation/confirmation.component'
import ItemInfoDialog from '../../../components/dialogs/item/item-info.component'

import { fetchHeroesStart } from '../../../redux/hero/hero.actions'
import { fetchItemsStart, deleteItemsStart } from '../../../redux/item/item.actions'

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

const ItemsPage = ({ heroes, fetchHeroes, items, fetching, fetchItems, deleteItemsStart, fetchSiteConfigs }) => {
  const classes = useStyles()
  const [dialog, setDialog] = useState(false)
  const [currentItems, setCurrentItems] = useState(null)
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
      Icon: <Refresh />,
      func: fetchItems
    }
  ])
  const [deleteState, setDeleteState] = useState(false)
  const [deleteItems, setDeleteItems] = useState({})
  const [confirmation, setConfirmation] = useState(false)
  const [itemInfo, setItemInfo] = useState(null)

  useEffect(() => {
    if (!heroes) fetchHeroes()
    if (!items) fetchItems()
    // if (items) setCurrentItems(items)
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (items)
      setCurrentItems(items.filter(item => item.name.toLowerCase().includes(tools[0].value.toLowerCase())))
    //eslint-disable-next-line
  }, [tools[0].value])

  useEffect(() => {
    const filter = tools[2].value

    if (items)
      if (filter)
        setCurrentItems(items.filter(item => {
          return ((filter.hero ? filter.hero === item.hero : true) &&
            (filter.rarity ? filter.rarity === item.rarity : true) &&
            (!filter.configs.any ?
              (filter.configs.isNonMarket === item.configs.isNonMarket &&
                filter.configs.isDisabled === item.configs.isDisabled)
              : true) &&
            (filter.price.min ? item.prices[filter.price.type] >= filter.price.min : true) &&
            (filter.price.max ? item.prices[filter.price.type] <= filter.price.max : true))
        }))
      else setCurrentItems(items)
    //eslint-disable-next-line
  }, [tools, items, currentItems])

  useEffect(() => {
    if (!deleteState && !_.isEmpty(deleteItems))
      setConfirmation(true)
  }, [deleteState])

  const onDeleteClick = (name) => {
    setDeleteItems({ ...deleteItems, [name]: deleteItems[name] ? undefined : true })
  }

  return (
    <>
      <Grid container direction='column' spacing={2}>
        <Collapse in={fetching}>
          <Grid item>
            <LinearProgress />
          </Grid>
        </Collapse>
        <Grid item>
          <Grid container justify='space-between' alignItems='center'>
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
                  <Filter tools={tools} onChange={tools => setTools(tools)} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Toolbar tools={tools} onChange={tools => setTools(tools)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ToolbarContent tools={tools} onChange={tools => setTools(tools)} />
        </Grid>
        <Grid item>
          {currentItems &&
            <ItemsMasonry
              items={currentItems}
              height={tools[1].value}
              deleteState={deleteState}
              deleteItems={deleteItems}
              onDeleteClick={onDeleteClick}
              onItemClick={item => setItemInfo(item)}
            />
          }
        </Grid>
      </Grid>
      <ItemNewDialog open={dialog} onClose={() => setDialog(false)} />
      <Confirmation
        open={confirmation}
        onClose={() => setConfirmation(false)}
        onConfirm={() => {
          deleteItemsStart(deleteItems);
          setDeleteItems({})
        }}
      />
      <ItemInfoDialog open={Boolean(itemInfo)} onClose={() => setItemInfo(null)} item={itemInfo} />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchHeroes: () => dispatch(fetchHeroesStart()),
  fetchItems: () => dispatch(fetchItemsStart()),
  deleteItemsStart: items => dispatch(deleteItemsStart(items)),
})

const mapStateToProps = createStructuredSelector({
  heroes: selectHeroes,
  items: selectItems,
  fetching: selectFetchingItems,
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)