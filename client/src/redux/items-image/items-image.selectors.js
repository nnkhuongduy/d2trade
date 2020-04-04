import { createSelector } from 'reselect'

const selectItemsImageState = state => state.itemsImage;

export const selectBotItemsImage = createSelector([selectItemsImageState], state => state.bot)

export const selectUserItemsImage = createSelector([selectItemsImageState], state => state.user)

export const selectHeroesImage = createSelector([selectItemsImageState], state => state.hero)