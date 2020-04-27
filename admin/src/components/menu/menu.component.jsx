import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import { Icon } from 'react-icons-kit'
import { ic_account_circle } from 'react-icons-kit/md/ic_account_circle'
import { ic_style } from 'react-icons-kit/md/ic_style'
import { ic_local_offer } from 'react-icons-kit/md/ic_local_offer'
import { ic_settings } from 'react-icons-kit/md/ic_settings'

import { ReactComponent as Logo } from '../../assets/svg/logo.svg'

import './menu.component.scss'

const Menu = () => (
  <div className={'menu'}>
    <img src={'https://i.pinimg.com/564x/d1/59/e9/d159e9ca272b73f56ef2b770a7c0b17b.jpg'} alt={'dota2_illu'} className={'background'} />
    <Link to="/dashboard"><Logo className={'logo'} /></Link>
    <div className={'line'} />
    <NavLink to="/users" activeClassName={'actived'} className={'nav-link'}>
      <Icon icon={ic_account_circle} size={24} />
      <span>USERS</span>
    </NavLink>
    <NavLink to="/items" activeClassName={'actived'} className={'nav-link'}>
      <Icon icon={ic_style} size={24} />
      <span>ITEMS</span>
    </NavLink>
    <NavLink to="/offers" activeClassName={'actived'} className={'nav-link'}>
      <Icon icon={ic_local_offer} size={24} />
      <span>OFFERS</span>
    </NavLink>
    <NavLink to="/configs" activeClassName={'actived'} className={'nav-link'}>
      <Icon icon={ic_settings} size={24} />
      <span>CONFIGS</span>
    </NavLink>
  </div>
)

export default Menu;