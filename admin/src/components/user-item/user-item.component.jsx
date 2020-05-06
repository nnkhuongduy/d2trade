import React, { useState } from 'react'
import moment from 'moment-timezone'

import { makeStyles } from '@material-ui/styles'
import {
  TableRow, TableCell,
  IconButton, Grid, Avatar,
} from '@material-ui/core'
import {
  AddCircle, Edit, ExpandMore, ExpandLess
} from '@material-ui/icons'

import InformationCollapse from './information-collapse.component'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  cellAlign: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}))

const UserItem = ({ user, onAddClick, onSetClick }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow hover className={classes.root}>
        <TableCell>{user.index}</TableCell>
        <TableCell>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <Avatar src={user.avatar} />
            </Grid>
            <Grid item>
              {user.personaname}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>{user.accountBalance.toLocaleString('en-US')}</TableCell>
        <TableCell>{moment(user.lastLogin).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm:ss A')}</TableCell>
        <TableCell>
          <IconButton size='small' className={classes.icon} onClick={onAddClick}>
            <AddCircle />
          </IconButton>
          <IconButton size='small' className={classes.icon} onClick={onSetClick}>
            <Edit />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>
      <InformationCollapse user={user} open={open} />
    </>
  )
}

export default UserItem