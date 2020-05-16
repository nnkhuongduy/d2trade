import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Grid, LinearProgress, Collapse
} from '@material-ui/core'
import {
  Search, Refresh, Tune, FilterList
} from '@material-ui/icons'

import Toolbar from '../toolbar.component'
import ToolbarContent from '../toolbar-content.component'
import ItemsMasonry from '../virtualized-items.component'
import ItemNewDialog from '../../../components/dialogs/item/item-new.component'
import ItemInfoDialog from '../../../components/dialogs/item/item-info.component'

import { fetchBotItemsStart, fetchItemsStart } from '../../../redux/item/item.actions'

import { selectBotItems, selectItems, selectBotFetchingState, selectFetchingItems } from '../../../redux/item/item.selectors'

const BotPage = ({
  botItems, fetchBotItems, items, fetchItems, itemsFetching, botFetching
}) => {

  const [currentItems, setCurrentItems] = useState(null)
  const [addDialog, setAddDialog] = useState({
    active: false,
    item: null
  })
  const [infoDialog, setInfoDialog] = useState({
    active: false,
    item: null
  })
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
      func: () => { fetchBotItems(); fetchItems() }
    }
  ])

  useEffect(() => {
    if (!botItems) fetchBotItems()
    if (!items) fetchItems()
  }, [])

  useEffect(() => {
    if (items && botItems) {
      let itemNames = {}

      items.forEach(item => itemNames[item.name] = item)

      setCurrentItems(botItems.map(item => itemNames[item.name] ? { ...itemNames[item.name] } : { ...item, unavailable: true }))
    }
  }, [items, botItems])

  const onItemClick = item => {
    if (item.unavailable) setAddDialog({
      active: true,
      item: { ...item, unavailable: undefined }
    })
    else setInfoDialog({
      active: true,
      item: item
    })
  }

  return (
    <>
      <Grid container direction='column' spacing={2}>
        <Collapse in={itemsFetching || botFetching}>
          <Grid item>
            <LinearProgress />
          </Grid>
        </Collapse>
        <Grid item>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
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
              onItemClick={onItemClick}
            />}
        </Grid>
      </Grid>
      <ItemNewDialog open={addDialog.active} onClose={() => setAddDialog({ active: false, item: null })} initialItem={addDialog.item} />
      <ItemInfoDialog open={infoDialog.active} onClose={() => setInfoDialog({ active: false, item: null })} item={infoDialog.item} />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchBotItems: () => dispatch(fetchBotItemsStart()),
  fetchItems: () => dispatch(fetchItemsStart())
})

const mapStateToProps = createStructuredSelector({
  botItems: selectBotItems,
  items: selectItems,
  itemsFetching: selectFetchingItems,
  botFetching: selectBotFetchingState
})

export default connect(mapStateToProps, mapDispatchToProps)(BotPage)