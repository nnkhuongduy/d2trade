import React from 'react'

import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button
} from '@material-ui/core'

const Confirmation = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Yêu cầu xác nhận!</DialogTitle>
      <DialogContent>
        <DialogContentText>Xin vui lòng xác nhận hành động sắp thực hiện</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Hủy bỏ
        </Button>
        <Button color='primary' variant='contained' onClick={() => { onClose(); onConfirm(); }}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmation