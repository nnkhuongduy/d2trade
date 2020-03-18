import React from 'react';

import TradingCounter from '../trading-counter/trading-counter.component';
import TradeInventory from '../trade-inventory/trade-inventory.component';
import SteamInventoryArea from '../steam-inventory-area/steam-inventory-area.component';

import './trading-area.component.scss';

const TradingArea = (props) => {
  const type = props.type;

  return (
    <div className="trading-area">
      <TradingCounter type={type} />
      <TradeInventory mode={type} type={type} />
      <SteamInventoryArea type={type} />
    </div>
  )
}

export default TradingArea;