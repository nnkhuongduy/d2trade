import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'

import { Icon } from 'react-icons-kit'
import { ic_person } from 'react-icons-kit/md/ic_person'
import { ic_notifications } from 'react-icons-kit/md/ic_notifications'
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard'

import { selectCurrentPage } from '../../redux/current-page/current-page.selectors'

import './header.component.scss'

const Header = ({ currentPage }) => (
  <div className={'header'}>
    <>
      <h3>{currentPage}</h3>
    </>
    <div className={'header-actions'}>
      <Link to="/dashboard"><Icon icon={ic_dashboard} size={24} className={'hover'} /></Link>
      <Icon icon={ic_notifications} size={24} className={'hover'} />
      <Icon icon={ic_person} size={24} />
      <span>ADMIN</span>
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  currentPage: selectCurrentPage
})

export default connect(mapStateToProps)(Header);