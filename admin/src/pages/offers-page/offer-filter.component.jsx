import React, { useState } from 'react'
import moment from 'moment'

import {
  Grid, TextField, InputAdornment, Divider, Menu, MenuItem, Button
} from '@material-ui/core'
import {
  Search
} from '@material-ui/icons'
import {
  KeyboardDatePicker
} from "@material-ui/pickers";

const OfferFilter = ({ filter, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const onMenuItemClick = status => {
    setAnchorEl(null)
    onChange({ ...filter, status: status })
  }

  return (
    <Grid container alignItems='center' justify='flex-end' spacing={2}>
      <Grid item>
        <TextField
          id='search-query'
          label='Steam ID'
          variant='outlined'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={filter.searchQuery}
          onChange={e => onChange({ ...filter, searchQuery: e.target.value })}
        />
      </Grid>
      <Divider orientation="vertical" flexItem />
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
      <Divider orientation="vertical" flexItem />
      <Grid item>
        <Button
          aria-controls="status-menu"
          aria-haspopup="true"
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          {filter.status}
        </Button>
        <Menu
          id="status-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => onMenuItemClick('Accepted')}>Accepted</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('Active')}>Active</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('Declined')}>Declined</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('Error')}>Error</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('All')}>All</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )
}

export default OfferFilter