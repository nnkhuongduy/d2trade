import React from 'react'
import moment from 'moment-timezone'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Link
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  dense: {
    margin: `${theme.spacing(1)}px 0`,
  }
}))

const InfoContainer = ({ info: { label, value, isLink, isDate, isBalance }, dense }) => {
  const classes = useStyles()

  return (
    <Grid container className={clsx({ [classes.dense]: !dense })}>
      <Grid item xs={3}>
        {label}
      </Grid>
      <Grid item xs={1}>
        :
      </Grid>
      <Grid item xs={8}>
        {isLink && <Link href={value} target='_blank' rel='noopener'>{value}</Link>}
        {isDate && moment(value).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm:ss A')}
        {isBalance && parseInt(value).toLocaleString()}
        {!isLink && !isDate && !isBalance && value}
      </Grid>
    </Grid>
  )
}

export default InfoContainer