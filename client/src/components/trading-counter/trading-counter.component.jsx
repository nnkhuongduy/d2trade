import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Filter from '../filter/filter.component';

import './trading-counter.component.scss';
import Label from '../label/label.component';

import { selectBotPricesUSD, selectUserPricesUSD, selectBotPricesVND, selectUserPricesVND } from '../../redux/temp-item/temp-item.selectors';
import { selectCurrencyState } from '../../redux/currency/currency.selectors'

const TradingCounter = ({ type, totalPriceBotUSD, totalPriceUserUSD, totalPriceBotVND, totalPriceUserVND, currencyState }) => {
  const classValue = type ? `trading-counter ${type}` : "trading-counter";

  return (
    <div className={classValue}>
      <div className="total-money">
        <div className="total-money-content">
          {type === "bot" ?
            (currencyState === "vnd" ? `${totalPriceBotVND} VND` : `$ ${totalPriceBotUSD}`) :
            (currencyState === "vnd" ? `${totalPriceUserVND} VND` : `$ ${totalPriceUserUSD}`)
          }
          {/* $ {type === "bot" ?
            totalPriceBot.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) :
            totalPriceUser.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          } */}
        </div>
      </div>
      <Filter counter={false} type={type} />
      <Label>
        {type === "user" ? "YOU" : "BOT"}
      </Label>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  totalPriceBotUSD: selectBotPricesUSD,
  totalPriceUserUSD: selectUserPricesUSD,
  totalPriceBotVND: selectBotPricesVND,
  totalPriceUserVND: selectUserPricesVND,
  currencyState: selectCurrencyState
})

export default connect(mapStateToProps)(TradingCounter);