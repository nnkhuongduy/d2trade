import React from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cancel: {
    color: 'red',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  }
}))

const Confirmation = ({ open, onClose, onConfirm }) => {
  const classes = useStyles()

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
        <Button onClick={onClose} className={classes.cancel}>
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