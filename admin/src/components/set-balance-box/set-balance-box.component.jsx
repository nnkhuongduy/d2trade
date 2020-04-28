import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Icon } from 'react-icons-kit'
import { ic_arrow_forward } from 'react-icons-kit/md/ic_arrow_forward'
import { ic_launch } from 'react-icons-kit/md/ic_launch'

import { balanceInputFilter } from '../../helpers/balance-input-filter'

import ConfirmationButtons from '../confirmation-buttons/confirmation-buttons.component'

import { selectOverlayLastStack } from '../../redux/overlay/overlay.selectors'

import './set-balance-box.component.scss'

const SetBalanceBox = ({ overlayLastStack, ...props }) => {
  const [value, setValue] = useState("")
  const [stack, setStack] = useState(undefined)

  const user = overlayLastStack.data.user

  const changeHandler = e => {
    const value = e.target.value;
    setValue(balanceInputFilter(value))
  }

  useEffect(() => {
    if (overlayLastStack.data.value)
      setValue((overlayLastStack.data.value).toLocaleString())
    //console.log(overlayLastStack.data.value)
  }, [overlayLastStack])

  useEffect(() => {
    if (overlayLastStack)
      setStack({
        ...overlayLastStack,
        data: {
          ...overlayLastStack.data,
          value: value === "" || value === "-" ? 0 : parseInt(value.replace(/,/g, ''))
        }
      })
  }, [overlayLastStack, value])

  return (
    <div className={'set-balance-box'}>
      <img className={'user-avatar'} alt={'user_avatar'} src={user.avatar} />
      <h3>{user.personaname}</h3>
      <a className={'user-profile'} href={user.profileurl} target="_blank" rel="noopener noreferrer">
        <span>{user.steamid}</span>
        <Icon className={'launch'} icon={ic_launch} size={14} />
      </a>
      <div className={'balance-section'}>
        <span className={'user-balance'}>{user.accountBalance.toLocaleString()} VND</span>
        <Icon className={'arrow'} icon={ic_arrow_forward} />
        <input className={'balance-input'} onChange={changeHandler} value={value} /><span>VND</span>
      </div>
      <ConfirmationButtons stack={stack} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  overlayLastStack: selectOverlayLastStack
})

export default connect(mapStateToProps)(SetBalanceBox)