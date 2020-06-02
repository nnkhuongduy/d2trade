import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  CircularProgress, Avatar
} from '@material-ui/core'

import VirtualizedTable from '../virtualized-table.component'

import { fetchOffersStart } from '../../../redux/offers/offers.actions'
import { fetchUsersStart } from '../../../redux/users/users.actions'

import { selectOffers, selectOffersFetching } from '../../../redux/offers/offers.selectors'
import { selectUsers, selectUsersFetching } from '../../../redux/users/users.selectors'

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
  avatar: {
    width: 30,
    height: 30
  },
}))

const INITIAL_COLUMNS = [
  {
    widthPerc: 20,
    label: 'Người dùng',
    dataKey: 'avatar',
  },
  {
    widthPerc: 30,
    label: 'Ngày thực hiện',
    dataKey: 'date',
  },
  {
    widthPerc: 30,
    label: 'Lợi nhuận',
    dataKey: 'profit',
  },
  {
    widthPerc: 20,
    label: 'Trạng thái',
    dataKey: 'status',
  },
]

const OffersContainer = ({ offers, fetchingOffers, users, fetchingUsers, fetchOffers, fetchUsers, onRowClick }) => {
  const classes = useStyles()

  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState(null)

  useEffect(() => {
    if (!offers && !fetchingOffers) fetchOffers()
    if (!users && !fetchingUsers) fetchUsers()
  }, [])

  useEffect(() => {
    if (offers && users) {
      offers.forEach(offer => offer.user = users.find(user => user.steamid === offer.steam_id))

      setRows(offers
        .slice(0, 10)
        .map(offer => ({
          ...offer,
          avatar: <Avatar src={offer.user.avatar} className={classes.avatar} />,
          date: moment(offer.date).tz('Asia/Ho_Chi_Minh').format('DD / MM'),
          profit: <span style={{
            color: offer.status === 'Accepted' && 'green', textDecoration: offer.status !== 'Accepted' && 'line-through'
          }}>+ {offer.profit.toLocaleString()}</span>,
          status: <span className={clsx(classes.dot, {
            [classes.green]: offer.status === 'Accepted',
            [classes.yellow]: offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created",
            [classes.red]: offer.status !== 'Accepted' && offer.status !== "Active" && offer.status !== "CreatedNeedsConfirmation" && offer.status !== "Created"
          })} />
        })))
    }
  }, [offers, users])

  if (offers && users && rows)
    return (
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
        onRowClick={onRowClick}
      />
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