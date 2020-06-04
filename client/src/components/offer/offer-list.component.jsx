import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, IconButton, CircularProgress
} from '@material-ui/core'
import { Refresh } from '@material-ui/icons'

import { comparator } from '../../helpers/helpers'

import VirtualizedTable from './virtualized-table.component'

import { fetchOffersStart } from '../../redux/user/user.actions'

import { selectOffers, selectFetchingOffers } from '../../redux/user/user.selectors'

const useStyles = makeStyles(theme => ({
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
    dataKey: 'status',
    sortable: false,
  },
]

const OffersList = ({ offers, fetchOffers, fetching }) => {
  const classes = useStyles()
  const history = useHistory()

  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState(null)

  useEffect(() => {
    if (offers) {
      setRows(offers.map(offer => ({
        ...offer,
        momentDate: moment(offer.date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
        userBalance: <span style={{
          color: offer.status !== 'Accepted' && offer.status !== 'Active' && 'gray',
          textDecoration: offer.status !== 'Accepted' && offer.status !== 'Active' && 'line-through'
        }}>- {offer.user_balance.toLocaleString('en-US')}</span>,
        status: <span className={clsx(classes.dot, {
          [classes.green]: offer.status === 'Accepted',
          [classes.yellow]: offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created",
          [classes.red]: offer.status !== 'Accepted' && offer.status !== "Active" && offer.status !== "CreatedNeedsConfirmation" && offer.status !== "Created"
        })} />
      })))
    }
    //eslint-disable-next-line
  }, [offers])

  const onSortClick = index => () => {

    setColumns(columns.map((column, i) => ({
      ...column,
      activeSort: index === i,
      direction: (index === i && (column.direction === 'desc' ? 'asc' : 'desc')) || undefined
    })))

    setRows(rows.slice().sort(comparator(columns[index].sortKey, columns[index].direction === 'desc')))
  }

  if (offers && rows)
    return (
      <Grid container direction='column' style={{ height: '100%' }}>
        <Grid item style={{ alignSelf: 'flex-end' }}>
          <IconButton size='small' onClick={() => fetchOffers()}>
            <Refresh />
          </IconButton>
        </Grid>
        <Grid item style={{ flex: 1 }}>
          {fetching ? <CircularProgress className={classes.circular} /> :
            <VirtualizedTable
              rowCount={rows.length}
              rowGetter={({ index }) => rows[index]}
              columns={columns}
              onSortClick={onSortClick}
              onRowClick={({ rowData }) => history.push(`/offers/${rowData.offer_id}`)}
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