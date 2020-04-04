import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import bxRefresh from '@iconify/icons-bx/bx-refresh';
import cancelIcon from '@iconify/icons-topcoat/cancel';

import { selectBotSearchingQuery, selectUserSearchingQuery } from '../../redux/searching/searching.selectors'
import { selectBotFilteredHero, selectUserFilteredHero, selectBotFilteredState, selectUserFilteredState } from '../../redux/heroes/heroes.selectors'

import { setQueryItemsStart } from '../../redux/searching/searching.actions';
import { refreshInventory } from '../../redux/inventory/inventory.actions'
import { filterHeroesStart } from '../../redux/heroes/heroes.actions'

import './steam-inventory-toolbar.component.scss';

const SteamInventoryToolbar = ({
  type,
  botSearchingQuery, userSearchingQuery,
  setQueryItemsStart,
  refreshInventory,
  botFilteredHero, userFilteredHero,
  botFilteredState, userFilteredState,
  filterHeroesStart
}) => {
  const [filteredState, setFilteredState] = useState();
  const [filteredHero, setFilteredHero] = useState();

  useEffect(() => {
    setFilteredState(type === "bot" ? botFilteredState : userFilteredState)
  }, [botFilteredState, userFilteredState])

  useEffect(() => {
    setFilteredHero(type === "bot" ? botFilteredHero : userFilteredHero)
  }, [botFilteredHero, userFilteredHero])

  const inputChangeHandle = (e) => {
    const value = e.target.value;
    setQueryItemsStart(type, value);
  }

  const refreshClickHandle = () => {
    refreshInventory(type);
  }

  const filteredHeroClickHandle = () => {
    filterHeroesStart(type, filteredHero.localized_name)
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
        {(filteredState && filteredHero) && <img src={filteredHero.portrait_url} />}
        <Icon icon={cancelIcon} color="#000000" style={{}} color={"#fff"} />
      </div>
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
  filterHeroesStart: (heroName, filterType) => dispatch(filterHeroesStart(heroName, filterType))
})

const mapStateToProps = createStructuredSelector({
  botSearchingQuery: selectBotSearchingQuery,
  userSearchingQuery: selectUserSearchingQuery,
  botFilteredHero: selectBotFilteredHero,
  userFilteredHero: selectUserFilteredHero,
  botFilteredState: selectBotFilteredState,
  userFilteredState: selectUserFilteredState
})

export default connect(mapStateToProps, mapDispatchToProps)(SteamInventoryToolbar);