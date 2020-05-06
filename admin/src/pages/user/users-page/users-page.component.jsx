import React, { useEffect, useState, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, LinearProgress,
  Table, TableHead, TableBody, TableCell, TableRow, TableSortLabel, TableContainer
} from '@material-ui/core'

import UserItem from '../../../components/user-item/user-item.component'
import UserAddBalance from '../../../components/dialogs/user-add-balance/user-add-balance.component'
import UserSetBalance from '../../../components/dialogs/user-set-balance/user-set-balance.component'

import { fetchUsersStart } from '../../../redux/users/users.actions'

import { selectUsers } from '../../../redux/users/users.selectors'

import Toolbar from '../../../components/toolbar/toolbar.component'

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: '75vh'
  }
}))

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

const UsersPage = ({ fetchUsersStart, users, ...props }) => {
  const classes = useStyles();

  const [columns, setColumns] = useState([
    { label: 'Index', active: true, sortable: true, direction: 'asc' },
    { label: 'Tài khoản', active: false, sortable: true, direction: 'asc' },
    { label: 'Số dư', active: false, sortable: true, direction: 'asc' },
    { label: 'Đăng nhập gần nhất', active: false, sortable: true, direction: 'asc' },
    { label: 'Thao tác', active: false },
    { label: '', active: false }
  ])
  const [rows, setRows] = useState([])
  const [addUser, setAddUser] = useState({})
  const [addDialog, setAddDialog] = useState(false)
  const [setDialog, setSetDialog] = useState(false)
  const [renderedRows, setRenderedRows] = useState(10)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (users.length === 0) {
      setRows([]);
      setRenderedRows(10)
      fetchUsersStart();
    }
    else {
      setRows(users)
    }
    //eslint-disable-next-line
  }, [users])

  const sortOnClick = useCallback(index => () => {
    const prop = labelToProp(columns[index].label);

    setColumns(columns.map((column, i) => ({
      ...column,
      active: index === i,
      direction: (index === i && (column.direction === 'desc' ? 'asc' : 'desc')) || undefined
    })))

    setRows(users.slice().sort(comparator(prop, columns[index].direction === 'desc')))

    setRenderedRows(10)

    scrollRef.current.scrollTop = 0;
  }, [columns, rows])

  const onScoll = e => {
    const element = e.target;
    const percentScroll = element.scrollTop / (element.scrollHeight - element.clientHeight) * 100;
    if (percentScroll === 100) {
      setRenderedRows(renderedRows + 10)
    }
  }

  return (
    <>
      <Grid container direction='column'>
        <Grid item>
          <Toolbar onRefresh={() => fetchUsersStart()} />
        </Grid>
        <Grid item>
          <TableContainer ref={scrollRef} className={classes.container} onScroll={onScoll}>
            <Table size='small' stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map(({ label, active, sortable, direction }, index) => (
                    <TableCell key={index} >
                      {sortable ? (
                        <TableSortLabel active={active} onClick={sortOnClick(index)} direction={direction && direction}>
                          {label}
                        </TableSortLabel>
                      ) : label
                      }
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length !== 0 && rows.slice(0, renderedRows).map((user, index) => (
                  <UserItem
                    key={index}
                    user={user}
                    onAddClick={() => { setAddDialog(true); setAddUser(user) }}
                    onSetClick={() => { setSetDialog(true); setAddUser(user) }}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {rows.length === 0 && <LinearProgress />}
        </Grid>
      </Grid>
      <UserAddBalance user={addUser} open={addDialog} onClose={() => setAddDialog(false)} />
      <UserSetBalance user={addUser} open={setDialog} onClose={() => setSetDialog(false)} />
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