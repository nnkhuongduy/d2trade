import React from 'react'
import { connect } from 'react-redux'

import { filterHeroesStart } from '../../redux/heroes/heroes.actions'

import './hero-portrait.component.scss'

const HeroPortrait = ({ hero, filterHeroesStart, type }) => {

  const filterHandle = () => {
    filterHeroesStart(type, hero.localized_name)
  }

  return (
    <div className={`hero-portrait`} onClick={filterHandle}>
      <img src={hero.portrait_url} />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  filterHeroesStart: (heroName, type) => dispatch(filterHeroesStart(heroName, type))
})

export default connect(null, mapDispatchToProps)(HeroPortrait)