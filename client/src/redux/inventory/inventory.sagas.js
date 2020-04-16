import { takeLatest, takeEvery, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { InventoryActionTypes } from './inventory.types';

import {
  fetchInventoryStart, fetchInventorySuccess, fetchInventoryFailure,
  updateRenderedInventory, updateRenderedInventoryStart,
  setRenderingInventory
} from './inventory.actions';
import { refreshQuery } from '../searching/searching.actions'
import { resetHeroFilter } from '../heroes/heroes.actions'
import { resetPriceFilter } from '../price-filter/price-filter.actions'
import { setItemsImage } from '../items-image/items-image.actions'
import { resetRarityFilter } from '../rarity-filter/rarity-filter.actions'

import { selectBotQueryIds, selectUserQueryIds, selectBotSearchingState, selectUserSearchingState } from '../searching/searching.selectors'
import { selectBotInventory, selectUserInventory, selectBotRenderedInventory, selectUserRenderedInventory, selectBotRenderingInventory, selectUserRenderingInventory } from './inventory.selectors'
import { selectBotFilteredState, selectUserFilteredState, selectBotFilteredItems, selectUserFilteredItems } from '../heroes/heroes.selectors'
import { selectBotPriceFilteredState, selectUserPriceFilteredState, selectBotPriceFilteredIds, selectUserPriceFilteredIds } from '../price-filter/price-filter.selectors'
import { selectCurrentUser } from '../user/user.selectors'
import { selectBotItemsImage, selectUserItemsImage } from '../items-image/items-image.selectors'
import { selectBotRarityFilteredIds, selectBotRarityFilteredState, selectUserRarityFilteredIds, selectUserRarityFilteredState } from '../rarity-filter/rarity-filter.selectors'

export function* fetchInventoryAsync({ type, inventoryType }) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const itemsImage = yield inventoryType === "bot" ? select(selectBotItemsImage) : select(selectUserItemsImage)
    const miniInventory = [];
    const imgObj = {};
    const userSteamId = currentUser && currentUser.steamid;
    const result = yield inventoryType === "bot" ? axios('/inventory/bot') : (userSteamId && axios(`/inventory/${userSteamId}`));

    if (result.status === 200) {
      const inventory = yield result.data;

      yield inventory.forEach(item => {
        miniInventory.push(item.id)

        if (!itemsImage || !itemsImage[item.id]) {
          const itemImg = new Image();
          itemImg.src = item.id !== 'moneyItem' ? `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}` : item.icon_url
          itemImg.alt = 'item_image'
          itemImg.className = 'item-img'

          imgObj[item.id] = itemImg;
        }
      })

      yield put(setItemsImage(inventoryType, imgObj))
      yield put(fetchInventorySuccess(inventoryType, inventory));
      yield put(setRenderingInventory(inventoryType, miniInventory));
      yield put(updateRenderedInventoryStart(inventoryType));
    } else {
      yield put(fetchInventoryFailure(inventoryType, result.statusMessage));
    }

  } catch (error) {
    yield put(fetchInventoryFailure(inventoryType, error.message));
  }
}

export function* updateRenderedInventoryAsync({ type, inventoryType }) {
  const renderingInventory = yield inventoryType === "bot" ? select(selectBotRenderingInventory) : select(selectUserRenderingInventory);
  const renderedInventory = yield inventoryType === "bot" ? select(selectBotRenderedInventory) : select(selectUserRenderedInventory);

  const updateArray = yield renderingInventory.slice(0, renderedInventory.length + InventoryActionTypes.RENDERED_INVENTORY_UPDATE_INTERVAL);

  yield updateArray.length !== renderedInventory.length && put(updateRenderedInventory(inventoryType, updateArray));
}

export function* setRenderingInventoryAsync({ inventoryType, ...action }) {
  const isSearching = yield inventoryType === "bot" ? select(selectBotSearchingState) : select(selectUserSearchingState);
  const isHeroFiltering = yield inventoryType === "bot" ? select(selectBotFilteredState) : select(selectUserFilteredState);
  const isPriceFiltering = yield inventoryType === "bot" ? select(selectBotPriceFilteredState) : select(selectUserPriceFilteredState);
  const isRarityFiltering = yield inventoryType === "bot" ? select(selectBotRarityFilteredState) : select(selectUserRarityFilteredState);
  const inventory = yield inventoryType === "bot" ? select(selectBotInventory) : select(selectUserInventory);

  const renderInventory = [];
  const inventoryArr = [];
  let renderObj = {};
  let inventoryCount = 0;

  if (isSearching) {
    const searchInventory = yield inventoryType === "bot" ? select(selectBotQueryIds) : select(selectUserQueryIds);

    yield inventoryArr.push(searchInventory);
    yield inventoryCount++;
  }
  if (isHeroFiltering) {
    const filterHeroInventory = yield inventoryType === "bot" ? select(selectBotFilteredItems) : select(selectUserFilteredItems);

    yield inventoryArr.push(filterHeroInventory);
    yield inventoryCount++;
  }
  if (isPriceFiltering) {
    const filterPriceInventory = yield inventoryType === "bot" ? select(selectBotPriceFilteredIds) : select(selectUserPriceFilteredIds);

    yield inventoryArr.push(filterPriceInventory);
    yield inventoryCount++;
  }
  if (isRarityFiltering) {
    const filterRarityInventory = yield inventoryType === "bot" ? select(selectBotRarityFilteredIds) : select(selectUserRarityFilteredIds);

    yield inventoryArr.push(filterRarityInventory);
    yield inventoryCount++;
  }

  if (inventoryCount !== 0) {
    yield inventoryArr.forEach(inventory => inventory.forEach(id => renderObj[id] ? renderObj[id]++ : renderObj[id] = 1));

    const idArray = yield Object.keys(renderObj);

    yield idArray.forEach(id => {
      if (renderObj[id] === inventoryCount) renderInventory.push(id);
    })
  } else {
    yield inventory.forEach(item => renderInventory.push(item.id));
  }

  if ((isSearching || isHeroFiltering || isPriceFiltering || isRarityFiltering) && renderInventory[0] !== 'moneyItem' && inventoryType === 'user') {
    renderInventory.unshift(inventory[0].id);
  }

  yield put(setRenderingInventory(inventoryType, renderInventory));
  yield put(updateRenderedInventoryStart(inventoryType));
}

export function* refreshInventoryAsync({ inventoryType, ...action }) {
  yield put(refreshQuery(inventoryType));
  yield put(resetHeroFilter(inventoryType))
  yield put(fetchInventoryStart(inventoryType));
  yield put(resetPriceFilter(inventoryType));
  yield put(resetRarityFilter(inventoryType))
}

export function* fetchInventoryStarting() {
  yield takeEvery(InventoryActionTypes.FETCH_INVENTORY_START, fetchInventoryAsync)
}

export function* updateRenderedInventoryStarting() {
  yield takeEvery(InventoryActionTypes.UPDATE_RENDERED_INVENTORY_START, updateRenderedInventoryAsync)
}

export function* setRenderingInventoryStart() {
  yield takeEvery(InventoryActionTypes.SET_RENDERING_INVENTORY_START, setRenderingInventoryAsync)
}

export function* refreshInventoryStart() {
  yield takeLatest(InventoryActionTypes.REFRESH_INVENTORY_START, refreshInventoryAsync)
}
