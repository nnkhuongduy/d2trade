import React from 'react'

import {
  Grid, Typography, Switch
} from '@material-ui/core'

const ConfigSwitch = ({ label, caption, name, value, onChange, ...props }) => {

  const onSwitchChange = e => {
    onChange({ configs: { [e.target.name]: !value } })
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Typography>{label} :</Typography>
          </Grid>
          <Grid item>
            <Switch
              checked={value}
              onChange={onSwitchChange}
              name={name}
              inputProps={{ 'aria-label': `${label} checkbox` }}
              {...props}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: '70%' }}>
        <Typography variant='caption' paragraph>{caption}</Typography>
      </Grid>
    </Grid>
  )
}

export default ConfigSwitch