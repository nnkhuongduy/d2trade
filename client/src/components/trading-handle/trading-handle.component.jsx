import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios'

import Button from '../button/button.component';
import Filter from '../filter/filter.component';
import Label from '../label/label.component';

import { selectStateTempItem } from '../../redux/temp-item/temp-item.selectors';

import './trading-handle.component.scss';

const TradingHandle = ({ tempItem }) => {

  const onClickHandle = () => {
    const itemObject = {
      user: [],
      bot: []
    }
    tempItem.userTempItem.forEach(item => {
      itemObject.user.push(item.id);
    });
    tempItem.botTempItem.forEach(item => {
      itemObject.bot.push(item.id);
    })
    if (itemObject.user.length > 0 || itemObject.bot.length > 0) {
      axios.post("/tradeoffer", itemObject);
    }
    console.log(JSON.stringify(itemObject));
  }

  return (
    <div className="trading-handle">
      <Button classes={["btn-trade"]} onClickHandle={onClickHandle}>TRADE</Button>
      <Button classes={["btn-smart"]}>SMART SELECT</Button>
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

const mapStateToProps = createStructuredSelector({
  tempItem: selectStateTempItem
})


export default connect(mapStateToProps)(TradingHandle);