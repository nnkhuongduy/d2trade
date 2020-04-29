import React, { useState } from 'react'
import { connect } from 'react-redux'

import Button from '../buttons/button/button.component'

import { setUserFilter } from '../../redux/filter/filter.actions'

import './filter-box.component.scss'

const FilterBox = ({ setUserFilter, options, ...props }) => {
  const [btnState, setBtnState] = useState('Ascending')
  const [option, setOption] = useState('index')

  const clickHandler = e => {
    setBtnState(e.target.innerHTML)
  }

  const applyHandler = () => {
    const filter = {
      option: option,
      state: btnState
    }

    setUserFilter(filter)
  }

  return (
    <div className={'filter-box'}>
      <select className={'filter-select'} value={option} onChange={e => setOption(e.target.value)}>
        {options.map(option => <option value={option.value}>{option.children}</option>)}
      </select>
      <div className={'filter-btns'}>
        <Button onClick={clickHandler} active={btnState === "Ascending" ? true : false}>Ascending</Button>
        <Button onClick={clickHandler} active={btnState === "Descending" ? true : false}>Descending</Button>
      </div>
      <Button onClick={applyHandler}>APPLY</Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setUserFilter: filter => dispatch(setUserFilter(filter))
})

export default connect(null, mapDispatchToProps)(FilterBox)