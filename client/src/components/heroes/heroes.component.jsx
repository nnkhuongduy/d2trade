import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import HeroPortrait from '../hero-portrait/hero-portrait.component'

import { setHeroesContainer } from '../../redux/heroes/heroes.actions'
import { heroSearchingStart } from '../../redux/searching/searching.actions'

import { selectHeroesRendered } from '../../redux/heroes/heroes.selectors'

import './heroes.component.scss'

const Heroes = ({ type, heroesRendered, setHeroesContainer, heroSearchingStart }) => {
  const heroesContainer = useRef(null);

  useEffect(() => {

    const clickOutsideHandle = e => {
      if (heroesContainer.current && !heroesContainer.current.contains(e.target) && !e.target.className.includes("btn-filter"))
        setHeroesContainer(null)
    }

    document.addEventListener("mousedown", clickOutsideHandle)

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandle)
    }

  }, [heroesContainer])

  const componentStyles = {
    top: type === "global" ? "30%" : "0",
    right: type === "bot" && "calc(100% + 20px)",
    left: type === "user" && "calc(100% + 20px)"
  }

  const renderHeroPortrait = hero => (
    <HeroPortrait key={hero._id} hero={hero} type={type} />
  )

  const searchHeroHandle = e => {
    heroSearchingStart(e.target.value);
  }

  return (
    <div ref={heroesContainer} className={`heroes-container ${type}`} style={componentStyles}>
      <div className="heroes-input-container">
        <input className="heroes-input" placeholder="Search hero..." onChange={searchHeroHandle} />
      </div>
      <div className={`heroes-content`} >
        {heroesRendered.length !== 0 && heroesRendered.map(hero => renderHeroPortrait(hero))}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setHeroesContainer: type => dispatch(setHeroesContainer(type)),
  heroSearchingStart: query => dispatch(heroSearchingStart(query))
})

const mapStateToProps = createStructuredSelector({
  heroesRendered: selectHeroesRendered,
})

export default connect(mapStateToProps, mapDispatchToProps)(Heroes)