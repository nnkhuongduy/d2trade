import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, IconButton, CircularProgress, FormControlLabel, Checkbox
} from '@material-ui/core'
import { Refresh } from '@material-ui/icons'

import { comparator } from '../../helpers/helpers'

import VirtualizedTable from './virtualized-table.component'

import { fetchOffersStart } from '../../redux/user/user.actions'

import { selectOffers, selectFetchingOffers } from '../../redux/user/user.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  dot: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '100%',
  },
  red: {
    backgroundColor: theme.palette.error.main
  },
  yellow: {
    backgroundColor: theme.palette.warning.main
  },
  green: {
    backgroundColor: theme.palette.success.dark
  },
  circular: {
    display: 'block',
    margin: '0 auto'
  },
  label: {
    fontSize: theme.typography.pxToRem(13)
  }
}))

const INITIAL_COLUMNS = [
  {
    widthPerc: 20,
    label: 'Index',
    dataKey: 'index',
    sortKey: 'index',
    sortable: true,
    direction: 'asc',
    activeSort: true
  },
  {
    widthPerc: 30,
    label: 'Ngày thực hiện',
    dataKey: 'momentDate',
    sortKey: 'date',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 30,
    label: 'Số dư',
    dataKey: 'userBalance',
    sortKey: 'user_balance',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 20,
    label: 'Trạng thái',
    dataKey: 'statusIndicator',
    sortable: false,
  },
]

const OffersList = ({ offers, fetchOffers, fetching, onClick }) => {
  const classes = useStyles()
  const history = useHistory()

  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState(null)
  const [filter, setFilter] = useState(true)

  // useEffect(() => {
  //   if (offers) {
  //     setRows(offers.map(offer => ({
  //       ...offer,
  //       momentDate: moment(offer.date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
  //       userBalance: (offer.status === 'Accepted' || offer.status === 'Active') && <span>- {offer.user_balance.toLocaleString('en-US')}</span>,
  //       statusIndicator: <span className={clsx(classes.dot, {
  //         [classes.green]: offer.status === 'Accepted',
  //         [classes.yellow]: offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created",
  //         [classes.red]: offer.status !== 'Accepted' && offer.status !== "Active" && offer.status !== "CreatedNeedsConfirmation" && offer.status !== "Created"
  //       })} />
  //     })))
  //   }
  //   //eslint-disable-next-line
  // }, [offers])

  useEffect(() => {
    if (offers)
      if (filter) {
        setColumns(INITIAL_COLUMNS)
        setRows(offers
          .filter(offer => offer.status === 'Accepted')
          .map(offer => ({
            ...offer,
            momentDate: moment(offer.date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
            userBalance: (offer.status === 'Accepted' || offer.status === 'Active') && <span>- {offer.user_balance.toLocaleString('en-US')}</span>,
            statusIndicator: <span className={clsx(classes.dot, {
              [classes.green]: offer.status === 'Accepted',
              [classes.yellow]: offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created",
              [classes.red]: offer.status !== 'Accepted' && offer.status !== "Active" && offer.status !== "CreatedNeedsConfirmation" && offer.status !== "Created"
            })} />
          }))
        )
      }
      else {
        setColumns(INITIAL_COLUMNS)
        setRows(offers
          .map(offer => ({
            ...offer,
            momentDate: moment(offer.date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
            userBalance: (offer.status === 'Accepted' || offer.status === 'Active') && <span>- {offer.user_balance.toLocaleString('en-US')}</span>,
            statusIndicator: <span className={clsx(classes.dot, {
              [classes.green]: offer.status === 'Accepted',
              [classes.yellow]: offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created",
              [classes.red]: offer.status !== 'Accepted' && offer.status !== "Active" && offer.status !== "CreatedNeedsConfirmation" && offer.status !== "Created"
            })} />
          }))
        )
      }
    //eslint-disable-next-line
  }, [filter])

  const onSortClick = index => () => {

    setColumns(columns.map((column, i) => ({
      ...column,
      activeSort: index === i,
      direction: (index === i && (column.direction === 'desc' ? 'asc' : 'desc')) || undefined
    })))

    setRows(rows.slice().sort(comparator(columns[index].sortKey, columns[index].direction === 'desc')))
  }

  const onRowClick = ({ rowData }) => {
    history.push(`/offers/${rowData.offer_id}`);
    onClick && onClick();
  }

  if (offers && rows)
    return (
      <Grid container direction='column' className={classes.root}>
        <Grid item>
          <Grid container alignItems='center' justify='space-between'>
            <Grid item>
              <FormControlLabel
                control={<Checkbox
                  checked={filter}
                  onChange={e => setFilter(e.target.checked)}
                  name="filter"
                  color='primary'
                />}
                label='Lọc trạng thái Accepted'
                classes={{ label: classes.label }}
              />
            </Grid>
            <Grid item>
              <IconButton size='small' onClick={() => fetchOffers()}>
                <Refresh />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ flex: 1 }}>
          {fetching ? <CircularProgress className={classes.circular} /> :
            <VirtualizedTable
              rowCount={rows.length}
              rowGetter={({ index }) => rows[index]}
              columns={columns}
              onSortClick={onSortClick}
              onRowClick={onRowClick}
            />}
        </Grid>
      </Grid>
    )
  else
    return (
      <>
      </>
    )

}

const mapDispatchToProps = dispatch => ({
  fetchOffers: () => dispatch(fetchOffersStart())
})

const mapStateToProps = createStructuredSelector({
  offers: selectOffers,
  fetching: selectFetchingOffers
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersList)