import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import bxRefresh from '@iconify/icons-bx/bx-refresh';

import ToolBarFilter from '../tool-bar-filter/tool-bar-filter.component'

import { selectBotSearchingQuery, selectUserSearchingQuery } from '../../redux/searching/searching.selectors'

import { setQueryItemsStart } from '../../redux/searching/searching.actions';
import { refreshInventory } from '../../redux/inventory/inventory.actions'

import './steam-inventory-toolbar.component.scss';

const SteamInventoryToolbar = ({
  type,
  botSearchingQuery, userSearchingQuery,
  setQueryItemsStart,
  refreshInventory,
}) => {
  const [searchbarActiveState, setSearchbarActiveState] = useState(false)

  const inputChangeHandle = (e) => {
    const value = e.target.value;
    setQueryItemsStart(type, value);
  }

  const refreshClickHandle = () => {
    refreshInventory(type);
  }

  return (
    <div className="steam-inven-toolbar">
      <div className={`searchbar ${searchbarActiveState ? 'active' : ''}`}>
        <div>
          <Icon icon={magnifyIcon} width="1.5em" height="1.5em" />
        </div>
        <input
          type="text"
          value={type === "bot" ? botSearchingQuery : userSearchingQuery}
          onChange={inputChangeHandle}
          placeholder="Search"
          onSelect={() => setSearchbarActiveState(true)}
          onBlur={() => setSearchbarActiveState(false)}
        />
      </div>
      <ToolBarFilter type={type} />
      <div className="tool-section">
        <div>
          <Icon icon={bxRefresh} onClick={refreshClickHandle} width="2em" height="2em" />
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setQueryItemsStart: (type, query) => dispatch(setQueryItemsStart(type, query)),
  refreshInventory: type => dispatch(refreshInventory(type)),
})

const mapStateToProps = createStructuredSelector({
  botSearchingQuery: selectBotSearchingQuery,
  userSearchingQuery: selectUserSearchingQuery,
})

export default connect(mapStateToProps, mapDispatchToProps)(SteamInventoryToolbar);