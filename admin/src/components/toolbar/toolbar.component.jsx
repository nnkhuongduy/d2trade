import React from 'react'

import { Icon } from 'react-icons-kit'
import { ic_refresh } from 'react-icons-kit/md/ic_refresh'
import { ic_sort } from 'react-icons-kit/md/ic_sort'

import SearchBar from '../../components/search-bar/search-bar.component'

import './toolbar.component.scss'

const Toolbar = ({ searchValue, searchHandler, refreshHandler, sortHandler, ...props }) => {
  return (
    <div className={'toolbar'}>
      <SearchBar className={'tool'} onChange={searchHandler} value={searchValue} type="text" />
      <Icon icon={ic_refresh} size={24} className={'tool hover'} onClick={refreshHandler} />
      <Icon icon={ic_sort} size={24} className={'tool hover'} onClick={sortHandler} />
    </div>
  )
}

export default Toolbar