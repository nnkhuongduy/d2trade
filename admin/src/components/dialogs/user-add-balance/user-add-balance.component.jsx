import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Dialog, DialogContent, DialogActions,
  Grid, Avatar, Typography, Button, TextField
} from '@material-ui/core'
import { Add } from '@material-ui/icons'

import Confirmation from '../confirmation/confirmation.component'
import Backdrop from '../../backdrop/backdrop.component'

import { balanceInputFilter } from '../../../helpers/balance-input-filter'

import { setBalance } from '../../../redux/users/users.actions'

import { selectBalanceSetting } from '../../../redux/users/users.selectors'

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

const UserAddBalance = ({ user, open, onClose, setBalance, isSetting }) => {
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
    setBalance(user.steamid, parseInt(value.replace(/,/g, '')), 'MODIFY')
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
            <Grid item>
              <Avatar src={user.avatar} className={classes.avatar} />
            </Grid>
            <Grid item>
              <Typography variant='h6'>{user.personaname}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>{user.steamid}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>Số dư tài khoản:</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={3} alignItems='center'>
                <Grid item>
                  <Typography>{user.accountBalance && user.accountBalance.toLocaleString('en-US')}</Typography>
                </Grid>
                <Grid item>
                  <Add />
                </Grid>
                <Grid item>
                  <TextField
                    label='Số tiền thêm'
                    required size='small'
                    variant='filled'
                    value={balanceInputFilter(value)}
                    onChange={e => setValue(balanceInputFilter(e.target.value))}
                  />
                </Grid>
              </Grid>
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
      <Backdrop open={isSetting} />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  setBalance: (steamId, value, actionType) => dispatch(setBalance(steamId, value, actionType))
})

const mapStateToProps = createStructuredSelector({
  isSetting: selectBalanceSetting
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAddBalance)