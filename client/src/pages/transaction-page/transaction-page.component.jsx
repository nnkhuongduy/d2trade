import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import DropdownBar from '../../components/dropdown-bar/dropdown-bar.component'
import InfoContainer from '../../components/info-container/info-container.component'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import './transaction-page.component.scss'

const TransactionPage = ({ currentUser, ...props }) => {
  return (
    <div className={'transaction-page'}>
      <div className={'img-section'}>
        <img src={'https://i.pinimg.com/564x/50/60/68/506068d34f7062b5c28e4c932e9055c8.jpg'} alt={'dota2_illu'} />
      </div>
      <div className={'transaction-section'}>
        <h1>Chuyển Khoản</h1>
        <DropdownBar title={'Ngân Hàng'}>
          <InfoContainer info={'Ngân hàng: '} detail={'Vietcombank'} />
          <InfoContainer info={'Chủ tài khoản: '} detail={'TEST'} />
          <InfoContainer info={'Số tài khoản: '} detail={'1234567890'} />
          <InfoContainer info={'Lời nhắn: '} detail={`STEAMID: ${currentUser.steamid}`} />
        </DropdownBar>
        <DropdownBar title={'MoMo'}>
          <InfoContainer info={'Chủ tài khoản: '} detail={'TEST'} />
          <InfoContainer info={'SDT: '} detail={'12345678'} />
          <InfoContainer info={'Lời nhắn: '} detail={`STEAMID: ${currentUser.steamid}`} />
        </DropdownBar>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(TransactionPage);