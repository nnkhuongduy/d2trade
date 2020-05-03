import React from 'react'

import './rarity.component.scss'

const colors = {
  "Mythical": "#8847ff",
  "Immortal": "#e4ae39",
  "Arcana": "#ade55c"
}

const Rarity = ({ rarity, clickHandle, ...props }) => {
  if (colors[rarity])
    return (
      <div className={'rarity'} style={{ backgroundColor: colors[rarity] }} onClick={() => clickHandle && clickHandle(rarity)}>
        {rarity}
      </div>
    )
  else return (
    <div className={'rarity'} style={{ backgroundColor: "grey" }}>
      RARITY
    </div>
  )
}

export default Rarity