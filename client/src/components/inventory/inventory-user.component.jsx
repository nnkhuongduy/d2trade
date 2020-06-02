import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  CircularProgress
} from '@material-ui/core'

import ItemsMasonry from './virtualized-table.component'

import { fetchInventoryStart } from '../../redux/inventory/inventory.actions'
import { updateStashStart } from '../../redux/stash/stash.actions'

import { selectUserInventory, selectUserFetching } from '../../redux/inventory/inventory.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectUserStash } from '../../redux/stash/stash.selectors'

const InventoryBot = ({ user, inventory, fetching, fetchInventory, stash, updateStash, getRef, heroName, rarity, search }) => {
  const [currentInventory, setCurrentInventory] = useState(null)

  useEffect(() => {
    if (user && !inventory && !fetching) fetchInventory('user')
    //eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (inventory)
      setCurrentInventory(inventory)
    else setCurrentInventory(null)
    //eslint-disable-next-line
  }, [inventory])

  useEffect(() => {
    if (inventory) {
      let newInventory = inventory.slice(1)

      if (heroName)
        newInventory = newInventory.filter(item => item.hero === heroName)

      if (rarity)
        newInventory = newInventory.filter(item => item.rarity === rarity)

      newInventory = newInventory.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

      setCurrentInventory([inventory[0], ...newInventory])
    }
    //eslint-disable-next-line
  }, [heroName, rarity, search])

  const onClick = item => {
    if (stash.find(stashItem => stashItem.assetId === item.assetId)) updateStash('user', 'remove', item)
    else updateStash('user', 'add', item)
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
      {!user && <div>Xin vui lòng đăng nhập</div>}
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchInventory: type => dispatch(fetchInventoryStart(type)),
  updateStash: (inventoryType, actionType, item) => dispatch(updateStashStart(inventoryType, actionType, item))
})

const mapStateToProps = createStructuredSelector({
  inventory: selectUserInventory,
  fetching: selectUserFetching,
  user: selectCurrentUser,
  stash: selectUserStash
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoryBot)