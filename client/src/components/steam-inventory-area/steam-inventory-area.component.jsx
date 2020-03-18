import React from 'react';

import SteamInventoryToolbar from '../steam-inventory-toolbar/steam-inventory-toolbar.component';
import TradeInventory from '../trade-inventory/trade-inventory.component';

import './steam-inventory-area.component.scss';

const SteamInventoryArea = ({ type }) => (
  <div className="steam-inven-area">
    <SteamInventoryToolbar />
    <TradeInventory mode="steam" type={type} />
  </div>
)

export default SteamInventoryArea;