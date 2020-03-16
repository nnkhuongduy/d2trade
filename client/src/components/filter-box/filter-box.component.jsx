import React from 'react';
import { Textfit } from 'react-textfit'

import './filter-box.component.scss';

const FilterBox = () => (
  <div className="filter-box">
    <Textfit mode="single" forceSingleModeWidth={false}>
      $ 0
  </Textfit>
  </div>
)

export default FilterBox;