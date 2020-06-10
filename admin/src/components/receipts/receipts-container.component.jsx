import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'
import clsx from 'clsx'

import { makeStyles, useTheme } from '@material-ui/styles'
import {
  Paper, CircularProgress, Avatar, Link
} from '@material-ui/core'

import comparator from '../../helpers/sort-function'

import VirtualizedTable from './virtualized-table.component'

import { fetchReceiptsStart } from '../../redux/receipts/receipts.actions'
import { fetchUsersStart } from '../../redux/users/users.actions'

import { selectReceipts, selectFetching as selectReceiptsFetching } from '../../redux/receipts/receipts.selectors'
import { selectUsers, selectUsersFetching } from '../../redux/users/users.selectors'

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
    widthPerc: 25,
    label: 'Người dùng',
    dataKey: 'avatar',
    sortable: false,
  },
  {
    widthPerc: 30,
    label: 'Ngày thực hiện',
    dataKey: 'date',
    sortKey: 'date',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 25,
    label: 'Giá trị',
    dataKey: 'total',
    sortKey: 'total',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
]

const ReceiptsContainer = ({ receipts, fetchingReceipts, users, fetchingUsers, fetchReceipts, fetchUsers, filter }) => {
  const theme = useTheme()

  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState([])
  const [receiptsState, setReceiptsState] = useState([])

  useEffect(() => {
    if (!receipts.length) fetchReceipts()
    if (!users) fetchUsers()
  }, [])

  useEffect(() => {
    if (receipts && users) {
      receipts.forEach(receipt => receipt.user = users.find(user => user.steamid === receipt.steamId))

      setReceiptsState(receipts.map((receipt, index) => ({
        ...receipt,
        index: index,
        avatar: <Link href={`users/${receipt.user.steamid}`} target='_blank' rel='noopener'><Avatar src={receipt.user.avatar} /></Link>,
        date: moment(receipt.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
        total: (receipt.total >= 0 ? '+ ' : '- ') + Math.abs(receipt.total).toLocaleString('en-US'),
      })))
    }
    //eslint-disable-next-line
  }, [receipts, users])

  useEffect(() => {
    setRows(filter ? receiptsState.filter(receipt => receipt.steamId === filter.steamId) : [...receiptsState])
    //eslint-disable-next-line
  }, [receiptsState, filter])

  const onSortClick = index => () => {

    setColumns(columns.map((column, i) => ({
      ...column,
      activeSort: index === i,
      direction: (index === i && (column.direction === 'desc' ? 'asc' : 'desc')) || undefined
    })))

    setRows(rows.slice().sort(comparator(columns[index].sortKey, columns[index].direction === 'desc')))

    //eslint-disable-next-line
  }

  return (
    <Paper elevation={3} style={{ height: '75vh', width: '100%' }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
        onSortClick={onSortClick}
      // onRowClick={({ rowData }) => setCurrentOffer(offers.find(offer => offer.offer_id === rowData.offer_id))}
      />
    </Paper>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchReceipts: () => dispatch(fetchReceiptsStart()),
  fetchUsers: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  receipts: selectReceipts,
  fetchingReceipts: selectReceiptsFetching,
  users: selectUsers,
  fetchingUsers: selectUsersFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsContainer)