import React, { useState } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Button from '../button/button.component';
import Heroes from '../heroes/heroes.component';

import { setHeroesContainer } from '../../redux/heroes/heroes.actions'

import { selectHeroesContainer } from '../../redux/heroes/heroes.selectors'

import './filter.component.scss';

const Filter = ({ counter, type, setHeroesContainer, heroesContainer }) => {
  const [filterMinValue, setFilterMinValue] = useState("");
  const [filterMaxValue, setFilterMaxValue] = useState("");

  type = type === undefined ? "global" : type;

  const heroClickHandle = () => {
    if (heroesContainer === type)
      setHeroesContainer(null);
    else setHeroesContainer(type);
  }

  const onChangeHandle = e => {
    const value = e.target.value;
    if (!isNaN(value)) {
      if (e.target.className.includes("filter-min"))
        setFilterMinValue(value)
      else setFilterMaxValue(value)
    }
  }


  return (
    <div className={`filter ${counter && 'filter-counter'}`}>
      <div className="filter-box-container">
        <div className={`filter-label ${type}`}>From</div>
        <input className="filter-box filter-min" value={filterMinValue} onChange={onChangeHandle} />
        <div className={`filter-label ${type}`}>To</div>
        <input className="filter-box filter-max" value={filterMaxValue} onChange={onChangeHandle} />
        <Button classes={["btn-filter", `btn-filter-${type}`]}>APPLY</Button>
      </div>
      <Button classes={["btn-filter"]} onClickHandle={heroClickHandle} >HERO</Button>
      {heroesContainer === type && <Heroes type={type} />}
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