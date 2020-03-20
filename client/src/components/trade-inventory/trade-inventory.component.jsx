import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InventorySlot from '../inventory-slot/inventory-slot.component';

import { selectBotTempItem, selectUserTempItem } from '../../redux/temp-item/temp-item.selectors';
import { selectBotInventory, selectUserInventory } from '../../redux/inventory/inventory.selectors';

import './trade-inventory.component.scss';

const TradeInventory = ({ mode, type, botInventory, userInventory, botTempItem, userTempItem }) => (
  <div className={`trade-inventory ${mode}`} >
    <div className={`inventory-container ${mode} ${type}`}>
      {(botInventory && type === "bot" && mode === "steam") && botInventory.map(item => (
        <InventorySlot key={item.item.id} item={item.item} mode={mode} type={type}></InventorySlot>
      ))}
      {(userInventory && type === "user" && mode === "steam") && userInventory.map(item => (
        <InventorySlot key={item.item.id} item={item.item} mode={mode} type={type}></InventorySlot>
      ))}
      {(botTempItem && type === "bot" && mode === "bot") && botTempItem.map(item => (
        <InventorySlot key={item.item.id} item={item.item} mode={type} type={type}></InventorySlot>
      ))}
      {(userTempItem && type === "user" && mode === "user") && userTempItem.map(item => (
        <InventorySlot key={item.item.id} item={item.item} mode={type} type={type}></InventorySlot>
      ))}
    </div>
  </div>
)


const mapStateToProps = createStructuredSelector({
  botInventory: selectBotInventory,
  userInventory: selectUserInventory,
  botTempItem: selectBotTempItem,
  userTempItem: selectUserTempItem
});

export default connect(mapStateToProps)(TradeInventory);