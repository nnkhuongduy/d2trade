import React from 'react'
import { connect } from 'react-redux'

import { popOverlayStart, updateLastStack } from '../../../redux/overlay/overlay.actions'

import './confirmation-buttons.component.scss'

const ConfirmationButtons = ({ popOverlayStart, updateLastStack, stack, ...props }) => {
  const clickHandler = e => {
    const decision = e.target.classList.contains("accept")
    if (stack)
      updateLastStack(stack)
    popOverlayStart(decision)
  }

  return (
    <div className={'confirmation-buttons'}>
      <button className={'btn cancel'} onClick={clickHandler}>HỦY BỎ</button>
      <button className={'btn accept'} onClick={clickHandler}>XÁC NHẬN</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  popOverlayStart: decision => dispatch(popOverlayStart(decision)),
  updateLastStack: stack => dispatch(updateLastStack(stack))
})

export default connect(null, mapDispatchToProps)(ConfirmationButtons)