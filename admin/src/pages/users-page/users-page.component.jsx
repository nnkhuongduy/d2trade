import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Icon } from 'react-icons-kit'
import { ic_refresh } from 'react-icons-kit/md/ic_refresh'
import { ic_sort } from 'react-icons-kit/md/ic_sort'
import PulseLoader from 'react-spinners/PulseLoader'

import UserItem from '../../components/user-item/user-item.component'
import SearchBar from '../../components/search-bar/search-bar.component'

import { setCurrentPage } from '../../redux/current-page/current-page.actions'
import { fetchUsersStart } from '../../redux/users/users.actions'

import { selectUsers } from '../../redux/users/users.selectors'

import './users-page.component.scss'

const loaderStyle = `
  width: max-content;
  margin: 0 auto;
`

const UsersPage = ({ setCurrentPage, fetchUsersStart, users, ...props }) => {
  useEffect(() => {
    setCurrentPage("USERS")
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'users-page'}>
      <div className={'toolbar'}>
        <SearchBar className={'tool'} />
        <Icon icon={ic_refresh} size={24} className={'tool hover'} onClick={() => fetchUsersStart()} />
        <Icon icon={ic_sort} size={24} className={'tool hover'} />
      </div>
      <UserItem />
      {users && users.map(user => <UserItem key={user.steamid} user={user} />)}
      <PulseLoader css={loaderStyle} size={10} color={'#191970'} loading={users ? false : true} />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page)),
  fetchUsersStart: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  users: selectUsers
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)