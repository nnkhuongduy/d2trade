import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as SpinnerSVG } from '../../assets/svg/spinner.svg';

import { selectOfferStatus } from '../../redux/client-states/client-states.selectors';

import './server-status.component.scss';

const ServerStatus = ({ selectOfferStatus }) => (
  <div className="server-status">
    {/* {selectOfferStatus === 0 && <SpinnerSVG />}
    {selectOfferStatus === 0 && <p>Your offer is being processed...</p>}

    {selectOfferStatus === 1 && <div>SUCCESS!</div>}
    {selectOfferStatus === 1 && <p>Your offer has been sent! Please check your steam offers</p>}

    {selectOfferStatus === 2 && <div>FAILED!</div>}
    {selectOfferStatus === 2 && <p>Your offer has been failed!</p>} */}
  </div>
)

const mapStateToProps = createStructuredSelector({
  selectOfferStatus: selectOfferStatus
})

export default connect(mapStateToProps)(ServerStatus);