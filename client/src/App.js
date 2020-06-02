import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Switch, Route, Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Backdrop, CircularProgress
} from '@material-ui/core'

import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import TradeUrlDialog from './components/trade-url/trade-url-dialog.component'

import HomePage from './pages/home/home-page.component'
import UserPage from './pages/user/user-page.component'
import FourOhFourPage from './pages/404/404-page.component'
import TransactionPage from './pages/transaction/transaction-page.component'

import { logInStart } from './redux/user/user.actions'
import { setBackdrop } from './redux/backdrop/backdrop.actions'

import { selectCurrentUser } from './redux/user/user.selectors'
import { selectBackdropState } from './redux/backdrop/backdrop.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}))

const App = ({ logIn, user, backdrop, setBackdrop }) => {
  const classes = useStyles()

  useEffect(() => {
    if (!user) logIn()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <Grid container direction='column' style={{ minHeight: '100vh' }}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item style={{ flex: 1, position: 'relative' }}>
          <div className={classes.root}>
            <Switch>
              <Route exact path='/user'>
                <UserPage />
              </Route>
              <Route exact path='/transaction'>
                <TransactionPage />
              </Route>
              <Route exact path='/404'>
                <FourOhFourPage />
              </Route>
              <Route exact path='/'>
                <HomePage />
              </Route>
              <Redirect to='/404' />
            </Switch>
          </div>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
      <TradeUrlDialog />
      <Backdrop className={classes.backdrop} open={backdrop} onClick={() => setBackdrop(false)}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logInStart()),
  setBackdrop: state => dispatch(setBackdrop(state))
})

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  backdrop: selectBackdropState
})

export default connect(mapStateToProps, mapDispatchToProps)(App)