import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Button from '../button/button.component';
import Heroes from '../heroes/heroes.component';

import { setHeroesContainer } from '../../redux/heroes/heroes.actions'
import { filterStart } from '../../redux/price-filter/price-filter.actions'

import { selectHeroesContainer } from '../../redux/heroes/heroes.selectors'
import { selectBotMaxPrice, selectBotMinPrice, selectUserMaxPrice, selectUserMinPrice } from '../../redux/price-filter/price-filter.selectors'

import './filter.component.scss';

const Filter = ({
  counter, type, setHeroesContainer, heroesContainer, filterStart,
  botMaxPrice, botMinPrice, userMaxPrice, userMinPrice
}) => {
  const [filterMinValue, setFilterMinValue] = useState(0);
  const [filterMaxValue, setFilterMaxValue] = useState(0);

  useEffect(() => {
    if (type !== "global")
      setFilterMaxValue(type === "bot" ? botMaxPrice : userMaxPrice)
  }, [botMaxPrice, userMaxPrice])

  useEffect(() => {
    if (type !== "global")
      setFilterMinValue(type === "bot" ? botMinPrice : userMinPrice)
  }, [botMinPrice, userMinPrice])

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

  const filterAppyHandle = () => {
    if (type === "global") {
      filterStart("bot", filterMinValue, filterMaxValue)
      filterStart("user", filterMinValue, filterMaxValue)
    } else filterStart(type, filterMinValue, filterMaxValue)
  }

  return (
    <div className={`filter ${counter && 'filter-counter'}`}>
      <div className="filter-box-container">
        <div className={`filter-label ${type}`}>From</div>
        <div className="filter-input-container">
          <span>$</span>
          <input className="filter-box filter-min" value={filterMinValue} onChange={onChangeHandle} />
        </div>
        <div className={`filter-label ${type}`}>To</div>
        <div className="filter-input-container">
          <span>$</span>
          <input className="filter-box filter-max" value={filterMaxValue} onChange={onChangeHandle} />
        </div>
        <Button classes={["btn-filter", `btn-filter-${type}`]} onClickHandle={filterAppyHandle}>APPLY</Button>
      </div>
      <Button classes={["btn-filter"]} onClickHandle={heroClickHandle} >HERO</Button>
      {heroesContainer === type && <Heroes type={type} />}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setHeroesContainer: type => dispatch(setHeroesContainer(type)),
  filterStart: (type, minValue, maxValue) => dispatch(filterStart(type, minValue, maxValue))
})

const mapStateToProps = createStructuredSelector({
  heroesContainer: selectHeroesContainer,
  botMaxPrice: selectBotMaxPrice,
  botMinPrice: selectBotMinPrice,
  userMaxPrice: selectUserMaxPrice,
  userMinPrice: selectUserMinPrice
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);