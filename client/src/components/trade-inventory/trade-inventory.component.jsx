import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as RollingSVG } from '../../assets/svg/rolling.svg';
import { Icon } from '@iconify/react';
import arrowDown from '@iconify/icons-fa-solid/arrow-down';


import InventorySlot from '../inventory-slot/inventory-slot.component';

import { updateBotRenderedInventory, updateUserRenderedInventory } from '../../redux/inventory/inventory.actions';

import { selectBotTempItem, selectUserTempItem } from '../../redux/temp-item/temp-item.selectors';
import { selectBotInventory, selectUserInventory, selectBotRenderedInventory, selectUserRenderedInventory } from '../../redux/inventory/inventory.selectors';

import './trade-inventory.component.scss';

const TradeInventory = ({ mode, type,
  botInventory, userInventory,
  botRenderedInventory, userRenderedInventory,
  botTempItem, userTempItem,
  updateBotRenderedInventory, updateUserRenderedInventory }) => {

  const scrollRef = useRef(null);

  const onScollHandle = () => {
    if (mode === "steam") {
      const element = scrollRef.current;
      const maxScroll = element.scrollHeight - element.clientHeight;
      const currentScroll = element.scrollTop;
      const percentScroll = currentScroll / maxScroll * 100;
      if (percentScroll === 100) {
        if (type === "bot" && botRenderedInventory.length < botInventory.length) {
          updateBotRenderedInventory();
        }
        if (type === "user" && userRenderedInventory.length < userInventory.length) {
          updateUserRenderedInventory();
        }
      }
    }
  }

  return (
    <div ref={scrollRef} onScroll={onScollHandle} className={`trade-inventory ${mode}`} >
      <div className={`inventory-container ${mode} ${type}`}>
        {(!botInventory && type === "bot" && mode === "steam") && <RollingSVG />}
        {(!userInventory && type === "user" && mode === "steam") && <RollingSVG />}

        {(botRenderedInventory.length !== 0 && type === "bot" && mode === "steam") && botRenderedInventory.map(item => (
          <InventorySlot key={item.item.id} item={item.item} mode={mode} type={type}></InventorySlot>
        ))}
        {(userRenderedInventory.length !== 0 && type === "user" && mode === "steam") && userRenderedInventory.map(item => (
          <InventorySlot key={item.item.id} item={item.item} mode={mode} type={type}></InventorySlot>
        ))}

        {(botTempItem && type === "bot" && mode === "bot") && botTempItem.map(item => (
          <InventorySlot key={item.item.id} item={item.item} mode={type} type={type}></InventorySlot>
        ))}
        {(userTempItem && type === "user" && mode === "user") && userTempItem.map(item => (
          <InventorySlot key={item.item.id} item={item.item} mode={type} type={type}></InventorySlot>
        ))}

        {(botRenderedInventory.length !== 0 && botRenderedInventory.length < botInventory.length && mode === "steam" && type === "bot") &&
          <Icon icon={arrowDown} width="2rem" />}
        {(userRenderedInventory.length !== 0 && userRenderedInventory.length < userInventory.length && mode === "steam" && type === "user") &&
          <Icon icon={arrowDown} width="2rem" />}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  updateBotRenderedInventory: () => dispatch(updateBotRenderedInventory()),
  updateUserRenderedInventory: () => dispatch(updateUserRenderedInventory())
})

const mapStateToProps = createStructuredSelector({
  botInventory: selectBotInventory,
  userInventory: selectUserInventory,
  botRenderedInventory: selectBotRenderedInventory,
  userRenderedInventory: selectUserRenderedInventory,
  botTempItem: selectBotTempItem,
  userTempItem: selectUserTempItem,
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeInventory);