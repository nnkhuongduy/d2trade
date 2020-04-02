import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ServerStatus from '../server-status/server-status.component';

import { toggleBlackScreen, resetOfferStatus } from '../../redux/client-states/client-states.actions';
import { refreshTempItems } from '../../redux/temp-item/temp-item.actions'
import { refreshSlotsState } from '../../redux/slot-state/slot-state.actions'
import { refreshInventory } from '../../redux/inventory/inventory.actions'

import { selectOfferStatus } from '../../redux/client-states/client-states.selectors';

import './black-screen.component.scss';

const BlackScreen = ({
  toggleBlackScreen, offerStatus,
  resetOfferStatus, refreshSlotsState,
  refreshTempItems,
  refreshInventory
}) => {

  const onClickHandle = () => {
    if (offerStatus !== null) {
      if (offerStatus === true) {
        refreshInventory("bot");
        refreshInventory("user");
        refreshTempItems("bot");
        refreshTempItems("user");
        refreshSlotsState("user");
        refreshSlotsState("bot");
      }
      toggleBlackScreen();
      resetOfferStatus();
    }
  }

  return (
    <div className="black-screen-container">
      <div className={`black-screen`} onClick={onClickHandle} />
      <ServerStatus />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleBlackScreen: () => dispatch(toggleBlackScreen()),
  resetOfferStatus: () => dispatch(resetOfferStatus()),
  refreshTempItems: type => dispatch(refreshTempItems(type)),
  refreshSlotsState: type => dispatch(refreshSlotsState(type)),
  refreshInventory: type => dispatch(refreshInventory(type)),
})

const mapStateToProps = createStructuredSelector({
  offerStatus: selectOfferStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(BlackScreen);