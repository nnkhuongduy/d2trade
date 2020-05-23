import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'

import { makeStyles } from '@material-ui/styles'
import {
  CircularProgress, Avatar, Link, Tabs, Tab, Grid
} from '@material-ui/core'

import comparator from '../../../helpers/sort-function'

import VirtualizedTable from '../virtualized-table.component'

import { fetchUsersStart } from '../../../redux/users/users.actions'

import { selectUsers, selectUsersFetching } from '../../../redux/users/users.selectors'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 30,
    height: 30
  },
  root: {
    fontSize: theme.typography.pxToRem(12),
    width: '100%',
    height: '65vh'
  }
}))

const INITIAL_COLUMNS = [
  {
    widthPerc: 20,
    label: 'Avatar',
    dataKey: 'avatar',
  },
  {
    widthPerc: 30,
    label: 'Tên tài khoản',
    dataKey: 'personaname',
  },
  {
    widthPerc: 30,
    label: 'Thời gian',
    dataKey: 'lastLogin',
  },
  {
    widthPerc: 20,
    label: 'Số dư',
    dataKey: 'accountBalance',
  },
]

const UsersContainer = ({ users, fetching, fetchUsers, onRowClick }) => {
  const classes = useStyles()

  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (!users && !fetching) fetchUsers()
  }, [])

  useEffect(() => {
    if (users)
      setRows(users
        .sort(comparator('lastLogin', false))
        .slice(0, 10)
        .map(user => ({
          ...user,
          avatar: <Link href={`users/${user.steamid}`} target='_blank' rel='noopener'>
            <Avatar src={user.avatar} className={classes.avatar} />
          </Link>,
          personaname: user.personaname,
          lastLogin: moment(user.lastLogin).tz('Asia/Ho_Chi_Minh').format('DD / MM'),
          createdDate: moment(user.createdDate).tz('Asia/Ho_Chi_Minh').format('DD / MM'),
          accountBalance: user.accountBalance
        })))
  }, [users])

  useEffect(() => {
    const newColumns = [...columns]

    newColumns[2].dataKey = tab === 0 ? 'lastLogin' : 'createdDate'
    setColumns(newColumns)

    if (users)
      setRows(users
        .sort(comparator(tab === 0 ? 'lastLogin' : 'createdDate', false))
        .slice(0, 10)
        .map(user => ({
          ...user,
          avatar: <Avatar src={user.avatar} className={classes.avatar} />,
          personaname: user.personaname,
          lastLogin: moment(user.lastLogin).tz('Asia/Ho_Chi_Minh').format('DD / MM'),
          createdDate: moment(user.createdDate).tz('Asia/Ho_Chi_Minh').format('DD / MM'),
          accountBalance: user.accountBalance.toLocaleString()
        })))
  }, [tab])

  if (users && rows)
    return (
      <Grid container direction='column' style={{ width: '100%', height: '100%' }}>
        <Grid item>
          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            aria-label='users tabs'
            indicatorColor='primary'
            textColor='primary'
            variant="fullWidth"
          >
            <Tab label='Đăng nhập gần nhất' id='table-tab-0' aria-controls='table-tabpanel-0' />
            <Tab label='Đặng nhập lần đầu' id='table-tab-1' aria-controls='table-tabpanel-1' />
          </Tabs>
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <VirtualizedTable
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={columns}
            onRowClick={onRowClick}
          />
        </Grid>
      </Grid>
    )
  else
    return (
      <>
        {fetching && <CircularProgress style={{ display: 'block', margin: '0 auto' }} />}
      </>
    )

}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  fetching: selectUsersFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)