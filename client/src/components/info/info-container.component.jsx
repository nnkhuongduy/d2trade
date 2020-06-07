import React from 'react'

import { makeStyles, useTheme } from '@material-ui/styles'
import {
  Grid, useMediaQuery
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(13),
      margin: `${theme.spacing(6)} 0`
    }
  },
  contentMobile: {
    fontSize: theme.typography.pxToRem(15),
    paddingLeft: theme.spacing(2),
    boxSizing: 'border-box'
  }
}))

const InfoContainer = ({ itemsAlign = [3, 1, 8], info }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  if (!matches) return (
    <Grid container alignItems='center' className={classes.root}>
      <Grid item xs={itemsAlign[0]}>
        {info.label}
      </Grid>
      <Grid item xs={itemsAlign[1]}>
        :
      </Grid>
      <Grid item xs={itemsAlign[2]} style={{ wordWrap: 'break-word' }}>
        {info.content}
      </Grid>
    </Grid>
  )
  else return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>
        {info.label} :
      </Grid>
      <Grid item className={classes.contentMobile}>
        {info.content}
      </Grid>
    </Grid>
  )
}

export default InfoContainer