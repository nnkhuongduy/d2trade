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

const InfoContainer = ({
  info: { label, value, link, isLink, isDate, isBalance },
  dense,
  layout,
  styles,
  classes
}) => {
  const mainClasses = useStyles()

  return (
    <Grid
      container
      className={clsx(classes.root, {
        [mainClasses.dense]: !dense,
      })}
      style={styles && styles.root && styles.root}
    >
      <Grid item xs={layout ? layout[0] : 3}>
        {label}
      </Grid>
      <Grid item xs={layout ? layout[1] : 1}>
        :
      </Grid>
      <Grid
        item
        xs={layout ? layout[2] : 8}
        style={styles && styles.value && styles.value}
        className={classes.value}
      >
        {isLink && <Link href={link ? link : value} target='_blank' rel='noopener'>{value}</Link>}
        {isDate && moment(value).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm A')}
        {isBalance && parseInt(value).toLocaleString()}
        {!isLink && !isDate && !isBalance && value}
      </Grid>
    </Grid>
  )
}

InfoContainer.defaultProps = {
  classes: {
    root: {},
    value: {}
  }
}

export default InfoContainer