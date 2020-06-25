import React, { useState } from 'react'
import moment from 'moment-timezone'
import { connect } from 'react-redux'

import {
  Grid, Typography, IconButton, TextField
} from '@material-ui/core'
import {
  Edit, Done
} from '@material-ui/icons'

import Confirmation from '../../components/dialogs/confirmation/confirmation.component'

import { updateInfoStart } from '../../redux/admin/admin.actions'

const InfoContainer = ({ info: { label, content, edit, uneditable, inputValue }, index, onEdit, onChange, onSave }) => (
  <Grid container alignItems='center'>
    <Grid item xs={4}>
      <Typography>{label}</Typography>
    </Grid>
    <Grid item xs={1}>
      :
    </Grid>
    <Grid item xs={6}>
      {edit ?
        <TextField
          id={`admin-input-${index}`}
          value={inputValue}
          onChange={e => onChange(index, e.target.value)}
          size='small'
        />
        :
        <Typography>{content}</Typography>
      }
    </Grid>
    {!uneditable && <Grid item xs={1}>
      {edit ?
        <IconButton size='small' onClick={() => onSave(index)}>
          <Done fontSize='small' />
        </IconButton>
        :
        <IconButton size='small' onClick={() => onEdit(index)}>
          <Edit fontSize='small' />
        </IconButton>
      }
    </Grid>}
  </Grid>
)

const AdminInfo = ({ configs, updateInfo }) => {
  const [admin] = useState(configs.find(config => config.name === 'admin').value)
  const [confirmation, setConfirmation] = useState(false)
  const [infos, setInfos] = useState([
    {
      label: 'Tài khoản Admin:',
      content: admin.adminName,
      edit: false,
      inputValue: admin.adminName,
      nameValue: 'adminName'
    },
    {
      label: 'Đăng nhập gần nhất:',
      content: moment(admin.lastLogin).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm A'),
      uneditable: true
    }
  ])
  const [editInfo, setEditInfo] = useState(null)

  const onEdit = index => {
    let newInfos = [...infos]
    newInfos[index].edit = true;
    setInfos(newInfos)
  }

  const onChange = (index, value) => {
    let newInfos = [...infos]
    newInfos[index].inputValue = value
    setInfos(newInfos)
  }

  const onSave = index => {
    const info = infos[index]
    if (info.inputValue !== info.content) {
      setConfirmation(true)
      setEditInfo(editInfo ? { ...editInfo, [info.nameValue]: info.inputValue } : { [info.nameValue]: info.inputValue })
    } else {
      let newInfos = [...infos]
      newInfos[index].edit = false;
      setInfos(newInfos)
    }
  }

  const onConfirm = () => {
    if (editInfo) updateInfo(editInfo)
    setInfos(infos.map(info => ({ ...info, edit: false, content: info.inputValue ? info.inputValue : info.content })))
  }

  return (
    <>
      {infos.map((info, index) =>
        <InfoContainer key={index} index={index} info={info} onEdit={onEdit} onChange={onChange} onSave={onSave} />
      )}
      <Confirmation open={confirmation} onClose={() => setConfirmation(false)} onConfirm={onConfirm} />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  updateInfo: info => dispatch(updateInfoStart(info))
})

export default connect(null, mapDispatchToProps)(AdminInfo)