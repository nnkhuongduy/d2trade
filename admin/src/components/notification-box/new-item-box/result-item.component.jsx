import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import SyncLoader from 'react-spinners/SyncLoader'

import { selectItem, selectFetchingState } from '../../../redux/item/item.selectors'

import './result-item.component.scss'

const itemIconUrl = 'https://steamcommunity-a.akamaihd.net/economy/image/'

const cssOveride = `
  width: max-content;
  height: max-content;
  display: block;
  margin: 0 auto;
  align-self: center;
`

const ResultItem = ({ item, fetchingState, itemState, ...props }) => {

  const currentItem = itemState.currentItem
  const setCurrentItem = itemState.setCurrentItem

  useEffect(() => {
    if (item) setCurrentItem({ ...item, prices: { ...item.prices, vnd: item.prices.vnd } })
    //eslint-disable-next-line
  }, [item])

  if (item)
    return (
      <div className={'item-result'}>
        <div className={'item-icon'}>
          {currentItem.icon_url && <img src={itemIconUrl + currentItem.icon_url} alt={'item_icon'} />}
        </div>
        <h4 className={'item-name'}>{currentItem.name}</h4>
        <span className={'item-market-price'}>USD: {currentItem.prices.usd} $</span>
        <span className={'item-market-price'}>VND: {currentItem.prices.vnd.toLocaleString()} VND</span>
      </div>
    )
  else
    if (fetchingState)
      return (
        <SyncLoader size={10} color={'royalblue'} css={cssOveride} />
      )
    else
      return (
        <div className={'item-result'}>
          <div className={'item-icon'}></div>
          <h4 className={'item-name'}>Tên Item</h4>
          <span className={'item-market-price'}>Giá Item</span>
        </div>
      )
}

const mapStateToProps = createStructuredSelector({
  item: selectItem,
  fetchingState: selectFetchingState
})

export default connect(mapStateToProps)(ResultItem)