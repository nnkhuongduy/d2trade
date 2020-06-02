import React from 'react'

import {
  Paper, Grid, Typography, Select, InputLabel, MenuItem, Divider
} from '@material-ui/core'

const Revenue = () => {

  return (
    <Paper>
      <Grid container spacing={1} direction='column'>
        <Grid item>
          {/* <InputLabel id='revenue-label'>Thời gian</InputLabel>
          <Select
            labelId='revenue-label'
            id='revenue-select'
            value={}
          >
          </Select> */}
        </Grid>
        <Grid item>
          <Typography variant='h6'>Doanh thu</Typography>
        </Grid>
        <Divider />
        <Grid item>
          <Typography variant='h6'>Lợi nhuận</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Revenue