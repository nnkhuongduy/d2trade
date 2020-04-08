import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { filterStart } from '../../redux/rarity-filter/rarity-filter.actions'

import { selectBotRarityValue, selectUserRarityValue } from '../../redux/rarity-filter/rarity-filter.selectors'

import './rarity-filter-button.component.scss'

const RarityFilterButton = ({ type, color, rarityValue, filterStart, botRarityValue, userRarityValue, ...props }) => {
  const colorHex = rarityValue === "Mythical" ? '#8847ff' : (rarityValue === "Immortal" ? '#e4ae39' : '#ade55c')

  const buttonStyle = {
    backgroundColor: colorHex,
    color: rarityValue === "Mythical" ? 'white' : ''
  }

  const rarityHandle = () => {
    const currentRarityValue = type === "bot" ? botRarityValue : userRarityValue
    if (rarityValue === currentRarityValue)
      if (type === "global") {
        filterStart('bot', null)
        filterStart('user', null)
      } else filterStart(type, null)
    else if (type === "global") {
      filterStart('bot', rarityValue)
      filterStart('user', rarityValue)
    } else filterStart(type, rarityValue)
  }

  return (
    <button className={'rarity-filter'} style={buttonStyle} onClick={rarityHandle}>{rarityValue}</button>
  )
}

const mapDispatchToProps = dispatch => ({
  filterStart: (type, value) => dispatch(filterStart(type, value))
})

const mapStateToProps = createStructuredSelector({
  botRarityValue: selectBotRarityValue,
  userRarityValue: selectUserRarityValue
})

export default connect(mapStateToProps, mapDispatchToProps)(RarityFilterButton)