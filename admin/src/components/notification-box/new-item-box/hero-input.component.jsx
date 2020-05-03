import React, { useState, useEffect } from 'react'

import HeroesSelector from '../../heroes-selector/heroes-selector.component'

import './hero-input.component.scss'

const HeroInput = ({ itemState, ...props }) => {
  const [currentHero, setCurrentHero] = useState(null)

  const currentItem = itemState.currentItem
  const setCurrentItem = itemState.setCurrentItem
  const currentHeroName = currentItem.hero

  useEffect(() => {
    if (currentHero) setCurrentItem({ ...currentItem, hero: currentHero.localized_name })
    //eslint-disable-next-line
  }, [currentHero])

  return (
    <div className={'hero-input'}>
      <span>Hero: </span>
      <HeroesSelector current={currentHeroName} handle={hero => setCurrentHero(hero)} />
    </div>
  )
}

export default HeroInput