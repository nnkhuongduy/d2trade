import React from 'react'

import './hero-portrait.component.scss'

const HeroPortrait = ({ hero }) => {

  const componentStyles = {
    backgroundImage: `url(${hero.portrait_url})`,
  }

  return (
    <div className={"hero-portrait"}>
      <img src={hero.portrait_url} />
    </div>
  )
}

export default HeroPortrait