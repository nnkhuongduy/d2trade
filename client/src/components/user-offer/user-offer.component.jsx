import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Icon } from 'react-icons-kit'
import { ic_compare_arrows } from 'react-icons-kit/md/ic_compare_arrows'

import { selectCurrencyState } from '../../redux/currency/currency.selectors'

import './user-offer.component.scss'

const UserOffer = ({ offer, currencyState, ...props }) => {
  const [userBalance, setUserBalance] = useState(0)

  let circleColor = '';
  const iconSource = 'https://steamcommunity-a.akamaihd.net/economy/image/'

  if (offer && offer.status === "Accepted") circleColor = "#007f00"
  else if (offer && (offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created")) circleColor = "#E5D712"
  else if (offer) circleColor = "#b20000"

  const statusStyle = {
    backgroundColor: circleColor
  }

  const generateIconSource = (item) => (
    item.id !== 'moneyItem' ? iconSource + item.icon_url : item.icon_url
  )

  useEffect(() => {
    if (offer && offer.user_items) {
      offer.user_items.forEach(item => {
        if (item.id === 'moneyItem')
          setUserBalance(parseInt(item.vnd_price.replace(/,/g, '')))
      })
    }
  }, [offer])

  if (offer) {
    return (
      <div className={'user-offers user-offer'}>
        <div className={'offer-id'}>
          <span>{offer.offer_id}</span>
        </div>
        <div className={'user-items items-container'}>
          <div className={'pics-container'}>
            {offer.user_items && offer.user_items.map(item => <img key={item.id} src={generateIconSource(item)} className={'item-pic'} alt={'item_image'} />)}
          </div>
          <div className={'price-container'}>
            <span>Total:</span>
            {currencyState === "vnd" && offer.user_items && (offer.user_items.reduce((acc, item) => acc += parseInt(item.vnd_price.replace(/,/g, '')), 0)).toLocaleString() + " VND"}
            {currencyState === "usd" && offer.user_items && (offer.user_items.reduce((acc, item) => acc += parseFloat(item.market_price), 0)).toFixed(2) + " USD"}
          </div>
        </div>
        <Icon icon={ic_compare_arrows} className={'compare-arrow'} />
        <div className={'bot-items items-container'}>
          <div className={'pics-container'}>
            {offer.bot_items && offer.bot_items.map(item => <img key={item.id} src={generateIconSource(item)} className={'item-pic'} alt={'item_image'} />)}
          </div>
          <div className={'price-container'}>
            <span>Total: </span>
            {currencyState === "vnd" && offer.bot_items && (offer.bot_items.reduce((acc, item) => acc += parseInt(item.vnd_price.replace(/,/g, '')), 0)).toLocaleString() + " VND"}
            {currencyState === "usd" && offer.bot_items && (offer.bot_items.reduce((acc, item) => acc += parseFloat(item.market_price), 0)).toFixed(2) + " USD"}
          </div>
        </div>
        <div className={'offer-date'}>
          {offer.date.slice(0, 10)}
        </div>
        <div className={`user-balance ${userBalance !== 0 ? (offer.status === 'Declined' ? 'gray' : 'negative') : ''}`}>
          {(userBalance !== 0 ? -Math.abs(userBalance) : userBalance).toLocaleString()}
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
        <div className={'users-items items-container'}>
          USER'S ITEM
        </div>
        <div />
        <div className={'bot-items items-container'}>
          BOT'S ITEM
        </div>
        <div className={'offer-date'}>
          DATE
        </div>
        <div className={'user-balance'}>
          YOUR BALANCE
        </div>
        <div className={'offer-status'}>
          STATUS
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currencyState: selectCurrencyState
})

export default connect(mapStateToProps)(UserOffer);