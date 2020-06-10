import React from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Grid
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    margin: `${theme.spacing(1)}px 0`
  }
}))

const InfoContainer = ({ info: { label, content }, layout = [3, 1, 8] }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={layout[0]}>
        {label}
      </Grid>
      <Grid item xs={layout[1]}>
        :
      </Grid>
      <Grid item xs={layout[2]}>
        {content}
      </Grid>
    </Grid>
  )
}

export default InfoContainer