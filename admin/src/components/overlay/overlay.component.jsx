import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ConfirmationBox from '../confirmation-box/confirmation-box.component'
import SetBalanceBox from '../set-balance-box/set-balance-box.component'

import { selectOverlayLastStack } from '../../redux/overlay/overlay.selectors'

import './overlay.component.scss'

const Overlay = ({ overlayLastStack }) => (
  <div className={`overlay ${overlayLastStack !== undefined ? 'activated' : ''}`}>
    {overlayLastStack && overlayLastStack.type === "CONFIRMATION" && <ConfirmationBox />}
    {overlayLastStack && overlayLastStack.type === "SETTING_BALANCE" && <SetBalanceBox />}
  </div>
)

const mapStateToProps = createStructuredSelector({
  overlayLastStack: selectOverlayLastStack,
})

export default connect(mapStateToProps)(Overlay)