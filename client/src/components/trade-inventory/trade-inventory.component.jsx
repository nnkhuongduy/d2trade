import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import InventorySlot from '../inventory-slot/inventory-slot.component';

import './trade-inventory.component.scss';

const TradeInventory = ({ mode, type, inventory }) => {
  let [tradeInventory, setTradeInventory] = useState(inventory);

  useEffect(() => {
    setTradeInventory(inventory);
  }, [inventory])

  return (
    <div className={`trade-inventory ${mode}`} >
      <div className={`inventory-container ${mode} ${type}`}>
        {(tradeInventory && type === "bot" && mode === "steam") && tradeInventory.map(item => (
          <InventorySlot key={item.id} item={item}></InventorySlot>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  inventory: state.botInventory.inventory
});

export default connect(mapStateToProps)(TradeInventory);