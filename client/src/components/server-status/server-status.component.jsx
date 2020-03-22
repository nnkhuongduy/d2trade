import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as SpinnerSVG } from '../../assets/svg/spinner.svg';

import { selectServerOfferSuccessState } from '../../redux/client-states/client-states.selectors';

import './server-status.component.scss';

const ServerStatus = ({ serverOfferSuccessState }) => (
  <div className="server-status">
    {serverOfferSuccessState === 0 && <SpinnerSVG />}
    {serverOfferSuccessState === 0 && <p>Your offer is being processed...</p>}

    {serverOfferSuccessState === 1 && <div>SUCCESS!</div>}
    {serverOfferSuccessState === 1 && <p>Your offer has been sent! Please check your steam offers</p>}

    {serverOfferSuccessState === 2 && <div>FAILED!</div>}
    {serverOfferSuccessState === 2 && <p>Your offer has been failed!</p>}
  </div>
)

const mapStateToProps = createStructuredSelector({
  serverOfferSuccessState: selectServerOfferSuccessState
})

export default connect(mapStateToProps)(ServerStatus);