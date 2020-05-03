import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Icon } from 'react-icons-kit'
import { ic_expand_more } from 'react-icons-kit/md/ic_expand_more'

import { userQueryFilter } from '../../../helpers/search-query-filter'

import PulseLoader from 'react-spinners/PulseLoader'

import UserItem from '../../../components/user-item/user-item.component'
import FilterBox from '../../../components/filter-box/filter-box.component'
import Toolbar from '../../../components/toolbar/toolbar.component'

import { fetchUsersStart } from '../../../redux/users/users.actions'

import { selectUsers } from '../../../redux/users/users.selectors'
import { selectUserFilter } from '../../../redux/filter/filter.selectors'

import './users-page.component.scss'

const loaderStyle = `
  width: max-content;
  margin: 0 auto;
`

const UsersPage = ({ fetchUsersStart, users, userFilter, ...props }) => {

  const [searchValue, setSearchValue] = useState("")
  const [filterState, setFilterState] = useState(false)
  const [usersArray, setUsersArray] = useState(null)
  const [usersRendering, setUsersRendering] = useState(null)

  useEffect(() => {
    if (!users)
      fetchUsersStart();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (users) setUsersArray(userQueryFilter(searchValue, userFilter, users))
    else setUsersArray(null)
  }, [users, userFilter, searchValue])

  useEffect(() => {
    if (usersArray) setUsersRendering(usersArray.slice(0, 10))
    else setUsersRendering(null)
  }, [usersArray])

  const sliceUsersArray = () => setUsersRendering(usersArray.slice(0, usersRendering.length + 10))

  const scollHandle = e => {
    const element = e.target;
    const percentScroll = element.scrollTop / (element.scrollHeight - element.clientHeight) * 100;
    if (percentScroll === 100) {
      sliceUsersArray()
    }
  }

  return (
    <div className={'users-page'}>
      <Toolbar
        searchValue={searchValue}
        searchHandler={e => setSearchValue(e.target.value)}
        refreshHandler={() => fetchUsersStart()}
        sortHandler={() => setFilterState(state => !state)}
      />
      {filterState && <FilterBox
        options={[
          { value: "index", children: "Index" },
          { value: "accountBalance", children: "Balance" }
        ]}
      />}
      <UserItem />
      <PulseLoader css={loaderStyle} size={10} color={'#191970'} loading={users ? false : true} />
      <div className={'users-container'} onScroll={scollHandle}>
        {usersRendering && usersRendering.map(user => <UserItem key={user.steamid} user={user} index={user.itemIndex} />)}
        {usersRendering && usersArray && usersRendering.length !== usersArray.length &&
          <Icon icon={ic_expand_more} onClick={sliceUsersArray} className={'users-expand'} size={50} style={{ display: 'block' }} />
        }
      </div>
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