import React from 'react';
import { Textfit } from 'react-textfit';

import Filter from '../filter/filter.component';

import './trading-counter.component.scss';
import Label from '../label/label.component';

const TradingCounter = (props) => {
  const type = props.type;
  const classValue = type ? `trading-counter ${type}` : "trading-counter";

  return (
    <div className={classValue}>
      <div className="total-money">
        <div className="total-money-content">
          <Textfit mode="single">
            $ 13123.5634
      </Textfit>
        </div>
      </div>
      <Filter counter={false} />
      <Label>
        {type === "user" ? "YOU" : "BOT"}
      </Label>
    </div>
  )
}

export default TradingCounter;