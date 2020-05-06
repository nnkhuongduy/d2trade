import React from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Backdrop as MaterialBackdrop,
  CircularProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const Backdrop = ({ open }) => {
  const classes = useStyles()

  return (
    <MaterialBackdrop className={classes.backdrop} open={open}>
      <CircularProgress color='inherit' />
    </MaterialBackdrop>
  )
}

export default Backdrop