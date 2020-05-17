import React from 'react'

const iconUrl = 'https://steamcommunity-a.akamaihd.net/economy/image/'

const ItemImg = ({ perc, src, money }) => (
  <img src={money ? src : iconUrl + src} style={{ width: (256 * perc / 100), height: (171 * perc / 100) }} />
)

export default ItemImg