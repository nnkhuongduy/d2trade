import React from 'react'
import { connect } from 'react-redux'

import { popOverlayStart } from '../../redux/overlay/overlay.actions'

import './confirmation-box.component.scss'

const ConfirmationBox = ({ popOverlayStart }) => {
  return (
    <div className={'user-changed-confirmation'}>
      <h4>Xác nhận thay đổi?</h4>
      <button className={'btn cancel'} onClick={() => popOverlayStart(false)}>Hủy bỏ</button>
      <button className={'btn accept'} onClick={() => popOverlayStart(true)}>Xác nhận</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  popOverlayStart: decision => dispatch(popOverlayStart(decision))
})

export default connect(null, mapDispatchToProps)(ConfirmationBox)