import React from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Box
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    color: 'white'
  }
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <Box p={3} className={classes.root}>
      2020 D2TRADE.COM All rights reserved.
    </Box>
  )
}

export default Footer