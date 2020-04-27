import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import PulseLoader from 'react-spinners/PulseLoader'

import UserProfile from '../../components/user-profile/user-profile.component'

import { setCurrentPage } from '../../redux/current-page/current-page.actions'

import { selectUsers } from '../../redux/users/users.selectors'

import './user-page.component.scss'

const loaderStyle = `
  width: max-content;
  margin: 0 auto;
`

const UserPage = ({ setCurrentPage, users, match, ...props }) => {
  const [matchUser, setMatchUser] = useState(undefined)

  useEffect(() => {
    setCurrentPage("USER")
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (users || (users && matchUser === undefined)) {
      let flag = false;

      users.forEach(user => {
        if (user.steamid === match.params.steamid) {
          flag = true;
          setMatchUser(user);
        }
      })

      if (flag === false)
        setMatchUser(null)
    }
    // eslint-disable-next-line
  }, [users])

  return (
    <div className={'user-page'}>
      <PulseLoader css={loaderStyle} size={10} color={'#191970'} loading={matchUser === undefined ? true : false} />
      {matchUser ? <UserProfile user={matchUser} /> : (matchUser === null && <h3>KHÔNG CÓ USER NÀY TRONG DATABASE</h3>)}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

const mapStateToProps = createStructuredSelector({
  users: selectUsers
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)