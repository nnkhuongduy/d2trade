import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import sortIcon from '@iconify/icons-dashicons/sort';
import bxRefresh from '@iconify/icons-bx/bx-refresh';

import { selectBotSearchingQuery, selectUserSearchingQuery } from '../../redux/searching/searching.selectors';

import { setBotSearchingQuery, setUserSearchingQuery } from '../../redux/searching/searching.actions';
import { refreshBotInventory, refreshUserInventory } from '../../redux/inventory/inventory.actions'

import './steam-inventory-toolbar.component.scss';

const SteamInventoryToolbar = ({
  type,
  botSearchingQuery, userSearchingQuery,
  setBotSearchingQuery, setUserSearchingQuery,
  refreshBotInventory, refreshUserInventory,
}) => {

  const inputChangeHandle = (e) => {
    const value = e.target.value;
    if (type === "bot")
      setBotSearchingQuery(value)
    else setUserSearchingQuery(value)
  }

  const refreshClickHandle = () => {
    if (type === "bot") {
      refreshBotInventory();
    } else {
      refreshUserInventory();
    }
  }

  return (
    <div className="steam-inven-toolbar">
      <div className="searchbar">
        <div>
          <Icon icon={magnifyIcon} width="1.5em" height="1.5em" />
        </div>
        <input type="text" value={type === "bot" ? botSearchingQuery : userSearchingQuery} onChange={inputChangeHandle} placeholder="Search" />
      </div>
      <div className="tool-section">
        <div>
          <Icon icon={sortIcon} width="3em" height="3em" />
        </div>
        <div>
          <Icon icon={bxRefresh} onClick={refreshClickHandle} width="3em" height="3em" />
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setBotSearchingQuery: query => dispatch(setBotSearchingQuery(query)),
  setUserSearchingQuery: query => dispatch(setUserSearchingQuery(query)),
  refreshBotInventory: () => dispatch(refreshBotInventory()),
  refreshUserInventory: () => dispatch(refreshUserInventory()),
})

const mapStateToProps = createStructuredSelector({
  botSearchingQuery: selectBotSearchingQuery,
  userSearchingQuery: selectUserSearchingQuery
})

export default connect(mapStateToProps, mapDispatchToProps)(SteamInventoryToolbar);