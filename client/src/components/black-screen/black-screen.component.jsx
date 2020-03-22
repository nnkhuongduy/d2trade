import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ServerStatus from '../server-status/server-status.component';

import { toggleBlackScreen } from '../../redux/client-states/client-states.actions';

import { selectServerOfferSuccessState } from '../../redux/client-states/client-states.selectors';

import './black-screen.component.scss';

const BlackScreen = ({ toggleBlackScreen, serverOfferSuccessStatus }) => {

  const onClickHandle = () => {
    if (serverOfferSuccessStatus !== 0) {
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
  serverOfferSuccessStatus: selectServerOfferSuccessState
})

export default connect(mapStateToProps, mapDispatchToProps)(BlackScreen);