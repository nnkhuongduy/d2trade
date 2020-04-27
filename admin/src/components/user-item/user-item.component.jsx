import React from 'react'
import { Link } from 'react-router-dom'

import { Icon } from 'react-icons-kit'
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle'
import { ic_launch } from 'react-icons-kit/md/ic_launch'
import { ic_account_box } from 'react-icons-kit/md/ic_account_box'

import './user-item.component.scss'

const UserItem = ({ user, location, ...props }) => {
  const styles = {
    backgroundColor: user && user.index % 2 === 1 ? 'whitesmoke' : 'white'
  }

  if (user != null)
    return (
      <div className={'user-item item'} style={styles}>
        <div className={'user-index'}>
          {user.index}
        </div>
        <div className={'user-avatar'}>
          <img src={user.avatar} alt={'user_avatar'} />
        </div>
        <div className={'user-name'}>
          <Link to={location => `${location.pathname}/${user.steamid}`}><span>{user.personaname}</span></Link>
          {user.tradeOfferUrl !== "" && <Icon icon={ic_check_circle} style={{ color: '#00b200', margin: '0 5px' }} />}
        </div>
        <div className={'user-steam-profile'}>
          <a href={user.profileurl} target="_blank" rel="noopener noreferrer"><span>Steam</span> <Icon icon={ic_launch} /></a>
        </div>
        <div className={'user-balance'}>
          {user.accountBalance.toLocaleString()} VND
        </div>
        <div className={'user-actions'}>
          <Link to={location => `${location.pathname}/${user.steamid}`}><Icon icon={ic_account_box} size={24} className={'hover'} /></Link>
        </div>
      </div>
    )
  else return (
    <div className={'user-item head'}>
      <div className={'user-index'}>
        Index
      </div>
      <div className={'user-avatar'}>
      </div>
      <div className={'user-name'}>
        Username
      </div>
      <div className={'user-steam-profile'}>
        Steam Profile
      </div>
      <div className={'user-balance'}>
        Balance
      </div>
      <div className={'user-actions'}>
        Actions
      </div>
    </div>
  )
}

export default UserItem;