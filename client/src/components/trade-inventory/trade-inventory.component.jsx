import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as RollingSVG } from '../../assets/svg/rolling.svg';
import { Icon } from '@iconify/react';
import arrowDown from '@iconify/icons-fa-solid/arrow-down';

import InventorySlot from '../inventory-slot/inventory-slot.component';

import { updateRenderedInventoryStart } from '../../redux/inventory/inventory.actions';

import { selectBotTempItem, selectUserTempItem } from '../../redux/temp-item/temp-item.selectors';
import { selectBotInventory, selectUserInventory, selectBotRenderedInventory, selectUserRenderedInventory, selectInventoryState } from '../../redux/inventory/inventory.selectors';
import { selectBotQueryIds, selectUserQueryIds } from '../../redux/searching/searching.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors'

import './trade-inventory.component.scss';

const TradeInventory = ({ mode, type, inventoryState,
  botInventory, userInventory,
  botRenderedInventory, userRenderedInventory,
  botTempItem, userTempItem,
  updateRenderedInventoryStart,
  botQueryIds, userQueryIds,
  currentUser
}) => {

  const scrollRef = useRef(null);

  useEffect(() => {
    if (mode === "steam" && type === "bot")
      scrollRef.current.scrollTop = 0;
  }, [botQueryIds, mode, type, scrollRef])

  useEffect(() => {
    if (mode === "steam" && type === "user")
      scrollRef.current.scrollTop = 0;
  }, [userQueryIds, mode, type, scrollRef])

  const onScollHandle = () => {
    if (mode === "steam") {
      const element = scrollRef.current;
      const maxScroll = element.scrollHeight - element.clientHeight;
      const currentScroll = element.scrollTop;
      const percentScroll = currentScroll / maxScroll * 100;
      if (percentScroll === 100) {
        if (type === "bot" && botRenderedInventory.length < botInventory.length) {
          updateRenderedInventoryStart("bot");
        }
        if (type === "user" && userRenderedInventory.length < userInventory.length) {
          updateRenderedInventoryStart("user");
        }
      }
    }
  }

  const renderInventorySlot = (item) => (
    <InventorySlot key={item.id} item={item} mode={mode} type={type}></InventorySlot>
  )

  return (
    <div ref={scrollRef} onScroll={onScollHandle} className={`trade-inventory ${mode}`} >
      <div className={`inventory-container ${mode} ${type}`}>
        {(mode === "steam" && inventoryState[type].isFetching) && <RollingSVG />}

        {(mode === "steam" && !inventoryState[type].isFetching && inventoryState[type].errorMessage !== undefined) &&
          <div className="error-message">There's an error loading the inventory. Please try again after a while</div>}

        {(mode === "steam" && inventoryState[type].inventory) && inventoryState[type].inventory.map(item => renderInventorySlot(item))}

        {(botTempItem && type === "bot" && mode === "bot") && botTempItem.map(item => renderInventorySlot(item))}
        {(userTempItem && type === "user" && mode === "user") && userTempItem.map(item => renderInventorySlot(item))}

        {(inventoryState[type].rendered.length !== 0 && inventoryState[type].rendered.length !== inventoryState[type].rendering.length && mode === "steam") &&
          <Icon icon={arrowDown} width="2rem" />}

      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  updateRenderedInventoryStart: type => dispatch(updateRenderedInventoryStart(type)),
})

const mapStateToProps = createStructuredSelector({
  inventoryState: selectInventoryState,
  botInventory: selectBotInventory,
  userInventory: selectUserInventory,
  botRenderedInventory: selectBotRenderedInventory,
  userRenderedInventory: selectUserRenderedInventory,
  botTempItem: selectBotTempItem,
  userTempItem: selectUserTempItem,
  botQueryIds: selectBotQueryIds,
  userQueryIds: selectUserQueryIds,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeInventory);