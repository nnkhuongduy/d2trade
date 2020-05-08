import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Icon } from 'react-icons-kit'
import { ic_library_add } from 'react-icons-kit/md/ic_library_add'
import { ic_visibility_off } from 'react-icons-kit/md/ic_visibility_off'
import { ic_delete } from 'react-icons-kit/md/ic_delete'

import { pushOverlay } from '../../../redux/overlay/overlay.actions'
import { fetchCurrencyRateStart } from '../../../redux/site-settings/site-settings.actions'
import { fetchHeroesStart } from '../../../redux/hero/hero.actions'

import { selectCurrencyRate } from '../../../redux/site-settings/site-settings.selectors'
import { selectHeroes } from '../../../redux/hero/hero.selectors'

import './items-page.component.scss'

const ItemsPage = ({ location, pushOverlay, currencyRate, fetchCurrencyRateStart, fetchHeroesStart, heroes, ...props }) => {

  useEffect(() => {
    if (!currencyRate) fetchCurrencyRateStart()
    if (!heroes) fetchHeroesStart()
    //eslint-disable-next-line
  }, [])

  const newClickHandle = () => {
    pushOverlay({ type: "NEW_ITEM", data: {}, exec_code: "NEW_ITEM_CONFIRMATION" })
  }

  return (
    <div className={'items-page'}>
      <div className={'toolbar-container'}>
        <div className={'actions'}>
          <div className={'action'} onClick={newClickHandle}><Icon icon={ic_library_add} /><span>New</span></div>
          <div className={'action'}><Icon icon={ic_visibility_off} /><span>Disable</span></div>
          <div className={'action'}><Icon icon={ic_delete} /><span>Delete</span></div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  pushOverlay: overlay => dispatch(pushOverlay(overlay)),
  fetchCurrencyRateStart: () => dispatch(fetchCurrencyRateStart()),
  fetchHeroesStart: () => dispatch(fetchHeroesStart())
})

const mapStateToProps = createStructuredSelector({
  currencyRate: selectCurrencyRate,
  heroes: selectHeroes
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)