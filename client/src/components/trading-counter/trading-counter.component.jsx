import React from 'react';
import { Textfit } from 'react-textfit';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Filter from '../filter/filter.component';

import './trading-counter.component.scss';
import Label from '../label/label.component';

import { selectTotalPricesBot, selectTotalPricesUser } from '../../redux/temp-item/temp-item.selectors';

const TradingCounter = ({ type, totalPriceBot, totalPriceUser }) => {
  const classValue = type ? `trading-counter ${type}` : "trading-counter";

  return (
    <div className={classValue}>
      <div className="total-money">
        <div className="total-money-content">
          {/* <Textfit mode="single"> */}
            $ {type === "bot" ?
            totalPriceBot.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) :
            totalPriceUser.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
          {/* </Textfit> */}
        </div>
      </div>
      <Filter counter={false} />
      <Label>
        {type === "user" ? "YOU" : "BOT"}
      </Label>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  totalPriceBot: selectTotalPricesBot,
  totalPriceUser: selectTotalPricesUser
})

export default connect(mapStateToProps)(TradingCounter);