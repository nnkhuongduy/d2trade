import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  CircularProgress
} from '@material-ui/core'

import ItemsMasonry from './virtualized-table.component'

import { fetchInventoryStart } from '../../redux/inventory/inventory.actions'
import { updateStashStart } from '../../redux/stash/stash.actions'

import { selectBotInventory, selectBotFetching } from '../../redux/inventory/inventory.selectors'
import { selectBotStash } from '../../redux/stash/stash.selectors'

const InventoryBot = ({ inventory, fetching, fetchInventory, stash, updateStash, getRef, heroName, rarity, search }) => {
  const [currentInventory, setCurrentInventory] = useState(null)

  useEffect(() => {
    if (!inventory && !fetching) fetchInventory('bot')
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (inventory)
      setCurrentInventory(inventory)
    else setCurrentInventory(null)
    //eslint-disable-next-line
  }, [inventory])

  useEffect(() => {
    if (inventory) {
      let newInventory = [...inventory]

      if (heroName)
        newInventory = newInventory.filter(item => item.hero === heroName)

      if (rarity)
        newInventory = newInventory.filter(item => item.rarity === rarity)

      newInventory = newInventory.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

      setCurrentInventory(newInventory)
    }
    //eslint-disable-next-line
  }, [heroName, rarity, search])

  const onClick = item => {
    if (stash.find(stashItem => stashItem.assetId === item.assetId)) updateStash('bot', 'remove', item)
    else updateStash('bot', 'add', item)
  }

  return (
    <>
      {fetching && <CircularProgress style={{ display: 'block', margin: '0 auto' }} />}
      {currentInventory &&
        <ItemsMasonry
          items={currentInventory}
          onItemClick={onClick}
          height={getRef().current.offsetHeight - 100}
        />
      }
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchInventory: type => dispatch(fetchInventoryStart(type)),
  updateStash: (inventoryType, actionType, item) => dispatch(updateStashStart(inventoryType, actionType, item))
})

const mapStateToProps = createStructuredSelector({
  inventory: selectBotInventory,
  fetching: selectBotFetching,
  stash: selectBotStash
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoryBot)