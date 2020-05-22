import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, CircularProgress, Avatar, Link
} from '@material-ui/core'

import comparator from '../../helpers/sort-function'

import VirtualizedTable from './virtualized-table.component'

import { fetchOffersStart } from '../../redux/offers/offers.actions'
import { fetchUsersStart } from '../../redux/users/users.actions'

import { selectOffers, selectOffersFetching } from '../../redux/offers/offers.selectors'
import { selectUsers, selectUsersFetching } from '../../redux/users/users.selectors'

const useStyles = makeStyles(theme => ({
  dot: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '100%',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)'
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
}))

const INITIAL_COLUMNS = [
  {
    widthPerc: 15,
    label: 'Index',
    dataKey: 'index',
    sortable: true,
    direction: 'desc',
    activeSort: true
  },
  {
    widthPerc: 15,
    label: 'Người dùng',
    dataKey: 'avatar',
    sortable: false,
  },
  {
    widthPerc: 20,
    label: 'Ngày thực hiện',
    dataKey: 'date',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 20,
    label: 'Số dư người dùng',
    dataKey: 'user_balance',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 20,
    label: 'Lợi nhuận',
    dataKey: 'profit',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 10,
    label: 'Trạng thái',
    dataKey: 'status',
    sortable: false,
  },
]

const OffersContainer = ({ offers, fetchingOffers, users, fetchingUsers, fetchOffers, fetchUsers, setCurrentOffer }) => {
  const classes = useStyles()

  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState(null)

  useEffect(() => {
    if (!offers) fetchOffers()
    if (!users) fetchUsers()
  }, [])

  useEffect(() => {
    if (offers && users) {
      offers.forEach(offer => offer.user = users.find(user => user.steamid === offer.steam_id))

      setRows(offers.map(offer => ({
        ...offer,
        avatar: <Link href={`users/${offer.user.steamid}`} target='_blank' rel='noopener'><Avatar src={offer.user.avatar} /></Link>,
        date: moment(offer.date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
        user_balance: `- ${offer.user_balance.toLocaleString()}`,
        profit: <span style={{ color: 'green' }}>+ {offer.profit.toLocaleString()}</span>,
        status: <span className={clsx(classes.dot, {
          [classes.green]: offer.status === 'Accepted',
          [classes.yellow]: offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created",
          [classes.red]: offer.status !== 'Accepted' && offer.status !== "Active" && offer.status !== "CreatedNeedsConfirmation" && offer.status !== "Created"
        })} />
      })))
    }
  }, [offers, users])

  const onSortClick = index => () => {

    setColumns(columns.map((column, i) => ({
      ...column,
      activeSort: index === i,
      direction: (index === i && (column.direction === 'desc' ? 'asc' : 'desc')) || undefined
    })))

    setRows(rows.slice().sort(comparator(columns[index].dataKey, columns[index].direction === 'desc')))

    //eslint-disable-next-line
  }

  if (offers && users && rows)
    return (
      <Paper elevation={3} style={{ height: '75vh', width: '100%' }}>
        <VirtualizedTable
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          columns={columns}
          onSortClick={onSortClick}
          onRowClick={({ rowData }) => setCurrentOffer(offers.find(offer => offer.offer_id === rowData.offer_id))}
        />
      </Paper>
    )
  else
    return (
      <>
        {(fetchingOffers || fetchingUsers) && <CircularProgress style={{ display: 'block', margin: '0 auto' }} />}
      </>
    )

}

const mapDispatchToProps = dispatch => ({
  fetchOffers: () => dispatch(fetchOffersStart()),
  fetchUsers: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  offers: selectOffers,
  fetchingOffers: selectOffersFetching,
  users: selectUsers,
  fetchingUsers: selectUsersFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersContainer)