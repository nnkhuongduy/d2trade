import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import User from '../user/user.component';

import { logInStart } from '../../redux/user/user.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import './navigation.component.scss';

const Navigation = ({ currentUser, logInStart }) => {

  const logInHandle = () => {
    logInStart();
  }

  return (
    <div className="navigation">
      {currentUser ? <User user={currentUser} /> : <div className="log-in" onClick={logInHandle}>LOG IN</div>}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  logInStart: () => dispatch(logInStart())
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);