import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setCurrentPage } from '../../redux/current-page/current-page.actions'

import './dashboard.component.scss'

const Dashboard = ({ setCurrentPage, ...props }) => {
  useEffect(() => {
    setCurrentPage("DASHBOARD")
    // eslint-disable-next-line
  }, [])

  return (
    <div className={'dashboard'}>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>

      <h1>TEST</h1><h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>

      <h1>TEST</h1><h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1><h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>

      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default connect(null, mapDispatchToProps)(Dashboard)