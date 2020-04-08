import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Button from '../button/button.component';
import Heroes from '../heroes/heroes.component';
import RarityFilterBox from '../rarity-filter-box/rarity-filter-box.component'

import { setHeroesContainer } from '../../redux/heroes/heroes.actions'
import { filterStart } from '../../redux/price-filter/price-filter.actions'
import { setRarityContainer } from '../../redux/rarity-filter/rarity-filter.actions'

import { selectHeroesContainer } from '../../redux/heroes/heroes.selectors'
import { selectRarityContainer } from '../../redux/rarity-filter/rarity-filter.selectors'
import { selectBotMaxPrice, selectBotMinPrice, selectUserMaxPrice, selectUserMinPrice } from '../../redux/price-filter/price-filter.selectors'
import { selectCurrencyState } from '../../redux/currency/currency.selectors'

import './filter.component.scss';

const Filter = ({
  counter, type, setHeroesContainer, heroesContainer, filterStart,
  botMaxPrice, botMinPrice, userMaxPrice, userMinPrice, currencyState,
  rarityContainer, setRarityContainer
}) => {
  const [filterMinValue, setFilterMinValue] = useState(0);
  const [filterMaxValue, setFilterMaxValue] = useState(0);
  const [applyButtonState, setApplyButtonState] = useState(true);
  const [filterState, setfilterState] = useState(false);

  useEffect(() => {
    if (applyButtonState === false) setApplyButtonState(true);
    // eslint-disable-next-line
  }, [filterMinValue, filterMaxValue])

  useEffect(() => {
    if (type !== "global")
      setFilterMaxValue(type === "bot" ? botMaxPrice : userMaxPrice)
  }, [botMaxPrice, userMaxPrice, setFilterMaxValue, type])

  useEffect(() => {
    if (type !== "global")
      setFilterMinValue(type === "bot" ? botMinPrice : userMinPrice)
  }, [botMinPrice, userMinPrice, setFilterMinValue, type])

  type = type === undefined ? "global" : type;

  const filterButtonStyles = {
    backgroundColor: filterState === true ? '#F58599' : ''
  }

  const heroClickHandle = () => {
    if (heroesContainer === type)
      setHeroesContainer(null);
    else setHeroesContainer(type);
    setRarityContainer(null)
  }

  const rarityClickHande = () => {
    if (rarityContainer === type)
      setRarityContainer(null);
    else setRarityContainer(type);
    setHeroesContainer(null)
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
    setApplyButtonState(false);
  }

  const filterCancelHandle = () => {
    if (type === "global") {
      filterStart("bot", 0, 0)
      filterStart("user", 0, 0)
      setFilterMinValue(0);
      setFilterMaxValue(0);
    } else filterStart(type, 0, 0)
  }

  const filterStyles = {
    top: type !== 'global' && '50%',
    left: type !== "bot" && 'calc(100% + 10px)',
    right: type === "bot" && 'calc(100% + 10px)',
    transform: `translateY(${type === 'global' ? '0' : '-50%'})`
  }

  return (
    <>
      <Button
        classes={['btn-filter-state', `${type}`]}
        onClickHandle={() => setfilterState(state => !state)}
        styles={filterButtonStyles}
      >
        {`TOGGLE FILTER ${filterState ? 'OFF' : 'ON'}`}
      </Button>
      {filterState && <div className={`filter ${counter ? 'filter-counter' : ''}`} style={filterStyles}>
        <div className="filter-box-container">
          <div className={`filter-label`}>From</div>
          <div className="filter-input-container">
            <span>{currencyState === "usd" ? '$' : 'VND'}</span>
            <input className="filter-box filter-min" value={filterMinValue} onChange={onChangeHandle} />
          </div>
          <div className={`filter-label`}>To</div>
          <div className="filter-input-container">
            <span>{currencyState === "usd" ? '$' : 'VND'}</span>
            <input className="filter-box filter-max" value={filterMaxValue} onChange={onChangeHandle} />
          </div>
          {applyButtonState ? <Button classes={["btn-filter", `btn-filter-${type}`]} onClickHandle={filterAppyHandle}>APPLY</Button> :
            <Button classes={["btn-filter", `btn-filter-${type}`]} onClickHandle={filterCancelHandle}>CLEAR FILTER</Button>
          }
        </div>
        <Button classes={["btn-filter"]} onClickHandle={heroClickHandle} >HERO</Button>
        {heroesContainer === type && <Heroes type={type} />}
        <Button classes={['btn-filter']} onClickHandle={rarityClickHande}>RARITY</Button>
        {rarityContainer === type && <RarityFilterBox type={type} />}
      </div>}
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  setHeroesContainer: type => dispatch(setHeroesContainer(type)),
  filterStart: (type, minValue, maxValue) => dispatch(filterStart(type, minValue, maxValue)),
  setRarityContainer: type => dispatch(setRarityContainer(type))
})

const mapStateToProps = createStructuredSelector({
  heroesContainer: selectHeroesContainer,
  botMaxPrice: selectBotMaxPrice,
  botMinPrice: selectBotMinPrice,
  userMaxPrice: selectUserMaxPrice,
  userMinPrice: selectUserMinPrice,
  currencyState: selectCurrencyState,
  rarityContainer: selectRarityContainer
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);