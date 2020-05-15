import React, { useState, useEffect } from 'react'

import {
  Grid, Typography, Switch as MaterialSwitch
} from '@material-ui/core'

const Switch = ({ label, caption, name, value, onChange, ...props }) => {
  const [switchValue, setSwitchValue] = useState(false)

  useEffect(() => {
    setSwitchValue(value)
  }, [value])

  useEffect(() => {
    onChange(switchValue)
  }, [switchValue])

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Typography>{label} :</Typography>
          </Grid>
          <Grid item>
            <MaterialSwitch
              checked={switchValue}
              onChange={e => setSwitchValue(e.target.checked)}
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

export default Switch