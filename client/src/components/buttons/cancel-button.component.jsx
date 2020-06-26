import React from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    color: 'red',
    borderColor: 'red'
  }
}))

const CancelButton = ({ children }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant='outlined'
    >
      {children}
    </Button>
  )
}

export default CancelButton