import React from 'react';

import FilterBox from '../filter-box/filter-box.component';
import Button from '../button/button.component';

import './filter.component.scss';

const Filter = (props) => {
  const counter = props.counter;

  return (
    <div className={`filter ${counter && 'filter-counter'}`}>
      <div className="filter-box-container">
        <FilterBox />
        <div className="line" />
        <FilterBox />
      </div>
      <Button classes={["btn-filter"]}>HERO</Button>
      <Button classes={["btn-filter"]}>RARITY</Button>
    </div>
  )

}

export default Filter;