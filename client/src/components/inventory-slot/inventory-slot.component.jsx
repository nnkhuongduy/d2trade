import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

import { setBotTempItem, unsetBotTempItem, setUserTempItem, unsetUserTempItem } from '../../redux/temp-item/temp-item.actions';
import { toggleSlotState } from '../../redux/slot-state/slot-state.actions';
import { selectSlotStates } from '../../redux/slot-state/slot-state.selectors';
import { selectBotRenderedInventory, selectUserRenderedInventory } from '../../redux/inventory/inventory.selectors';
import { selectBotSearchingState, selectUserSearchingState } from '../../redux/searching/searching.selectors'

import './inventory-slot.component.scss';

const InventorySlot = ({
  item, mode, type,
  setBotTempItem, unsetBotTempItem, setUserTempItem, unsetUserTempItem,
  slotState, toggleSlotState,
  botRenderedInventory, userRenderedInventory,
  botSearchingState, userSearchingState
}) => {
  // const [price, setPrice] = useState();
  const [displayState, setDisplayState] = useState("block");

  const slotId = item.id;

  const steamImageUrl = `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`;

  const itemRarityStyle = {
    backgroundColor: `#${item.tags[1].color}`,
    color: ((item.tags[1].name === "Common" || item.tags[1].name === "Immortal") ? "black" : "white"),
    filter: mode === "steam" && ((slotState[slotId]) ? "grayscale(100%) brightness(50%)" : ""),
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
    const tempItem = {
      id: item.id,
      item: item
    }
    if (mode === "steam" && type === "bot" && (slotState[slotId] === false || slotState[slotId] === undefined)) {
      setBotTempItem(tempItem);
      toggleSlotState({
        id: slotId,
        status: true
      })
    }
    if (mode === "steam" && type === "user" && (slotState[slotId] === false || slotState[slotId] === undefined)) {
      setUserTempItem(tempItem);
      toggleSlotState({
        id: slotId,
        status: true
      })
    }
    if ((mode === "bot" && type === "bot") || slotState[slotId] === true) {
      unsetBotTempItem(tempItem);
      toggleSlotState({
        id: slotId,
        status: false
      })
    }
    if ((mode === "bot" && type === "user") || slotState[slotId] === true) {
      unsetUserTempItem(tempItem);
      toggleSlotState({
        id: slotId,
        status: false
      })
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
  setBotTempItem: item => dispatch(setBotTempItem(item)),
  unsetBotTempItem: item => dispatch(unsetBotTempItem(item)),
  setUserTempItem: item => dispatch(setUserTempItem(item)),
  unsetUserTempItem: item => dispatch(unsetUserTempItem(item)),
  toggleSlotState: slot => dispatch(toggleSlotState(slot)),
})

const mapStateToProps = createStructuredSelector({
  slotState: selectSlotStates,
  botRenderedInventory: selectBotRenderedInventory,
  userRenderedInventory: selectUserRenderedInventory,
  botSearchingState: selectBotSearchingState,
  userSearchingState: selectUserSearchingState
})

export default connect(mapStateToProps, mapDispatchToProps)(InventorySlot);