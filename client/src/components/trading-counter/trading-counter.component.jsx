import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Filter from '../filter/filter.component';

import './trading-counter.component.scss';
import Label from '../label/label.component';

import { selectBotPrices, selectUserPrices } from '../../redux/temp-item/temp-item.selectors';

const TradingCounter = ({ type, totalPriceBot, totalPriceUser }) => {
  const classValue = type ? `trading-counter ${type}` : "trading-counter";

  return (
    <div className={classValue}>
      <div className="total-money">
        <div className="total-money-content">
          $ {type === "bot" ?
            totalPriceBot :
            totalPriceUser
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
  totalPriceBot: selectBotPrices,
  totalPriceUser: selectUserPrices
})

export default connect(mapStateToProps)(TradingCounter);