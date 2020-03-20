import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InventorySlot from '../inventory-slot/inventory-slot.component';

import { selectTempItem } from '../../redux/temp-item/temp-item.selectors';
import { selectInventory } from '../../redux/inventory/inventory.selectors';

import './trade-inventory.component.scss';

const TradeInventory = ({ mode, type, inventory, tempItem }) => {
  let [tradeInventory, setTradeInventory] = useState(inventory);
  let [tradeItems, setTradeItems] = useState(tempItem);

  useEffect(() => {
    setTradeInventory(inventory);
  }, [inventory])

  useEffect(() => {
    setTradeItems(tempItem);

  }, [tempItem])

  return (
    <div className={`trade-inventory ${mode}`} >
      <div className={`inventory-container ${mode} ${type}`}>
        {(tradeInventory && type === "bot" && mode === "steam") && tradeInventory.map(item => (
          <InventorySlot key={item.item.id} item={item.item} mode={mode} type={type}></InventorySlot>
        ))}
        {(tradeItems && type === "bot" && mode === "bot") && tempItem.map(item => (
          <InventorySlot key={item.item.id} item={item.item} mode={type} type={type}></InventorySlot>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  inventory: selectInventory,
  tempItem: selectTempItem
});

export default connect(mapStateToProps)(TradeInventory);