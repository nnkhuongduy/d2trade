import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ConfirmationBox from '../notification-box/confirmation-box/confirmation-box.component'
import SetBalanceBox from '../notification-box/set-balance-box/set-balance-box.component'
import ModifyBalanceBox from '../notification-box/modify-balance-box/modify-balance-box.component'
import NewItemBox from '../notification-box/new-item-box/new-item-box.component'

import { selectOverlayLastStack } from '../../redux/overlay/overlay.selectors'

import './overlay.component.scss'

const Overlay = ({ overlayLastStack }) => (
  <div className={`overlay ${overlayLastStack !== undefined ? 'activated' : ''}`}>
    {overlayLastStack && overlayLastStack.type === "CONFIRMATION" && <ConfirmationBox />}
    {overlayLastStack && overlayLastStack.type === "SETTING_BALANCE" && <SetBalanceBox />}
    {overlayLastStack && overlayLastStack.type === "MODIFYING_BALANCE" && <ModifyBalanceBox />}
    {overlayLastStack && overlayLastStack.type === "NEW_ITEM" && <NewItemBox />}
  </div>
)

const mapStateToProps = createStructuredSelector({
  overlayLastStack: selectOverlayLastStack,
})

export default connect(mapStateToProps)(Overlay)