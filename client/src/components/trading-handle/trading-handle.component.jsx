import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../button/button.component';
import Filter from '../filter/filter.component';
import Label from '../label/label.component';

import { fetchOfferStatusStart } from '../../redux/client-states/client-states.actions';
import { setCurrency } from '../../redux/currency/currency.actions'

import { selectTradeButtonState } from '../../redux/temp-item/temp-item.selectors';
import { selectCurrencyState, selectCurrencyRate } from '../../redux/currency/currency.selectors'

import './trading-handle.component.scss';

const TradingHandle = ({ tradeButtonState, fetchOfferStatusStart, setCurrency, currencyState, currencyRate }) => {
  const onClickHandle = () => {
    if (tradeButtonState) {
      fetchOfferStatusStart();
    }
  }

  const changeCurrency = () => {
    setCurrency(currencyState === "usd" ? "vnd" : "usd");
  }

  return (
    <div className="trading-handle">
      <Button classes={["btn-trade"]} onClickHandle={onClickHandle} available={tradeButtonState}>TRADE</Button>
      <div className="rate-container">
        <div className="rate">Rate: {currencyRate}</div>
      </div>
      <div className="handle-filter-container">
        <Filter counter={true} />
        <Button classes={["btn-currency"]} onClickHandle={changeCurrency}>CHANGE CURRENCY</Button>
        <div className={'currency-state'}>{currencyState.toUpperCase()}</div>
        <Label type={'global'}>ALL</Label>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchOfferStatusStart: () => dispatch(fetchOfferStatusStart()),
  setCurrency: (type) => dispatch(setCurrency(type))
})

const mapStateToProps = createStructuredSelector({
  tradeButtonState: selectTradeButtonState,
  currencyState: selectCurrencyState,
  currencyRate: selectCurrencyRate
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingHandle);