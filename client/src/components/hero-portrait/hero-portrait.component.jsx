import React from 'react'
import { connect } from 'react-redux'

import { filterHeroes } from '../../redux/heroes/heroes.actions'

import './hero-portrait.component.scss'

const HeroPortrait = ({ hero, filterHeroes }) => {

  const filterHandle = () => {
    filterHeroes(hero.localized_name)
  }

  return (
    <div className={"hero-portrait"} onClick={filterHandle}>
      <img src={hero.portrait_url} />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  filterHeroes: heroName => dispatch(filterHeroes(heroName))
})

export default connect(null, mapDispatchToProps)(HeroPortrait)