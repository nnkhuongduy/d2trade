import React from 'react'

import './user-offer.component.scss'

const UserOffer = ({ offer, ...props }) => {
  let circleColor = '';

  if (offer && offer.status === "Accepted") circleColor = "#007f00"
  else if (offer && (offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created")) circleColor = "#E5D712"
  else if (offer) circleColor = "#b20000"

  const statusStyle = {
    backgroundColor: circleColor
  }

  if (offer) {
    return (
      <div className={'user-offers user-offer'}>
        <div className={'offer-id'}>
          <span>{offer.offer_id}</span>
        </div>
        <div className={'user-items'}>
          <div className={'pics-container'}>
            {offer.user_items && offer.user_items.map(item => <img key={item.id} src={item.image_url} className={'item-pic'} alt={'item_image'} />)}
          </div>
        </div>
        <div className={'bot-items'}>
          <div className={'pics-container'}>
            {offer.bot_items && offer.bot_items.map(item => <img key={item.id} src={item.image_url} className={'item-pic'} alt={'item_image'} />)}
          </div>
        </div>
        <div className={'offer-date'}>
          {offer.date.slice(0, 10)}
        </div>
        <div className={'offer-status'}>
          <span className={'status-circle'} style={statusStyle}></span> {offer.status}
        </div>
      </div>
    )
  } else {
    return (
      <div className={'user-offers offer-list'}>
        <div className={'offer-id'}>
          ID
        </div>
        <div className={'user-items'}>
          USER'S ITEM
        </div>
        <div className={'bot-items'}>
          BOT'S ITEM
        </div>
        <div className={'offer-date'}>
          DATE
        </div>
        <div className={'offer-status'}>
          STATUS
        </div>
      </div>
    )
  }
}

export default UserOffer;