import React from 'react';

import TradingArea from '../../components/trading-area/trading-area.component';
import TradingHandle from '../../components/trading-handle/trading-handle.component';

import './trade-page.component.scss';

const TradePage = () => {
  return (
    <div className="trade-container" >
      <TradingArea type={"user"} />
      <TradingHandle />
      <TradingArea type={"bot"} />
    </div>
  );
}

export default TradePage;