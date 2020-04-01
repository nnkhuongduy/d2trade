import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import TradingCounter from '../trading-counter/trading-counter.component';
import TradeInventory from '../trade-inventory/trade-inventory.component';
import SteamInventoryArea from '../steam-inventory-area/steam-inventory-area.component';

import { fetchInventoryStart } from '../../redux/inventory/inventory.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import './trading-area.component.scss';

const TradingArea = ({ type, fetchInventoryStart, currentUser }) => {

  useEffect(() => {
    fetchInventoryStart(type === "bot" && "bot");
  }, [])

  useEffect(() => {
    currentUser && fetchInventoryStart("user");
  }, [currentUser])

  return (
    <div className="trading-area">
      {(!currentUser && type === "user") &&
        <div className="user-block">
          <h1>Please log in</h1>
        </div>
      }
      <TradingCounter type={type} />
      <TradeInventory mode={type} type={type} />
      <SteamInventoryArea type={type} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  fetchInventoryStart: type => dispatch(fetchInventoryStart(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingArea);