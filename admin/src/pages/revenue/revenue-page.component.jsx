import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'

import {
  Grid, LinearProgress, Collapse, TextField, InputAdornment, Chip
} from '@material-ui/core'
import {
  Refresh, FilterList, Search
} from '@material-ui/icons'

import Toolbar from '../../components/toolbar/toolbar.component'
import ReceiptsContainer from '../../components/receipts/receipts-container.component'
import RevenueFilter from './revenue-filter.component'

import { fetchReceiptsStart } from '../../redux/receipts/receipts.actions'

import { selectFetching } from '../../redux/receipts/receipts.selectors'

const RevenuePage = ({ fetching, fetchReceipts }) => {
  const [tools, setTools] = useState([
    {
      label: 'search',
      Icon: <Search />,
      active: false,
    },
    {
      label: 'filter',
      Icon: <FilterList />,
      active: false,
    },
    {
      label: 'refresh',
      Icon: <Refresh />,
      func: () => fetchReceipts()
    },
  ])
  const [filter, setFilter] = useState({
    query: {
      steamId: '',
      accountName: ''
    },
    date: {
      from: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
      to: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
      toPlus: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
      active: false
    }
  })
  const [chips, setChips] = useState([
    {
      label: 'query',
      value: '',
      active: false,
      onDelete: () => setFilter({ ...filter, query: { steamId: '', accountName: '' } })
    },
    {
      label: 'dateFrom',
      value: `Từ ${moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]')}`,
      active: false,
      onDelete: () => setFilter({
        ...filter, date: {
          from: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
          to: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
          toPlus: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
          active: false
        }
      })
    },
    {
      label: 'dateTo',
      value: `Đến ${moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]')}`,
      active: false,
      onDelete: () => setFilter({
        ...filter, date: {
          from: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
          to: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
          toPlus: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
          active: false
        }
      })
    }
  ])

  useEffect(() => {
    setChips([
      {
        label: 'query',
        value: filter.query.accountName.length ? filter.query.accountName : filter.query.steamId,
        active: Boolean(filter.query.accountName.length) || Boolean(filter.query.steamId.length),
      },
      {
        label: 'dateFrom',
        value: `Từ ${filter.date.from.slice(0, 10)}`,
        active: filter.date.active,
      },
      {
        label: 'dateTo',
        value: `Đến ${filter.date.to.slice(0, 10)}`,
        active: filter.date.active,
      }
    ])
  }, [filter])

  return (
    <Grid container direction='column' wrap='nowrap' spacing={2}>
      {fetching && <Grid item>
        <LinearProgress />
      </Grid>}
      <Grid item>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item>
            <Grid container spacing={1} alignItems='center'>
              <Grid item>
                Lọc hiện tại:
              </Grid>
              {chips.map((chip, index) => chip.active &&
                <Grid item key={index}>
                  <Chip
                    label={chip.value}
                    size='small'
                    clickable
                    onDelete={chip.onDelete}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Toolbar tools={tools} onChange={tools => setTools(tools)} />
          </Grid>
        </Grid>
      </Grid>
      <Collapse in={tools[0].active} unmountOnExit mountOnEnter>
        <Grid item>
          <Grid container spacing={1} alignItems='center' justify='flex-end'>
            <Grid item>
              <TextField
                id='steam-id-input'
                value={filter.query.steamId}
                onChange={e => setFilter({ ...filter, query: { ...filter.query, steamId: e.target.value } })}
                variant='outlined'
                label='Steam ID'
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                disabled={Boolean(filter.query.accountName.length)}
              />
            </Grid>
            <Grid item>
              <TextField
                id='account-name-input'
                value={filter.query.accountName}
                onChange={e => setFilter({ ...filter, query: { ...filter.query, accountName: e.target.value } })}
                variant='outlined'
                label='Tên tài khoản'
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                disabled={Boolean(filter.query.steamId.length)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
      <Collapse in={tools[1].active} unmountOnExit mountOnEnter>
        <Grid item>
          <RevenueFilter filter={filter} onChange={filter => setFilter(filter)} />
        </Grid>
      </Collapse>
      <Grid item>
        <ReceiptsContainer filter={filter} full />
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchReceipts: () => dispatch(fetchReceiptsStart())
})

const mapStateToProps = createStructuredSelector({
  fetching: selectFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(RevenuePage)