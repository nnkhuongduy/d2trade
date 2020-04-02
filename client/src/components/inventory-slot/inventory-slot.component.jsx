import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

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
  // const [price, setPrice] = useState();
  const [displayState, setDisplayState] = useState("block");

  const slotId = item.id;

  const steamImageUrl = `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`;

  const itemRarityStyle = {
    backgroundColor: `#${item.tags[1].color}`,
    color: ((item.tags[1].name === "Common" || item.tags[1].name === "Immortal") ? "black" : "white"),
    filter: mode === "steam" && (type === "bot" ? botSlotStates[slotId] : userSlotStates[slotId]) ? "grayscale(100%) brightness(50%)" : "",
    display: mode === "steam" ? displayState : "block"
  }

  useEffect(() => {
    if (mode === "steam" && type === "bot") {
      setDisplayState(botRenderedInventory.includes(slotId) ? "block" : "none")
    }
  }, [botRenderedInventory])

  useEffect(() => {
    if (mode === "steam" && type === "user") {
      setDisplayState(userRenderedInventory.includes(slotId) ? "block" : "none")
    }
  }, [userRenderedInventory])

  // useEffect(() => {
  //   async function fetchPrice() {
  //     const result = await axios(`/itemprice/${item.market_hash_name}`);
  //     if (result.data) {
  //       setPrice(result.data.price.median_price);
  //     }
  //   }

  //   fetchPrice();
  // }, []);

  // useEffect(() => {
  //   if (mode === "steam") {
  //     toggleSlotState({
  //       id: slotId,
  //       status: true
  //     })
  //   }
  // }, [])

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
      <img src={steamImageUrl} className="item-img"></img>
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