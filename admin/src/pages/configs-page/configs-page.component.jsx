import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setCurrentPage } from '../../redux/current-page/current-page.actions'

import './configs-page.component.scss'

const ConfigsPage = ({ setCurrentPage, ...props }) => {
  useEffect(() => {
    setCurrentPage("CONFIGS")
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'configs-page'}>
      CONFIGS PAGE
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default connect(null, mapDispatchToProps)(ConfigsPage)