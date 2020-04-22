import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../button/button.component';
import { ReactComponent as SpinnerSVG } from '../../assets/svg/spinner.svg';

import { selectOfferStatus } from '../../redux/client-states/client-states.selectors';

import { toggleBlackScreen, resetOfferStatus, resetClientState } from '../../redux/client-states/client-states.actions';
import { logInStart } from '../../redux/user/user.actions'

import { Icon } from '@iconify/react';
import checkMarkButton from '@iconify/icons-emojione/check-mark-button';
import sharpCancel from '@iconify/icons-ic/sharp-cancel';

import './server-status.component.scss';

const ServerStatus = ({
  offerStatus, toggleBlackScreen,
  resetOfferStatus,
  resetClientState,
  logInStart
}) => {
  const offerStatusNull = () => (
    <>
      <SpinnerSVG />
      <p>Your offer is being processed...</p>
    </>
  )

  const offerStatusSuccess = () => (
    <>
      <Icon icon={checkMarkButton} />
      <p>Your offer has been sent! Please check your steam offers</p>
    </>
  )

  const offerStatusFailure = () => (
    <>
      <Icon icon={sharpCancel} />
      <p>Your offer has been failed to process! Please try again</p>
    </>
  )

  const onClickHandle = () => {
    toggleBlackScreen();
    resetOfferStatus();
    if (offerStatus === true) {
      resetClientState();
      logInStart();
    }
  }

  return (
    <div className="server-status">
      {offerStatus === null && offerStatusNull()}
      {offerStatus === true && offerStatusSuccess()}
      {offerStatus === false && offerStatusFailure()}
      {offerStatus !== null && <Button classes={["server-btn"]} onClickHandle={onClickHandle}>BACK</Button>}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleBlackScreen: () => dispatch(toggleBlackScreen()),
  resetOfferStatus: () => dispatch(resetOfferStatus()),
  resetClientState: () => dispatch(resetClientState()),
  logInStart: () => dispatch(logInStart())
})

const mapStateToProps = createStructuredSelector({
  offerStatus: selectOfferStatus
})

export default connect(mapStateToProps, mapDispatchToProps)(ServerStatus);