import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import UserOffer from '../user-offer/user-offer.component'
import { Icon } from 'react-icons-kit'
import { ic_refresh } from 'react-icons-kit/md/ic_refresh'
import { ic_attach_money } from 'react-icons-kit/md/ic_attach_money'
import { ReactComponent as RollingSVG } from '../../assets/svg/rolling.svg';

import { fetchOffersStart } from '../../redux/user/user.actions'
import { setCurrency } from '../../redux/currency/currency.actions'

import { selectFetchOffersState, selectUserOffers } from '../../redux/user/user.selectors'
import { selectCurrencyState } from '../../redux/currency/currency.selectors'

import './user-offers-container.component.scss'

const UserOffersContainer = ({ userOffers, fetchOffersState, fetchOffersStart, setCurrency, currencyState, ...props }) => {
  useEffect(() => {
    if (fetchOffersState === false && !userOffers)
      fetchOffersStart();
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'user-offers-container'}>
      <div className={'container-options'}>
        <div className={'currency-button'} onClick={() => setCurrency(currencyState === "vnd" ? "usd" : "vnd")}>
          <Icon icon={ic_attach_money} size={20} />
          {currencyState.toUpperCase()}
        </div>
        <Icon icon={ic_refresh} className={'refresh-button'} size={24} onClick={() => fetchOffersStart()} />
      </div>
      <UserOffer />
      {fetchOffersState === true && <RollingSVG />}
      {fetchOffersState === false && userOffers && userOffers.map(offer => <UserOffer key={offer.offer_id} offer={offer} />)}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchOffersStart: () => dispatch(fetchOffersStart()),
  setCurrency: type => dispatch(setCurrency(type))
})

const mapStateToProps = createStructuredSelector({
  fetchOffersState: selectFetchOffersState,
  userOffers: selectUserOffers,
  currencyState: selectCurrencyState
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOffersContainer)