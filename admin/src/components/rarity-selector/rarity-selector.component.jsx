import React, { useState } from 'react'

import Rarity from './rarity.component'

import './rarity-selector.component.scss'

const RaritySelector = ({ current, handle, ...props }) => {

  const [activeState, setActiveState] = useState(false)

  const rarityHandle = rarity => {
    setActiveState(false)
    handle(rarity)
  }

  return (
    <div className={'rarity-selector'}>
      <div className={'current-rarity'} onClick={() => setActiveState(state => !state)}>
        <Rarity rarity={current} />
      </div>
      {activeState &&
        <div className={'rarity-container'}>
          <Rarity rarity={"Mythical"} clickHandle={rarity => rarityHandle(rarity)} />
          <Rarity rarity={"Immortal"} clickHandle={rarity => rarityHandle(rarity)} />
          <Rarity rarity={"Arcana"} clickHandle={rarity => rarityHandle(rarity)} />
        </div>
      }
    </div>
  )
}

export default RaritySelector