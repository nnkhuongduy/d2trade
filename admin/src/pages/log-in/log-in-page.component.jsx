import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Paper, Typography, TextField, InputAdornment, IconButton, Button
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import { logInStart } from '../../redux/admin/admin.actions'

import { selectLoggingIn, selectAdmin } from '../../redux/admin/admin.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[600],
    width: '100vw',
    height: '100vh'
  },
  paper: {
    width: '40%',
    height: '30%',
    margin: '0 auto',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    boxSizing: 'border-box',
    padding: theme.spacing(6),
    textAlign: 'center'
  }
}))

const VisibilityIcon = ({ visibility }) => visibility ? <VisibilityOff /> : <Visibility />

const LogInPage = ({ logIn, loggingIn, admin }) => {
  const history = useHistory()
  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [adminName, setAdminName] = useState('')
  const [visibility, setVisibility] = useState(false)

  // useEffect(() => {
  //   if (admin)
  //     history.push('/')
  // }, [])

  useEffect(() => {
    if (admin)
      history.push('/')
  }, [admin])

  const logInHandle = e => {
    e.preventDefault();
    logIn({ adminName: adminName, password: password })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <form>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Typography variant='h4'>MẬT KHẨU</Typography>
            </Grid>
            <Grid item>
              <Grid container direction='column'>
                <Grid item>
                  <TextField
                    id='adminname'
                    value={adminName}
                    onChange={e => setAdminName(e.target.value)}
                    variant='outlined'
                    fullWidth
                    autoFocus
                    margin='dense'
                    type='text'
                    disabled={loggingIn}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    variant='outlined'
                    fullWidth
                    margin='dense'
                    type={visibility ? 'text' : 'password'}
                    disabled={loggingIn}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">
                        <IconButton size='small' onClick={() => setVisibility(!visibility)}>
                          <VisibilityIcon visibility={visibility} />
                        </IconButton>
                      </InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                disabled={!Boolean(password.length)}
                color='primary'
                onClick={logInHandle}
                type='submit'
                disabled={loggingIn}
              >
                Đăng Nhập
                </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  logIn: logInObj => dispatch(logInStart(logInObj))
})

const mapStateToProps = createStructuredSelector({
  loggingIn: selectLoggingIn,
  admin: selectAdmin
})

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage)