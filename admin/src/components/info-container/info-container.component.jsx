import React, { useState } from 'react'

import { Icon } from 'react-icons-kit'
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'
import { ic_check } from 'react-icons-kit/md/ic_check'

import './info-container.component.scss'

const InfoContainer = ({ editUserInfo, info, detail, isLink, isEditable, confirmEditFunc, ...props }) => {
  const [editState, setEditState] = useState(false);
  const [valueState, setValueState] = useState('');

  const checkHandle = () => {
    setEditState(false)
    confirmEditFunc(valueState);
  }

  return (
    <div className={'info-container'}>
      <span className={'info'}>{info}</span>
      <span className={'separative-colon'}> : </span>
      {!editState && (isLink ? <a href={detail} target="_blank" rel="noopener noreferrer">{detail}</a> : <span className={'info-detail'}>{detail}</span>)}
      {editState && <input className={'trade-url-input info-detail'} type="number" onChange={e => setValueState(e.target.value)} placeholder={detail} />}
      {isEditable && (!editState ?
        <Icon icon={ic_mode_edit} className={'icon-edit'} onClick={() => setEditState(true)} /> :
        <Icon icon={ic_check} className={'icon-edit'} onClick={checkHandle} />)
      }
    </div>
  )
}

export default InfoContainer;