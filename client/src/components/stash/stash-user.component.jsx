import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Grid
} from '@material-ui/core'

import ItemCard from '../item/item-card.component'

import { updateStashStart } from '../../redux/stash/stash.actions'

import { selectUserStash } from '../../redux/stash/stash.selectors'

const StashUser = ({ stash, updateStash }) => {

  return (
    <Grid container wrap='wrap' spacing={1}>
      {stash.map(item =>
        <Grid item key={item.assetId}>
          <ItemCard item={item} selectable onClick={() => updateStash('user', 'remove', item)} />
        </Grid>
      )}
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  updateStash: (inventoryType, actionType, item) => dispatch(updateStashStart(inventoryType, actionType, item))
})

const mapStateToProps = createStructuredSelector({
  stash: selectUserStash
})

export default connect(mapStateToProps, mapDispatchToProps)(StashUser)