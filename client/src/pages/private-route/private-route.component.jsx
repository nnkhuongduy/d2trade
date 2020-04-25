import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { Route, Redirect } from 'react-router-dom'

import { selectCurrentUser } from '../../redux/user/user.selectors'

const PrivateRoute = ({ currentUser, component: Component, ...props }) => {

  return (
    <Route
      {...props}
      render={props =>
        currentUser !== null ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(PrivateRoute);