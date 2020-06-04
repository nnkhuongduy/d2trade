import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCurrentUser } from '../../redux/user/user.selectors'

const PrivateRoute = ({ user, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    user ?
      <Component {...props} />
      : <Redirect to="/404" />
  )} />
)

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

export default connect(mapStateToProps)(PrivateRoute)