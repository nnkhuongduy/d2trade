import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ItemImage from '../item-image/item-image.component';

import { setTempItem, unsetTempItem } from '../../redux/temp-item/temp-item.actions';
import { toggleSlotState } from '../../redux/slot-state/slot-state.actions';

import { selectBotSlotStates, selectUserSlotStates } from '../../redux/slot-state/slot-state.selectors';
import { selectBotRenderedInventory, selectUserRenderedInventory } from '../../redux/inventory/inventory.selectors';

import './inventory-slot.component.scss';

const InventorySlot = ({
  item, mode, type,
  setTempItem, unsetTempItem,
  botSlotStates, userSlotStates, toggleSlotState,
  botRenderedInventory, userRenderedInventory,
}) => {
  const [displayState, setDisplayState] = useState("block");

  const slotId = item.id;

  const itemRarityStyle = {
    backgroundColor: `#${item.tags[1].color}`,
    color: ((item.tags[1].name !== "Common" && item.tags[1].name !== "Immortal") ? "white" : "black"),
    filter: mode === "steam" && (type === "bot" ? botSlotStates[slotId] : userSlotStates[slotId]) ? "grayscale(100%) brightness(50%)" : "",
    display: mode === "steam" ? displayState : "block",
    fontSize: slotId === 'moneyItem' && '12px'
  }

  useEffect(() => {
    if (mode === "steam" && type === "bot") {
      setDisplayState(botRenderedInventory.includes(slotId) ? "block" : "none")
    }
    if (mode === "steam" && type === "user") {
      setDisplayState(userRenderedInventory.includes(slotId) ? "block" : "none")
    }
  }, [botRenderedInventory, userRenderedInventory, setDisplayState, mode, type, slotId])

  const onClickHandle = () => {
    if (mode === "steam" && type === "bot" && (botSlotStates[slotId] === false || botSlotStates[slotId] === undefined)) {
      setTempItem(type, item);
      toggleSlotState(type, slotId, true)
    }
    if (mode === "steam" && type === "user" && (userSlotStates[slotId] === false || userSlotStates[slotId] === undefined)) {
      setTempItem(type, item);
      toggleSlotState(type, slotId, true)
    }
    if ((mode === "bot" && type === "bot") || botSlotStates[slotId] === true) {
      unsetTempItem(type, item);
      toggleSlotState(type, slotId, false)
    }
    if ((mode === "bot" && type === "user") || userSlotStates[slotId] === true) {
      unsetTempItem(type, item);
      toggleSlotState(type, slotId, false)
    }
  }

  return (
    <div className="inventory-slot" style={itemRarityStyle} onClick={onClickHandle}>
      <div mode="single" className="item-price">$ {item.market_price}</div>
      <ItemImage type={type} mode={mode} itemId={slotId} imageState={type === "bot" ? botSlotStates[slotId] : userSlotStates[slotId]} />
      {/* {mode === "steam" && (botSlotStates[slotId] !== true && userSlotStates[slotId] !== true ?
        <ItemImage type={type} mode={mode} itemId={slotId} /> :
        <img src={noneItem} alt='item_image' className={'item-none-img'} />)
      }
      {mode !== "steam" && <ItemImage type={type} mode={mode} itemId={slotId} />} */}
      <div className="item-rarity" >{item.tags[1].name}</div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setTempItem: (type, item) => dispatch(setTempItem(type, item)),
  unsetTempItem: (type, item) => dispatch(unsetTempItem(type, item)),
  toggleSlotState: (type, id, status) => dispatch(toggleSlotState(type, id, status)),
})

const mapStateToProps = createStructuredSelector({
  botSlotStates: selectBotSlotStates,
  userSlotStates: selectUserSlotStates,
  botRenderedInventory: selectBotRenderedInventory,
  userRenderedInventory: selectUserRenderedInventory,
})

export default connect(mapStateToProps, mapDispatchToProps)(InventorySlot);