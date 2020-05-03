import React, { useState, useEffect } from 'react'

import RaritySelector from '../../rarity-selector/rarity-selector.component'

import './rarity-input.component.scss'

const RarityInput = ({ itemState, ...props }) => {
  const [currentRarity, setCurrentRarity] = useState(null)

  const currentItem = itemState.currentItem
  const setCurrentItem = itemState.setCurrentItem
  const currentRarityName = currentItem.rarity

  useEffect(() => {
    setCurrentItem({ ...currentItem, rarity: currentRarity })
  }, [currentRarity])

  return (
    <div className={'rarity-input'}>
      <span>Rarity: </span>
      <RaritySelector current={currentRarityName} handle={rarity => setCurrentRarity(rarity)} />
    </div>
  )
}

export default RarityInput