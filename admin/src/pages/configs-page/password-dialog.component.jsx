import React, { useState } from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, TextField, InputAdornment, IconButton
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import Confirmation from '../../components/dialogs/confirmation/confirmation.component'

const useStyles = makeStyles(theme => ({
  cancel: {
    color: 'red',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  }
}))

const VisibilityIcon = ({ visibility }) => visibility ? <Visibility /> : <VisibilityOff />

const PasswordDialog = ({ open, onClose, onConfirm }) => {
  const classes = useStyles()
  const [confirmation, setConfirmation] = useState(false)
  const [password, setPassword] = useState('')
  const [visibility, setVisibility] = useState(false)

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-password"
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle>Đặt mật khẩu ADMIN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập mật khẩu admin mới. Chú ý mật khẩu sẽ không được lưu lại!
          </DialogContentText>
          <TextField
            id='admin-password'
            autoFocus
            fullWidth
            label='Mật khẩu'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={visibility ? 'text' : 'password'}
            InputProps={{
              endAdornment: <InputAdornment position='start'>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setVisibility(!visibility)}
                  size='small'
                >
                  <VisibilityIcon visibility={visibility} />
                </IconButton>
              </InputAdornment>
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.cancel} onClick={onClose}>Hủy bỏ</Button>
          <Button variant='contained' color='primary' onClick={() => setConfirmation(true)}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <Confirmation
        open={confirmation}
        onClose={() => setConfirmation(false)}
        onConfirm={() => onConfirm(password)}
      />
    </>
  )
}

export default PasswordDialog