import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { queryFilter } from '../../helpers/search-query-filter'

import { Icon } from 'react-icons-kit'
import { ic_refresh } from 'react-icons-kit/md/ic_refresh'
import { ic_sort } from 'react-icons-kit/md/ic_sort'
import PulseLoader from 'react-spinners/PulseLoader'

import UserItem from '../../components/user-item/user-item.component'
import SearchBar from '../../components/search-bar/search-bar.component'
import FilterBox from '../../components/filter-box/filter-box.component'

import { fetchUsersStart } from '../../redux/users/users.actions'

import { selectUsers } from '../../redux/users/users.selectors'
import { selectUserFilter } from '../../redux/filter/filter.selectors'

import './users-page.component.scss'

const loaderStyle = `
  width: max-content;
  margin: 0 auto;
`

const UsersPage = ({ fetchUsersStart, users, userFilter, ...props }) => {

  const [searchValue, setSearchValue] = useState("")
  const [filterState, setFilterState] = useState(false)
  const [usersArray, setUsersArray] = useState(null)

  useEffect(() => {
    if (!users)
      fetchUsersStart();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (users) setUsersArray(queryFilter(searchValue, userFilter, users))
    else setUsersArray(null)
  }, [users, userFilter, searchValue])

  const changeHandler = e => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={'users-page'}>
      <div className={'toolbar'}>
        <SearchBar className={'tool'} onChange={changeHandler} value={searchValue} type="text" />
        <Icon icon={ic_refresh} size={24} className={'tool hover'} onClick={() => fetchUsersStart()} />
        <Icon icon={ic_sort} size={24} className={'tool hover'} onClick={() => setFilterState(state => !state)} />
      </div>
      {filterState && <FilterBox />}
      <UserItem />
      {usersArray && usersArray.map(user => <UserItem key={user.steamid} user={user} index={user.itemIndex} />)}
      <PulseLoader css={loaderStyle} size={10} color={'#191970'} loading={users ? false : true} />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchUsersStart: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  userFilter: selectUserFilter
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)