import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';

import { setTempItem, unsetTempItem } from '../../redux/temp-item/temp-item.actions';
import { toggleSlotState } from '../../redux/slot-state/slot-state.actions';
import { selectSlotStates } from '../../redux/slot-state/slot-state.selectors';

import './inventory-slot.component.scss';

const InventorySlot = ({ item, mode, type, setTempItem, unsetTempItem, slotState, toggleSlotState }) => {
  // const [price, setPrice] = useState();
  const slotId = item.id;

  const steamImageUrl = `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`;

  const itemRarityStyle = {
    backgroundColor: `#${item.tags[1].color}`,
    color: ((item.tags[1].name === "Common" || item.tags[1].name === "Immortal") ? "black" : "white"),
    filter: mode === "steam" && ((slotState[slotId]) ? "" : "grayscale(100%) brightness(50%)"),
  }

  // useEffect(() => {
  //   async function fetchPrice() {
  //     const result = await axios(`/itemprice/${item.market_hash_name}`);
  //     if (result.data) {
  //       setPrice(result.data.price.median_price);
  //     }
  //   }

  //   fetchPrice();
  // }, []);

  useEffect(() => {
    if (mode === "steam") {
      toggleSlotState({
        id: slotId,
        status: true
      })
    }
  }, [])

  const doubleClickHandle = () => {
    const tempItem = {
      id: item.id,
      mode: mode,
      type: type,
      item: item
    }
    if (mode === "steam" && slotState[slotId] === true) {
      setTempItem(tempItem);
      toggleSlotState({
        id: slotId,
        status: false
      })
    }
    if (mode === "bot" || slotState[slotId] === false) {
      unsetTempItem(tempItem);
      toggleSlotState({
        id: slotId,
        status: true
      })
    }
  }

  return (
    <div className="inventory-slot" style={itemRarityStyle} onDoubleClick={doubleClickHandle}>
      <div mode="single" className="item-price">$ {item.market_price}</div>
      <img src={steamImageUrl} className="item-img"></img>
      <div className="item-rarity" >{item.tags[1].name}</div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setTempItem: item => dispatch(setTempItem(item)),
  unsetTempItem: item => dispatch(unsetTempItem(item)),
  toggleSlotState: slot => dispatch(toggleSlotState(slot))
})

const mapStateToProps = createStructuredSelector({
  slotState: selectSlotStates
})

export default connect(mapStateToProps, mapDispatchToProps)(InventorySlot);