import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Backdrop as MaterialBackdrop,
  CircularProgress
} from '@material-ui/core'

import { selectBackdrop } from '../../redux/backdrop/backdrop.selectors'


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

const mapStateToProps = createStructuredSelector({
  open: selectBackdrop
})

export default connect(mapStateToProps)(Backdrop)