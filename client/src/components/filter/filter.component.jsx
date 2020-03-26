import React, { useState } from 'react';

import FilterBox from '../filter-box/filter-box.component';
import Button from '../button/button.component';
import Heroes from '../heroes/heroes.component';

import './filter.component.scss';

const Filter = ({ counter, type }) => {
  const [heroesState, setHeroesState] = useState(false)

  const heroClickHandle = () => {
    setHeroesState(state => !state);
  }

  return (
    <div className={`filter ${counter && 'filter-counter'}`}>
      <div className="filter-box-container">
        <FilterBox />
        <div className="line" />
        <FilterBox />
      </div>
      <Button classes={["btn-filter"]} onClickHandle={heroClickHandle}>HERO</Button>
      {heroesState && <Heroes type={type} />}
      <Button classes={["btn-filter"]}>RARITY</Button>
    </div>
  )

}

export default Filter;