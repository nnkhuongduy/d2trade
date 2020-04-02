import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../button/button.component';
import Filter from '../filter/filter.component';
import Label from '../label/label.component';

import { selectTradeButtonState } from '../../redux/temp-item/temp-item.selectors';

import { fetchOfferStatusStart } from '../../redux/client-states/client-states.actions';

import './trading-handle.component.scss';

const TradingHandle = ({ tradeButtonState, fetchOfferStatusStart }) => {
  const onClickHandle = () => {
    if (tradeButtonState) {
      fetchOfferStatusStart();
    }
  }

  return (
    <div className="trading-handle">
      <Button classes={["btn-trade"]} onClickHandle={onClickHandle} available={tradeButtonState}>TRADE</Button>
      <div className="rate-container">
        <div className="rate">Rate:</div>
      </div>
      <div className="handle-filter-container">
        <Filter counter={true} />
        <Label>ALL</Label>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchOfferStatusStart: () => dispatch(fetchOfferStatusStart())
})

const mapStateToProps = createStructuredSelector({
  tradeButtonState: selectTradeButtonState
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingHandle);