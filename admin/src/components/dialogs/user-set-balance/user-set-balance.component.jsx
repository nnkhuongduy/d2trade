import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import {
  Dialog, DialogContent, DialogActions,
  Grid, Button, TextField
} from '@material-ui/core'
import { ArrowDownward } from '@material-ui/icons'

import Confirmation from '../confirmation/confirmation.component'
import UserCard from '../../user/user-card/user-card.component'

import { balanceInputFilter } from '../../../helpers/balance-input-filter'

import { setBalance } from '../../../redux/users/users.actions'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  root: {
    overflow: 'unset',
    padding: theme.spacing(5),
  }
}))

const UserSetBalanceDialog = ({ user, open, onClose, setBalance }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [disable, setDisable] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    setDisable(value === '' || value === '-')
    //eslint-disable-next-line
  }, [value])

  useEffect(() => {
    if (value !== '') setValue('')
    //eslint-disable-next-line
  }, [open])

  const onConfirm = useCallback(() => {
    setConfirmOpen(true)
  }, [])

  const onConfirmConfirm = useCallback(() => {
    setBalance(user.steamid, parseInt(value.replace(/,/g, '')), 'SET')
    onClose();
    //eslint-disable-next-line
  }, [user, value])

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="user-add-balance"
        disableBackdropClick
      >
        <DialogContent className={classes.root}>
          <Grid container direction='column' spacing={2} alignItems='center'>
            <UserCard user={user} size='small' />
            <Grid item>
              <ArrowDownward />
            </Grid>
            <Grid item>
              <TextField
                label='Đặt số dư'
                required size='small'
                variant='filled'
                value={balanceInputFilter(value)}
                onChange={e => setValue(balanceInputFilter(e.target.value))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Cancel
        </Button>
          <Button onClick={onConfirm} color='primary' variant='contained' disabled={disable}>
            Confirm
        </Button>
        </DialogActions>
      </Dialog>
      <Confirmation
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)} onConfirm={onConfirmConfirm}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  setBalance: (steamId, value, actionType) => dispatch(setBalance(steamId, value, actionType))
})

export default connect(null, mapDispatchToProps)(UserSetBalanceDialog)