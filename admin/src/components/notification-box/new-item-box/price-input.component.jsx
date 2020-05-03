import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Icon } from 'react-icons-kit'
import { ic_import_export } from 'react-icons-kit/md/ic_import_export'

import { balanceInputFilter } from '../../../helpers/balance-input-filter'

import { selectCurrencyRate } from '../../../redux/site-settings/site-settings.selectors'

import './price-input.component.scss'


const PriceInput = ({ itemState, currencyRate, ...props }) => {

  const [vndValue, setVndValue] = useState("0")

  const currentItem = itemState.currentItem
  const setCurrentItem = itemState.setCurrentItem

  useEffect(() => {
    setVndValue(currentItem.prices.vnd.toLocaleString())
  }, [currentItem])

  const vndHandle = e => {
    const value = balanceInputFilter(e.target.value)
    const numberValue = value !== "" ? parseInt(value.replace(/,/g, '')) : 0

    setVndValue(value)
    setCurrentItem({ ...currentItem, prices: { ...currentItem.prices, vnd: numberValue } })
  }

  const convertHandle = e => {
    const currency = e.target.className.includes("to-usd") ? "usd" : "vnd"

    const currentUSD = currentItem.prices.usd
    const currentVND = currentItem.prices.vnd

    const newUSD = Math.ceil(currentVND / (currencyRate * 1000) * 100) / 100
    const newVND = Math.ceil(currentUSD * currencyRate) * 1000

    setCurrentItem({ ...currentItem, prices: { ...currentItem.prices, [currency]: currency === "usd" ? newUSD : newVND } })
  }

  return (
    <div className={'item-price-input'}>
      <label>Giá: </label>
      <div className={'input-container'}>
        <label>USD: </label>
        <input className={'input'} type="number"
          value={currentItem.prices.usd}
          onChange={e => setCurrentItem({ ...currentItem, prices: { ...currentItem.prices, usd: e.target.value } })}
        />
        <Icon icon={ic_import_export} className={'price-converter to-usd'} size={18} onClick={convertHandle} />
      </div>
      <div className={'input-container'}>
        <label>VND: </label>
        <input className={'input'} type="text"
          value={vndValue}
          onChange={vndHandle}
        />
        <Icon icon={ic_import_export} className={'price-converter to-vnd'} size={18} onClick={convertHandle} />
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currencyRate: selectCurrencyRate
})

export default connect(mapStateToProps)(PriceInput)