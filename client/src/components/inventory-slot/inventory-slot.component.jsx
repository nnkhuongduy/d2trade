import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './inventory-slot.component.scss';

const InventorySlot = ({ item }) => {
  const [price, setPrice] = useState();

  const steamImageUrl = `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`;

  const itemRarityStyle = {
    backgroundColor: `#${item.tags[1].color}`,
    color: ((item.tags[1].name === "Common" || item.tags[1].name === "Immortal") ? "black" : "white")
  }



  useEffect(() => {
    async function fetchPrice() {
      const result = await axios(`/itemprice/${item.market_hash_name}`);
      if (result.data) {
        setPrice(result.data.price.median_price);
      }
    }

    fetchPrice();
  }, []);


  return (
    <div className="inventory-slot" style={itemRarityStyle}>
      <div mode="single" className="item-price">{price}</div>
      <img src={steamImageUrl} className="item-img"></img>
      <div className="item-rarity" >{item.tags[1].name}</div>
    </div>
  )
}

export default InventorySlot;