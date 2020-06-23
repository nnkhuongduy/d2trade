import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectAdmin } from '../../redux/admin/admin.selectors'

const PrivateRoute = ({ admin, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    admin ?
      <Component {...props} />
      : <Redirect to="/login" />
  )} />
)

const mapStateToProps = createStructuredSelector({
  admin: selectAdmin
})

export default connect(mapStateToProps)(PrivateRoute)