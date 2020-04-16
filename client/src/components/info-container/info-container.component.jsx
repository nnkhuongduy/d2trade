import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'

import { Icon } from 'react-icons-kit'
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'
import { ic_check } from 'react-icons-kit/md/ic_check'

import { editUserInfo } from '../../redux/user/user.actions'

import './info-container.component.scss'

const InfoContainer = ({ editUserInfo, info, detail, isLink, isBalance, isEditable, ...props }) => {
  const [editState, setEditState] = useState(false);
  const inputRef = useRef(null)

  const confirmEdit = () => {
    const url = inputRef.current.value;

    setEditState(false);

    if (inputRef && url.includes("https://steamcommunity.com/tradeoffer/new/?partner=") && url.includes("&token=")) {
      const infoObj = {
        tradeOfferUrl: url
      }

      editUserInfo(infoObj);
    }
  }

  return (
    <div className={'info-container'}>
      <span className={'info'}>{info}</span>
      <span className={'separative-colon'}> : </span>
      {!editState && (isLink ? <a href={detail} target="_blank" rel="noopener noreferrer">{detail}</a> : <span className={'info-detail'}>{detail} {isBalance && 'VND'}</span>)}
      {editState && <input ref={inputRef} className={'trade-url-input info-detail'} />}
      {isEditable && (!editState ?
        <Icon icon={ic_mode_edit} className={'icon-edit'} onClick={() => setEditState(true)} /> :
        <Icon icon={ic_check} className={'icon-edit'} onClick={confirmEdit} />)
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  editUserInfo: obj => dispatch(editUserInfo(obj))
})

export default connect(null, mapDispatchToProps)(InfoContainer);