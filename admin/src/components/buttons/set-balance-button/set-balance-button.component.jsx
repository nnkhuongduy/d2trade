import React from 'react'
import { connect } from 'react-redux'

import { Icon } from 'react-icons-kit'
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'

import { pushOverlay } from '../../../redux/overlay/overlay.actions'

import './set-balance-button.component.scss'

const SetBalanceButton = ({ pushOverlay, user, ...props }) => {

  const editClickHandle = () => {
    pushOverlay({ type: "SETTING_BALANCE", data: { user: user, type: "SET" }, exec_code: 'CONFIRMATION_SET_BALANCE' })
  }

  return (
    <Icon icon={ic_mode_edit} onClick={editClickHandle} {...props} />
  )
}

const mapDispatchToProps = dispatch => ({
  pushOverlay: stack => dispatch(pushOverlay(stack))
})

export default connect(null, mapDispatchToProps)(SetBalanceButton)