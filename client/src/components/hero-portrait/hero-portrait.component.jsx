import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { filterHeroesStart } from '../../redux/heroes/heroes.actions'

import { selectHeroesImage } from '../../redux/items-image/items-image.selectors'

import './hero-portrait.component.scss'

const HeroPortrait = ({ hero, filterHeroesStart, type, heroesImage }) => {
  const portraitRef = useRef(null)

  useEffect(() => {
    if (portraitRef.current && heroesImage !== null)
      portraitRef.current.appendChild(heroesImage[hero.localized_name])
  }, [portraitRef, heroesImage, hero])

  const filterHandle = () => {
    if (type === "global") {
      filterHeroesStart("bot", hero.localized_name)
      filterHeroesStart("user", hero.localized_name)
    } else filterHeroesStart(type, hero.localized_name)
  }

  return (
    <div ref={portraitRef} className={`hero-portrait`} onClick={filterHandle}>
      {/* <img alt='hero_portrait' src={hero.portrait_url} /> */}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  filterHeroesStart: (heroName, type) => dispatch(filterHeroesStart(heroName, type))
})

const mapStateToProps = createStructuredSelector({
  heroesImage: selectHeroesImage
})

export default connect(mapStateToProps, mapDispatchToProps)(HeroPortrait)