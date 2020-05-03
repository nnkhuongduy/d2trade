import React, { useState } from 'react'
import { connect } from 'react-redux'

import Button from '../../buttons/button/button.component'

import { fetchItemStart } from '../../../redux/item/item.actions'

import './name-input.component.scss'

const INITIAL_ITEM = {
  name: "",
  iconUrl: "",
  prices: {
    usd: 0,
    vnd: 0,
  }
}

const PriceInput = ({ fetchItemStart, itemState, ...props }) => {

  const [nameValue, setNameValue] = useState("")

  const setCurrentItem = itemState.setCurrentItem

  const fetchHandle = e => {
    e.preventDefault();
    if (nameValue !== "") {
      fetchItemStart(nameValue)
      setCurrentItem({ ...INITIAL_ITEM, name: nameValue })
    }
  }

  return (
    <form className={'item-name-input'}>
      <div className={'input-container'}>
        <label>Tên: </label>
        <input className={'input'} type="text"
          value={nameValue}
          onChange={e => setNameValue(e.target.value)}
        />
      </div>
      <Button onClick={fetchHandle} type="submit">Lấy thông tin Item từ Market</Button>
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchItemStart: itemName => dispatch(fetchItemStart(itemName))
})

export default connect(null, mapDispatchToProps)(PriceInput)