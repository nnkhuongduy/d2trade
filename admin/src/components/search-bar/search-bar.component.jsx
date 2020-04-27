import React from 'react'

import { Icon } from 'react-icons-kit'
import { ic_search } from 'react-icons-kit/md/ic_search'


import './search-bar.component.scss'

const SearchBar = ({ className, ...props }) => {
  return (
    <div className={`search-bar ${className}`}>
      <input className={'search-input'} placeholder={'Search...'} />
      <Icon icon={ic_search} size={24} />
    </div>
  )
}

export default SearchBar;