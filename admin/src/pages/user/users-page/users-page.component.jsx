import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Grid, LinearProgress, Paper, Collapse
} from '@material-ui/core'
import {
  Search, Tune, FilterList, Refresh
} from '@material-ui/icons'

import comparator from '../../../helpers/sort-function'

import UserAddBalanceDialog from '../../../components/dialogs/user-add-balance/user-add-balance.component'
import UserSetBalanceDialog from '../../../components/dialogs/user-set-balance/user-set-balance.component'
import VirtualizedTable from './virtualized-table.component'
import Toolbar from '../../../components/toolbar/toolbar.component'
import ToolbarContent from './toolbar-content.component'

import { fetchUsersStart } from '../../../redux/users/users.actions'

import { selectUsers, selectUsersFetching } from '../../../redux/users/users.selectors'

const INITIAL_COLUMNS = [
  {
    widthPerc: 10,
    label: 'Index',
    dataKey: 'index',
    sortable: true,
    direction: 'desc',
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

const UsersPage = ({ fetchUsers, users, fetching }) => {
  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState([])
  const [dialogUser, setDialogUser] = useState({})
  const [addDialog, setAddDialog] = useState(false)
  const [setDialog, setSetDialog] = useState(false)
  const [tools, setTools] = useState([
    {
      label: 'search',
      Icon: <Search />,
      value: '',
      active: false
    },
    {
      label: 'slider',
      Icon: <Tune />,
      value: 700,
      active: false
    },
    {
      label: 'refresh',
      Icon: <Refresh />,
      func: fetchUsers
    }
  ])

  useEffect(() => {
    if (!users) fetchUsers()
  }, [])

  useEffect(() => {
    if (users) setRows(users)
    //eslint-disable-next-line
  }, [users])

  useEffect(() => {
    if (users)
      setRows(users.filter(user => user.personaname.toLowerCase().includes(tools[0].value.toLowerCase())))
  }, [tools[0].value])

  const onSortClick = index => () => {

    setColumns(columns.map((column, i) => ({
      ...column,
      activeSort: index === i,
      direction: (index === i && (column.direction === 'desc' ? 'asc' : 'desc')) || undefined
    })))

    setRows(users.slice().sort(comparator(columns[index].dataKey, columns[index].direction === 'desc')))
    //eslint-disable-next-line
  }

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
      <Grid container direction='column' spacing={2}>
        <Collapse in={fetching}>
          <Grid item>
            <LinearProgress />
          </Grid>
        </Collapse>
        <Grid item style={{ alignSelf: 'flex-end' }}>
          <Toolbar tools={tools} onChange={tools => setTools(tools)} />
        </Grid>
        <Grid item>
          <ToolbarContent tools={tools} onChange={tools => setTools(tools)} />
        </Grid>
        <Grid item>
          {rows &&
            <Paper style={{ height: tools[1].value, width: '100%' }} elevation={3}>
              <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => ({ ...rows[index], onAddClick: onAddClick, onSetClick: onSetClick })}
                columns={columns}
                onSortClick={onSortClick}
              />
            </Paper>}
        </Grid>
      </Grid>
      <UserAddBalanceDialog
        user={dialogUser}
        open={addDialog}
        onClose={() => setAddDialog(false)}
      />
      <UserSetBalanceDialog
        user={dialogUser}
        open={setDialog}
        onClose={() => setSetDialog(false)}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)