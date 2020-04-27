import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setCurrentPage } from '../../redux/current-page/current-page.actions'

import './items-page.component.scss'

const ItemsPage = ({ setCurrentPage, ...props }) => {
  useEffect(() => {
    setCurrentPage("ITEMS")
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'items-page'}>
      ITEMS PAGE
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default connect(null, mapDispatchToProps)(ItemsPage)