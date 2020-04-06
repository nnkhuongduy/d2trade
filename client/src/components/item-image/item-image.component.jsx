import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectBotItemsImage, selectUserItemsImage } from '../../redux/items-image/items-image.selectors'

import noneItem from '../../assets/images/none.jpg'

import './item-image.component.scss'

const ItemImage = ({ type, mode, botItemsImage, userItemsImage, itemId, imageState }) => {
  const containerRef = useRef(null)

  useEffect(() => {

    if (containerRef.current && (botItemsImage !== null || userItemsImage !== null) && (botItemsImage[itemId] || userItemsImage[itemId])) {
      if (mode === "steam" && imageState !== true) {
        containerRef.current.appendChild(type === 'bot' ? botItemsImage[itemId] : userItemsImage[itemId])
      }
      if (mode !== "steam" && imageState === true)
        containerRef.current.appendChild(type === 'bot' ? botItemsImage[itemId] : userItemsImage[itemId])
    }
  })

  return (
    <div ref={containerRef} className={'item-img'}>
      {imageState === true && mode === "steam" && <img src={noneItem} alt="item_image" className={'item-img'} />}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  botItemsImage: selectBotItemsImage,
  userItemsImage: selectUserItemsImage
})

export default connect(mapStateToProps)(ItemImage)