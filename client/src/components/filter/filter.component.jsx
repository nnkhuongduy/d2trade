import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import FilterBox from '../filter-box/filter-box.component';
import Button from '../button/button.component';
import Heroes from '../heroes/heroes.component';

import { setHeroesContainer } from '../../redux/heroes/heroes.actions'

import { selectHeroesContainer } from '../../redux/heroes/heroes.selectors'

import './filter.component.scss';

const Filter = ({ counter, type, setHeroesContainer, heroesContainer }) => {
  type = type === undefined ? "global" : type;

  const heroClickHandle = () => {
    if (heroesContainer === type)
      setHeroesContainer(null);
    else setHeroesContainer(type);
  }

  return (
    <div className={`filter ${counter && 'filter-counter'}`}>
      <div className="filter-box-container">
        <FilterBox />
        <div className="line" />
        <FilterBox />
      </div>
      <Button classes={["btn-filter"]} onClickHandle={heroClickHandle} >HERO</Button>
      {heroesContainer === type && <Heroes type={type} />}
      <Button classes={["btn-filter"]}>RARITY</Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setHeroesContainer: type => dispatch(setHeroesContainer(type))
})

const mapStateToProps = createStructuredSelector({
  heroesContainer: selectHeroesContainer
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);