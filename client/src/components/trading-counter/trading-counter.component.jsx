import React from 'react';
import { Textfit } from 'react-textfit';

import Filter from '../filter/filter.component';

import './trading-counter.component.scss';
import Label from '../label/label.component';

const TradingCounter = () => (
  <div className="trading-counter">
    <div className="total-money">
      <div className="total-money-content">
        <Textfit mode="single">
          $ 13123.5634
      </Textfit>
      </div>
    </div>
    <Filter counter={false} />
    <Label>
      YOU
    </Label>
  </div>
)

export default TradingCounter;