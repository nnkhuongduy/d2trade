import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import sortIcon from '@iconify/icons-dashicons/sort';
import bxRefresh from '@iconify/icons-bx/bx-refresh';
import cancelIcon from '@iconify/icons-topcoat/cancel';


import { selectBotSearchingQuery, selectUserSearchingQuery } from '../../redux/searching/searching.selectors';
import { selectFilteredHero, selectFilteredType } from '../../redux/heroes/heroes.selectors'

import { setBotSearchingQuery, setUserSearchingQuery } from '../../redux/searching/searching.actions';
import { refreshBotInventory, refreshUserInventory } from '../../redux/inventory/inventory.actions'
import { filterHeroesStart } from '../../redux/heroes/heroes.actions'

import './steam-inventory-toolbar.component.scss';

const SteamInventoryToolbar = ({
  type,
  botSearchingQuery, userSearchingQuery,
  setBotSearchingQuery, setUserSearchingQuery,
  refreshBotInventory, refreshUserInventory,
  filteredHero, filteredType,
  filterHeroesStart
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

  const filteredHeroClickHandle = () => {
    filterHeroesStart(filteredHero[type].localized_name, type)
  }

  return (
    <div className="steam-inven-toolbar">
      <div className="searchbar">
        <div>
          <Icon icon={magnifyIcon} width="1.5em" height="1.5em" />
        </div>
        <input type="text" value={type === "bot" ? botSearchingQuery : userSearchingQuery} onChange={inputChangeHandle} placeholder="Search" />
      </div>
      <div className="filtered-hero" onClick={filteredHeroClickHandle}>
        {filteredType[type] && filteredHero[type] && <img src={filteredHero[type].portrait_url} />}
        <Icon icon={cancelIcon} color="#000000" style={{}} color={"#fff"} />
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
  filterHeroesStart: (heroName, filterType) => dispatch(filterHeroesStart(heroName, filterType))
})

const mapStateToProps = createStructuredSelector({
  botSearchingQuery: selectBotSearchingQuery,
  userSearchingQuery: selectUserSearchingQuery,
  filteredHero: selectFilteredHero,
  filteredType: selectFilteredType
})

export default connect(mapStateToProps, mapDispatchToProps)(SteamInventoryToolbar);