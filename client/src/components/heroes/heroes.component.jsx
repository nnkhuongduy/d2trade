import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import HeroPortrait from '../hero-portrait/hero-portrait.component'

import { setHeroesContainer } from '../../redux/heroes/heroes.actions'

import { selectHeroesData } from '../../redux/heroes/heroes.selectors'

import './heroes.component.scss'

const Heroes = ({ type, heroesData, setHeroesContainer }) => {
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

  return (
    <div ref={heroesContainer} className={`heroes-container ${type}`} style={componentStyles}>
      {heroesData.length !== 0 && heroesData.map(hero => renderHeroPortrait(hero))}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setHeroesContainer: type => dispatch(setHeroesContainer(type))
})

const mapStateToProps = createStructuredSelector({
  heroesData: selectHeroesData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Heroes)