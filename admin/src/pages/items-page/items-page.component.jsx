import React from 'react'

import { Icon } from 'react-icons-kit'
import { ic_library_add } from 'react-icons-kit/md/ic_library_add'
import { ic_visibility_off } from 'react-icons-kit/md/ic_visibility_off'
import { ic_delete } from 'react-icons-kit/md/ic_delete'

import Toolbar from '../../components/toolbar/toolbar.component'

import './items-page.component.scss'

const ItemsPage = () => {
  return (
    <div className={'items-page'}>
      <div className={'toolbar-container'}>
        <div className={'actions'}>
          <div className={'action'}><Icon icon={ic_library_add} /><span>New</span></div>
          <div className={'action'}><Icon icon={ic_visibility_off} /><span>Disable</span></div>
          <div className={'action'}><Icon icon={ic_delete} /><span>Delete</span></div>
        </div>
        <Toolbar />
      </div>
    </div>
  )
}

export default ItemsPage