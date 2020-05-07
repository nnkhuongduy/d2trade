import React from 'react'
import { connect } from 'react-redux'

import { Icon } from 'react-icons-kit'
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle'

import DropdownBar from '../dropdown-bar/dropdown-bar.component'
import InfoContainer from '../info-container/info-container.component'
import SetBalanceButton from '../buttons/set-balance-button/set-balance-button.component'
import ModifyBalanceButton from '../buttons/modify-balance-button/modify-balance-button.component'

import { pushOverlay } from '../../redux/overlay/overlay.actions'

import './user-profile.component.scss'

const UserProfile = ({ pushOverlay, user, ...props }) => {
  const confirmEditFunc = value => {
    pushOverlay({ type: "CONFIRMATION", data: { user: user, value: value, type: "SET" }, exec_code: 'SET_BALANCE' });
  }

  return (
    <div className={'profile-section'}>
      <div className={'info-section'}>
        <img className={'profile-pic'} alt={'user_profile'} src={user.avatar} />
        <h2>
          {user.personaname}
          {user.tradeOfferUrl && <Icon icon={ic_check_circle} size={18} style={{ color: '#00b200', margin: '0 5px' }} />}
        </h2>
        <div className={'account-balance'}>
          <span>Balance:</span>
          <p>
            {user.accountBalance.toLocaleString()} VND
            <SetBalanceButton user={user} className={'edit'} />
            <ModifyBalanceButton user={user} className={'plus'} />
          </p>
        </div>
      </div>
      <div className={'detail-section'}>
        <DropdownBar title={"USER'S INFORMATION"}>
          <InfoContainer info={'Steam Name'} detail={user.personaname} />
          <InfoContainer info={'SteamID'} detail={user.steamid} />
          <InfoContainer info={'Profile Link'} detail={user.profileurl} isLink={true} />
          <InfoContainer info={'Account Balance'} detail={user.accountBalance.toLocaleString() + ' VND'} isEditable={true} confirmEditFunc={confirmEditFunc} />
          <InfoContainer info={'Steam Trade Offer URL'} detail={user.tradeOfferUrl} isLink={true} />
        </DropdownBar>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  pushOverlay: overlayObj => dispatch(pushOverlay(overlayObj))
})

export default connect(null, mapDispatchToProps)(UserProfile)