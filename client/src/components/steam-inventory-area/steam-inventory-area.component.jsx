import React from 'react';

import SteamInventoryToolbar from '../steam-inventory-toolbar/steam-inventory-toolbar.component';
import TradeInventory from '../trade-inventory/trade-inventory.component';

import './steam-inventory-area.component.scss';

const SteamInventoryArea = () => (
  <div className="steam-inven-area">
    <SteamInventoryToolbar />
    <TradeInventory mode="steam" />
  </div>
)

export default SteamInventoryArea;