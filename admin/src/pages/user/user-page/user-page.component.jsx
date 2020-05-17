import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import PulseLoader from 'react-spinners/PulseLoader'

import UserProfile from '../../../components/user/user-profile/user-profile.component'

import { fetchUsersStart } from '../../../redux/users/users.actions'

import { selectUsers } from '../../../redux/users/users.selectors'

const loaderStyle = `
  width: max-content;
  margin: 0 auto;
`

const UserPage = ({ setCurrentPage, fetchUsersStart, users, match, ...props }) => {
  const [matchUser, setMatchUser] = useState(undefined)

  useEffect(() => {
    console.log(users)
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

  useEffect(() => {
    if (users.length === 0) fetchUsersStart()
    //eslint-disable-next-line
  }, [])

  return (
    <div className={'user-page'}>
      <PulseLoader css={loaderStyle} size={10} color={'#191970'} loading={matchUser === undefined ? true : false} />
      {matchUser ? <UserProfile user={matchUser} /> : (matchUser === null && <h3>KHÔNG CÓ USER NÀY TRONG DATABASE</h3>)}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchUsersStart: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  users: selectUsers
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)