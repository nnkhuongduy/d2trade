import React from 'react';

import TradingArea from '../trading-area/trading-area.component';
import TradingHandle from '../trading-handle/trading-handle.component';

import './body-container.component.scss';

class BodyContainer extends React.Component {
  render() {
    return (
      <div className="body-container" >
        <TradingArea type={"user"} />
        <TradingHandle />
        <TradingArea type={"bot"} />
      </div>
    );
  }
}

export default BodyContainer;