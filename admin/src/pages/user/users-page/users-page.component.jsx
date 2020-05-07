import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Grid, LinearProgress, Paper,
} from '@material-ui/core'

import UserAddBalance from '../../../components/dialogs/user-add-balance/user-add-balance.component'
import UserSetBalance from '../../../components/dialogs/user-set-balance/user-set-balance.component'
import VirtualizedTable from '../../../components/virtualized-table/virtualized-table.component'

import { fetchUsersStart } from '../../../redux/users/users.actions'

import { selectUsers } from '../../../redux/users/users.selectors'

import Toolbar from '../../../components/toolbar/toolbar.component'

const comparator = (prop, desc = true) => (a, b) => {
  const order = desc ? 1 : -1;

  if (a[prop] < b[prop])
    return -1 * order

  if (a[prop] > b[prop])
    return 1 * order;

  return 0 * order;
}

const labelToProp = label => {
  switch (label) {
    case 'Index':
      return 'index'

    case 'Tài khoản':
      return 'personaname'

    case 'Số dư':
      return 'accountBalance'

    case 'Đăng nhập gần nhất':
      return 'lastLogin'

    default:
      return ''
  }
}

const INITIAL_COLUMNS = [
  {
    widthPerc: 10,
    label: 'Index',
    dataKey: 'index',
    sortable: true,
    direction: 'asc',
    activeSort: true
  },
  {
    widthPerc: 20,
    label: 'Tài khoản',
    dataKey: 'personaname',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 10,
    label: 'Số dư',
    dataKey: 'accountBalance',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 35,
    label: 'Đăng nhập gần nhất',
    dataKey: 'lastLogin',
    sortable: true,
    direction: 'asc',
    activeSort: false
  },
  {
    widthPerc: 20,
    label: 'Thao tác',
    dataKey: 'actions',
    sortable: false
  },
  {
    widthPerc: 5,
    label: '',
    dataKey: 'more',
    sortable: false
  }
]

const UsersPage = ({ fetchUsersStart, users, ...props }) => {
  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState([])
  const [dialogUser, setDialogUser] = useState({})
  const [addDialog, setAddDialog] = useState(false)
  const [setDialog, setSetDialog] = useState(false)
  const [slideValue, setSlideValue] = useState(70)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (users.length === 0) {
      setRows([]);
      fetchUsersStart();
    }
    else {
      setRows(users)
    }
    //eslint-disable-next-line
  }, [users])

  useEffect(() => {
    setRows(users.filter(row => row.personaname.toLowerCase().includes(searchValue.toLowerCase())))
  }, [searchValue])

  const onSortClick = useCallback(index => () => {
    const prop = labelToProp(columns[index].label);

    setColumns(columns.map((column, i) => ({
      ...column,
      activeSort: index === i,
      direction: (index === i && (column.direction === 'desc' ? 'asc' : 'desc')) || undefined
    })))

    setRows(users.slice().sort(comparator(prop, columns[index].direction === 'desc')))
  }, [columns, rows])

  const onAddClick = useCallback(user => {
    setAddDialog(true);
    setDialogUser(user)
  }, [])

  const onSetClick = useCallback(user => {
    setSetDialog(true);
    setDialogUser(user)
  }, [])

  return (
    <>
      <Grid container direction='column'>
        <Grid item>
          <Toolbar
            onRefresh={() => fetchUsersStart()} hasSlide={true}
            slideValue={slideValue}
            onSlideCommit={(e, value) => setSlideValue(value)}
            slideTitle='Table Height'
            searchValue={searchValue}
            onSearchChange={e => setSearchValue(e.target.value)}
          />
        </Grid>
        <Grid item>
          {users.length !== 0 &&
            <Paper style={{ height: `${slideValue}vh`, width: '100%' }}>
              <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => ({ ...rows[index], onAddClick: onAddClick, onSetClick: onSetClick })}
                columns={columns}
                onSortClick={onSortClick}
              />
            </Paper>}
          {users.length === 0 && <LinearProgress />}
        </Grid>
      </Grid>
      <UserAddBalance user={dialogUser} open={addDialog} onClose={() => setAddDialog(false)} />
      <UserSetBalance user={dialogUser} open={setDialog} onClose={() => setSetDialog(false)} />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchUsersStart: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)