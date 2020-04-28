import React from 'react'
import { connect } from 'react-redux'

import { Icon } from 'react-icons-kit'
import { plus } from 'react-icons-kit/icomoon/plus'

import { pushOverlay } from '../../../redux/overlay/overlay.actions'

import './modify-balance-button.component.scss'

const ModifyBalanceButton = ({ pushOverlay, user, ...props }) => {

  const modifyClickHandle = () => {
    pushOverlay({ type: "MODIFYING_BALANCE", data: { user: user, type: "MODIFY" }, exec_code: 'CONFIRMATION_SET_BALANCE' })
  }

  return (
    <Icon icon={plus} className={'plus'} onClick={modifyClickHandle} {...props} />
  )
}

const mapDispatchToProps = dispatch => ({
  pushOverlay: stack => dispatch(pushOverlay(stack))
})

export default connect(null, mapDispatchToProps)(ModifyBalanceButton)