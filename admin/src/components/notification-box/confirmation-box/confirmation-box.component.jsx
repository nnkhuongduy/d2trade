import React from 'react'
import { connect } from 'react-redux'

import ConfirmationButtons from '../../buttons/confirmation-buttons/confirmation-buttons.component'

import { popOverlayStart } from '../../../redux/overlay/overlay.actions'

import './confirmation-box.component.scss'

const ConfirmationBox = ({ popOverlayStart }) => {
  return (
    <div className={'user-changed-confirmation'}>
      <h4>Xác nhận thay đổi?</h4>
      <ConfirmationButtons />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  popOverlayStart: decision => dispatch(popOverlayStart(decision))
})

export default connect(null, mapDispatchToProps)(ConfirmationBox)