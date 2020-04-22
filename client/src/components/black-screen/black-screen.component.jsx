import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ServerStatus from '../server-status/server-status.component';

import { toggleBlackScreen, resetOfferStatus, resetClientState } from '../../redux/client-states/client-states.actions';

import { selectOfferStatus } from '../../redux/client-states/client-states.selectors';

import './black-screen.component.scss';

const BlackScreen = ({
  toggleBlackScreen, offerStatus,
  resetOfferStatus,
  resetClientState
}) => {

  const onClickHandle = () => {
    if (offerStatus !== null) {
      if (offerStatus === true) {
        resetClientState();
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
  resetClientState: () => dispatch(resetClientState())
})

const mapStateToProps = createStructuredSelector({
  offerStatus: selectOfferStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(BlackScreen);