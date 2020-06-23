import React, { useState } from 'react'
import moment from 'moment'

import {
  Grid,
} from '@material-ui/core'
import {
  KeyboardDatePicker
} from "@material-ui/pickers";

const RevenueFilter = ({ filter, onChange }) => {
  return (
    <Grid container alignItems='center' justify='flex-end' spacing={2}>
      <Grid item>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="Từ"
          format="DD/MM/yyyy"
          value={filter.date.from}
          size='small'
          InputAdornmentProps={{ position: "start" }}
          onChange={date => onChange({ ...filter, date: { ...filter.date, from: moment(date).format('YYYY-MM-DD[T00:00:00.000Z]'), active: true } })}
        />
      </Grid>
      <Grid item>
        -
      </Grid>
      <Grid item>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="Đến"
          format="DD/MM/yyyy"
          value={filter.date.to}
          size='small'
          InputAdornmentProps={{ position: "start" }}
          onChange={date => onChange({
            ...filter, date: {
              ...filter.date,
              to: moment(date).format('YYYY-MM-DD[T00:00:00.000Z]'),
              toPlus: moment(date).add(1, 'days').format('YYYY-MM-DD[T00:00:00.000Z]'),
              active: true
            }
          })}
        />
      </Grid>
    </Grid>
  )
}

export default RevenueFilter