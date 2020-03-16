import React from 'react';

import InventorySlot from '../inventory-slot/inventory-slot.component';

import './trade-inventory.component.scss';

const TradeInventory = (props) => {
  let mode = props.mode;
  let array = [];

  for (let i = 0; i < 20; i++) {
    array.push(i);
  }

  return (
    <div className={`trade-inventory ${mode} `} >
      <div className="inventory-container">
        {array.map(index => (
          <InventorySlot key={index}></InventorySlot>
        ))}
      </div>
    </div>
  )
}


export default TradeInventory;