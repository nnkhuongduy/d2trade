import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setCurrentPage } from '../../redux/current-page/current-page.actions'

import './offers-page.component.scss'

const OffersPage = ({ setCurrentPage, ...props }) => {
  useEffect(() => {
    setCurrentPage("OFFERS")
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'offers-page'}>
      OFFERS PAGE
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default connect(null, mapDispatchToProps)(OffersPage)