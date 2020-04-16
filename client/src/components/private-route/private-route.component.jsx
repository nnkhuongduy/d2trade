import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { Route, Redirect } from 'react-router-dom'

import UserProfile from '../user-profile/user-profile.component';

import { selectCurrentUser } from '../../redux/user/user.selectors'

const PrivateRoute = ({ currentUser, ...props }) => {

  return (
    <Route
      {...props}
      render={() =>
        currentUser !== null ? <UserProfile /> : <Redirect to={'/'} />
      }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(PrivateRoute);