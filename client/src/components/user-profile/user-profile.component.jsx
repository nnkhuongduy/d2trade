import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'

import { Icon } from 'react-icons-kit'
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle'
import { ic_cancel } from 'react-icons-kit/md/ic_cancel'
import { plus } from 'react-icons-kit/icomoon/plus'

import DropdownBar from '../dropdown-bar/dropdown-bar.component'
import InfoContainer from '../info-container/info-container.component'
import UserOffersContainer from '../user-offers-container/user-offers-container.component'

import { selectCurrentUser } from '../../redux/user/user.selectors';

import './user-profile.component.scss';

const UserProfile = ({ currentUser, ...props }) => {
  return (
    <div className={'profile-section'}>
      <div className={'info-section'}>
        <img className={'profile-pic'} alt={'user_profile'} src={currentUser.avatar} />
        <h1>
          {currentUser.personaname}
          <span className={`check-container ${currentUser.tradeOfferUrl ? 'green' : 'red'}`}>
            {currentUser.tradeOfferUrl ? <Icon icon={ic_check_circle} /> : <Icon icon={ic_cancel} />}
          </span>
        </h1>

        <div className={'account-balance'}>
          <span>Balance:</span>
          <p>
            {parseInt(currentUser.accountBalance).toLocaleString()} VND
            <Link to={'/user/transaction'}>
              <Icon icon={plus} className={'plus'} />
            </Link>
          </p>
        </div>
      </div>
      <div className={'detail-section'}>
        <DropdownBar title={"USER'S INFORMATION"}>
          <InfoContainer info={'Steam Name'} detail={currentUser.personaname} />
          <InfoContainer info={'SteamID'} detail={currentUser.steamid} />
          <InfoContainer info={'Profile Link'} detail={currentUser.profileurl} isLink={true} />
          <InfoContainer info={'Account Balance'} detail={parseInt(currentUser.accountBalance).toLocaleString()} isBalance={true} />
          <InfoContainer info={'Steam Trade Offer URL'} detail={currentUser.tradeOfferUrl} isLink={true} isEditable={true} />
        </DropdownBar>
        <DropdownBar title={"TRADE HISTORY"} >
          <UserOffersContainer />
        </DropdownBar>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(UserProfile);