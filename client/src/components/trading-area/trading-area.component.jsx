import React from 'react';

import TradingCounter from '../trading-counter/trading-counter.component';
import TradeInventory from '../trade-inventory/trade-inventory.component';
import SteamInventoryArea from '../steam-inventory-area/steam-inventory-area.component';

import './trading-area.component.scss';

const TradingArea = () => (
  <div className="trading-area">
    <TradingCounter />
    <TradeInventory mode="user" />
    <SteamInventoryArea />
  </div>
)

export default TradingArea;