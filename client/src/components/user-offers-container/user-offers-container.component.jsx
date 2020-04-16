import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import UserOffer from '../user-offer/user-offer.component'
import { Icon } from 'react-icons-kit'
import { ic_refresh } from 'react-icons-kit/md/ic_refresh'
import { ReactComponent as RollingSVG } from '../../assets/svg/rolling.svg';

import { fetchOffersStart } from '../../redux/user/user.actions'

import { selectFetchOffersState, selectUserOffers } from '../../redux/user/user.selectors'

import './user-offers-container.component.scss'

const UserOffersContainer = ({ userOffers, fetchOffersState, fetchOffersStart, ...props }) => {
  useEffect(() => {
    if (fetchOffersState === false && !userOffers)
      fetchOffersStart();
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'user-offers-container'}>
      <UserOffer />
      {fetchOffersState === true && <RollingSVG />}
      {fetchOffersState === false && userOffers && userOffers.map(offer => <UserOffer key={offer.offer_id} offer={offer} />)}
      {fetchOffersState === false && userOffers && <Icon icon={ic_refresh} className={'refresh-button'} size={24} onClick={() => fetchOffersStart()} />}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchOffersStart: () => dispatch(fetchOffersStart())
})

const mapStateToProps = createStructuredSelector({
  fetchOffersState: selectFetchOffersState,
  userOffers: selectUserOffers
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOffersContainer)