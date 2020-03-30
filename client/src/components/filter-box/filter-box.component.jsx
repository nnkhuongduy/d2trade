import React, { useState } from 'react';

import './filter-box.component.scss';

const FilterBox = ({ type, mode }) => {
  const [filterMinValue, setFilterMinValue] = useState("");
  const [filterMaxValue, setFilterMaxValue] = useState("");

  const onChangeHandle = e => {
    const value = e.target.value;
    if (!isNaN(value)) {
      if (mode === "filter-min")
        setFilterMinValue(value)
      else setFilterMaxValue(value)
    }
  }

  return (
    <input className="filter-box" value={mode === "filter-min" ? filterMinValue : filterMaxValue} onChange={onChangeHandle} />
  )
}

export default FilterBox;