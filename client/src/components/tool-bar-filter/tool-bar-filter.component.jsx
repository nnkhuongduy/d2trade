import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '@iconify/react';
import cancelIcon from '@iconify/icons-topcoat/cancel';

import RarityFilterButton from '../rarity-filter-button/rarity-filter-button.component'

import { selectBotFilteredHero, selectUserFilteredHero, selectBotFilteredState, selectUserFilteredState } from '../../redux/heroes/heroes.selectors'
import { selectBotRarityValue, selectUserRarityValue, selectBotRarityFilteredState, selectUserRarityFilteredState } from '../../redux/rarity-filter/rarity-filter.selectors'

import { filterHeroesStart } from '../../redux/heroes/heroes.actions'

import './tool-bar-filter.component.scss'

const ToolBarFilter = ({
  type,
  botFilteredHero, userFilteredHero,
  botHeroFilteredState, userHeroFilteredState,
  filterHeroesStart,
  botRarityValue, userRarityValue,
  botRarityFilteredState, userRarityFilteredState
}) => {
  const [filteredHeroState, setFilteredHeroState] = useState();
  const [filteredRarityState, setFilteredRarityState] = useState();
  const [filteredHero, setFilteredHero] = useState();
  const [filteredRarity, setFilteredRarity] = useState();

  useEffect(() => {
    setFilteredHeroState(type === "bot" ? botHeroFilteredState : userHeroFilteredState)
  }, [botHeroFilteredState, userHeroFilteredState, setFilteredHeroState, type])

  useEffect(() => {
    setFilteredRarityState(type === "bot" ? botRarityFilteredState : userRarityFilteredState)
  }, [botRarityFilteredState, userRarityFilteredState, setFilteredRarityState, type])

  useEffect(() => {
    setFilteredHero(type === "bot" && (botFilteredHero || userFilteredHero) ? botFilteredHero : userFilteredHero)
  }, [botFilteredHero, userFilteredHero, setFilteredHero, type])

  useEffect(() => {
    setFilteredRarity(type === "bot" && (botRarityValue || userRarityValue) ? botRarityValue : userRarityValue)
  }, [botRarityValue, userRarityValue, setFilteredRarity, type])

  const filteredHeroClickHandle = () => {
    filterHeroesStart(type, filteredHero.localized_name)
  }

  return (
    <div className={'tool-bar-filter'}>
      {(filteredHeroState && filteredHero) && <div className="filtered-hero" onClick={filteredHeroClickHandle}>
        <img alt='hero_portrait' src={filteredHero.portrait_url} />
        <Icon icon={cancelIcon} color={"#fff"} style={{}} />
      </div>
      }
      {(filteredRarityState && filteredRarity) && <div className={'filtered-rarity'}>
        <RarityFilterButton type={type} rarityValue={filteredRarity} />
        <Icon icon={cancelIcon} color={"#fff"} style={{}} />
      </div>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  filterHeroesStart: (heroName, filterType) => dispatch(filterHeroesStart(heroName, filterType))
})

const mapStateToProps = createStructuredSelector({
  botFilteredHero: selectBotFilteredHero,
  userFilteredHero: selectUserFilteredHero,
  botHeroFilteredState: selectBotFilteredState,
  userHeroFilteredState: selectUserFilteredState,
  botRarityValue: selectBotRarityValue,
  userRarityValue: selectUserRarityValue,
  botRarityFilteredState: selectBotRarityFilteredState,
  userRarityFilteredState: selectUserRarityFilteredState
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolBarFilter);