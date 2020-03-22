import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ServerStatus from '../server-status/server-status.component';

import { toggleBlackScreen } from '../../redux/client-states/client-states.actions';

import { selectOfferStatus } from '../../redux/client-states/client-states.selectors';

import './black-screen.component.scss';

const BlackScreen = ({ toggleBlackScreen, selectOfferStatus }) => {

  const onClickHandle = () => {
    if (selectOfferStatus) {
      toggleBlackScreen();
    }
  }

  return (
    <div className={`black-screen`} onClick={onClickHandle}>
      <ServerStatus />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleBlackScreen: () => dispatch(toggleBlackScreen())
})

const mapStateToProps = createStructuredSelector({
  selectOfferStatus: selectOfferStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(BlackScreen);