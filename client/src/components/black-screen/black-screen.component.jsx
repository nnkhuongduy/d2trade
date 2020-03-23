import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ServerStatus from '../server-status/server-status.component';

import { toggleBlackScreen, resetOfferStatus } from '../../redux/client-states/client-states.actions';

import { selectOfferStatus } from '../../redux/client-states/client-states.selectors';

import './black-screen.component.scss';

const BlackScreen = ({ toggleBlackScreen, selectOfferStatus, resetOfferStatus }) => {

  const onClickHandle = () => {
    if (selectOfferStatus !== null) {
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
  resetOfferStatus: () => dispatch(resetOfferStatus())
})

const mapStateToProps = createStructuredSelector({
  selectOfferStatus: selectOfferStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(BlackScreen);