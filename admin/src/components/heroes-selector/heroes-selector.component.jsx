import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import _ from 'lodash'

import { selectHeroes } from '../../redux/hero/hero.selectors'

import './heroes-selector.component.scss'

const HeroesSelector = ({ heroes, current, handle, ...props }) => {

  const [query, setQuery] = useState("")
  const [activeState, setActiveState] = useState(false)

  const heroHandle = hero => {
    setActiveState(false)
    handle(hero)
  }

  return (
    <div className={'heroes-selector'}>
      <div className={'current-hero'} onClick={() => setActiveState(state => !state)}>
        {current && heroes
          .filter(hero => hero.localized_name === current)
          .map(hero => <img key={hero._id} className={'current-hero-img hero-portrait'} alt={'hero_portrait'} src={hero.portrait_url} />)
        }
      </div>
      {heroes && activeState &&
        <div className={'heroes-container'}>
          <input className={'input heroes-query'} value={query} onChange={e => setQuery(e.target.value)} />
          <div className={'heroes-content'}>
            {heroes
              .filter(hero => _.lowerCase(hero.localized_name).includes(_.lowerCase(query)))
              .map(hero => <div key={hero._id} className={'hero-container'} onClick={() => heroHandle(hero)}>
                <img className={'hero-portrait'} alt='hero_portrait' src={hero.portrait_url} />
              </div>)
            }
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  heroes: selectHeroes
})

export default connect(mapStateToProps)(HeroesSelector)