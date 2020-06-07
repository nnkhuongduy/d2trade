import React, { useEffect, useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Snackbar as MUISnackbar
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

import { deqSnackbar } from '../../redux/snackbar/snackbar.actions'

import { selectSnackbars } from '../../redux/snackbar/snackbar.selectors'

const Snackbar = ({ deqSnackbar, snackbars, ...snackProps }) => {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [text, setText] = useState(undefined)
  const [key, setKey] = useState(undefined)

  useEffect(() => {
    if (!open) {
      if (snackbars[0]) {
        setSeverity(snackbars[0].severity)
        setTitle(snackbars[0].title)
        setText(snackbars[0].text)
        setKey(snackbars[0].key)
        setOpen(true)
      }
    } else {
      setOpen(false)
    }
    //eslint-disable-next-line
  }, [snackbars])

  const onClose = useCallback((e, reason) => {
    if (reason === 'clickaway')
      return

    setOpen(false)
  }, [])

  return (
    <MUISnackbar
      key={key}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      onExited={deqSnackbar}
      {...snackProps}
    >
      <Alert onClose={onClose} severity={severity ? severity : 'error'} variant='filled'>
        {title && <AlertTitle>{title}</AlertTitle>}
        {text ? text :
          (severity === 'success' ? 'Hoàn tất thao tác vừa thực thiện!' : 'Đã có lỗi xảy ra!')}
      </Alert>
    </MUISnackbar>
  )
}

const mapDispatchToProps = dispatch => ({
  deqSnackbar: () => dispatch(deqSnackbar())
})

const mapStateToProps = createStructuredSelector({
  snackbars: selectSnackbars
})

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)