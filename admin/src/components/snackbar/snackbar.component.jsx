import React from 'react'

import {
  Snackbar as MUISnackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const Snackbar = ({ open, onClose, severity, ...snackProps }) => {
  return (
    <MUISnackbar open={open} autoHideDuration={6000} onClose={onClose} {...snackProps}>
      <Alert onClose={onClose} severity={severity} variant='filled'>
        {severity === 'success' ? 'Hoàn tất thao tác vừa thực thiện!' : 'Đã có lỗi xảy ra!'}
      </Alert>
    </MUISnackbar>
  )
}

export default Snackbar