import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import HeroPortrait from '../hero-portrait/hero-portrait.component'

import { selectHeroesData } from '../../redux/heroes/heroes.selectors'

import './heroes.component.scss'

const Heroes = ({ type, heroesData }) => {
  const componentStyles = {
    top: type === "global" ? "30%" : "0",
    right: type === "bot" && "calc(100% + 20px)",
    left: type === "user" && "calc(100% + 20px)"
  }

  const renderHeroPortrait = hero => (
    <HeroPortrait key={hero._id} hero={hero} type={type} />
  )

  return (
    <div className={`heroes-container ${type}`} style={componentStyles}>
      {heroesData.length !== 0 && heroesData.map(hero => renderHeroPortrait(hero))}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  heroesData: selectHeroesData,
})

export default connect(mapStateToProps)(Heroes)