import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import User from '../user/user.component';

import { logInStart } from '../../redux/user/user.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import './navigation.component.scss';

const Navigation = ({ currentUser, logInStart }) => {

  useEffect(() => {
    const checkCurrentUser = () => {
      if (!currentUser)
        logInStart();
    }
    checkCurrentUser()
  }, [currentUser, logInStart])

  const logInHandle = () => {
    window.open('http://localhost:5000/auth/steam', '_self');
  }

  return (
    <div className="navigation">
      {currentUser ? <User user={currentUser} /> : <div className="log-in" onClick={logInHandle}><img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" alt={'Steam log in'} /></div>}
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