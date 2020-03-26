import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as RollingSVG } from '../../assets/svg/rolling.svg';
import { Icon } from '@iconify/react';
import arrowDown from '@iconify/icons-fa-solid/arrow-down';


import InventorySlot from '../inventory-slot/inventory-slot.component';

import { updateBotRenderedInventoryStart, updateUserRenderedInventoryStart } from '../../redux/inventory/inventory.actions';

import { selectBotTempItem, selectUserTempItem } from '../../redux/temp-item/temp-item.selectors';
import { selectBotInventory, selectUserInventory, selectBotRenderedInventory, selectUserRenderedInventory } from '../../redux/inventory/inventory.selectors';

import { selectBotSearchingState, selectUserSearchingState, selectBotQueryIds, selectUserQueryIds } from '../../redux/searching/searching.selectors';

import './trade-inventory.component.scss';

const TradeInventory = ({ mode, type,
  botInventory, userInventory,
  botRenderedInventory, userRenderedInventory,
  botTempItem, userTempItem,
  updateBotRenderedInventoryStart, updateUserRenderedInventoryStart,
  botSearchingState, userSearchingState,
  botQueryIds, userQueryIds
}) => {

  const scrollRef = useRef(null);

  useEffect(() => {
    if (mode === "steam" && type === "bot")
      scrollRef.current.scrollTop = 0;
  }, [botQueryIds])

  useEffect(() => {
    if (mode === "steam" && type === "user")
      scrollRef.current.scrollTop = 0;
  }, [userQueryIds])

  const onScollHandle = () => {
    if (mode === "steam") {
      const element = scrollRef.current;
      const maxScroll = element.scrollHeight - element.clientHeight;
      const currentScroll = element.scrollTop;
      const percentScroll = currentScroll / maxScroll * 100;
      if (percentScroll === 100) {
        if (type === "bot" && botRenderedInventory.length < botInventory.length) {
          updateBotRenderedInventoryStart();
        }
        if (type === "user" && userRenderedInventory.length < userInventory.length) {
          updateUserRenderedInventoryStart();
        }
      }
    }
  }

  const renderInventorySlot = (item) => (
    <InventorySlot key={item.item.id} item={item.item} mode={mode} type={type}></InventorySlot>
  )

  return (
    <div ref={scrollRef} onScroll={onScollHandle} className={`trade-inventory ${mode}`} >
      <div className={`inventory-container ${mode} ${type}`}>
        {(!botInventory && type === "bot" && mode === "steam") && <RollingSVG />}
        {(!userInventory && type === "user" && mode === "steam") && <RollingSVG />}

        {(botInventory && type === "bot" && mode === "steam") && botInventory.map(item => renderInventorySlot(item))}
        {(userInventory && type === "user" && mode === "steam") && userInventory.map(item => renderInventorySlot(item))}

        {(botTempItem && type === "bot" && mode === "bot") && botTempItem.map(item => renderInventorySlot(item))}
        {(userTempItem && type === "user" && mode === "user") && userTempItem.map(item => renderInventorySlot(item))}

        {(
          botRenderedInventory.length !== 0 &&
          botRenderedInventory.length < botInventory.length &&
          botSearchingState === false &&
          mode === "steam" && type === "bot") &&
          <Icon icon={arrowDown} width="2rem" />}
        {(
          userRenderedInventory.length !== 0 &&
          userRenderedInventory.length < userInventory.length &&
          userSearchingState === false &&
          mode === "steam" && type === "user") &&
          <Icon icon={arrowDown} width="2rem" />}

        {(
          botRenderedInventory.length !== 0 &&
          botRenderedInventory.length < botQueryIds.length &&
          botSearchingState === true &&
          mode === "steam" && type === "bot") &&
          <Icon icon={arrowDown} width="2rem" />}
        {(
          userRenderedInventory.length !== 0 &&
          userRenderedInventory.length < userQueryIds.length &&
          userSearchingState === true &&
          mode === "steam" && type === "user") &&
          <Icon icon={arrowDown} width="2rem" />}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  updateBotRenderedInventoryStart: () => dispatch(updateBotRenderedInventoryStart()),
  updateUserRenderedInventoryStart: () => dispatch(updateUserRenderedInventoryStart())
})

const mapStateToProps = createStructuredSelector({
  botInventory: selectBotInventory,
  userInventory: selectUserInventory,
  botRenderedInventory: selectBotRenderedInventory,
  userRenderedInventory: selectUserRenderedInventory,
  botTempItem: selectBotTempItem,
  userTempItem: selectUserTempItem,
  botSearchingState: selectBotSearchingState,
  userSearchingState: selectUserSearchingState,
  botQueryIds: selectBotQueryIds,
  userQueryIds: selectUserQueryIds
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeInventory);