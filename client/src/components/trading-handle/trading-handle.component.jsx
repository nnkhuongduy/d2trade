import React from 'react';

import Button from '../button/button.component';
import Filter from '../filter/filter.component';

import './trading-handle.component.scss';
import Label from '../label/label.component';

const TradingHandle = () => (
  <div className="trading-handle">
    <Button classes={["btn-trade"]}>TRADE</Button>
    <Button classes={["btn-smart"]}>SMART SELECT</Button>
    <div className="rate-container">
      <div className="rate">Rate:</div>
    </div>
    <div className="handle-filter-container">
      <Filter counter={true} />
      <Label>ALL</Label>
    </div>
  </div>
)

export default TradingHandle;