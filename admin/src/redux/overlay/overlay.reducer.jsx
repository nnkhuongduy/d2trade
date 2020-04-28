import { OverlayTypes } from './overlay.types'

const INITIAL_STATE = {
  overlayStack: [{
    data: {
      user: {
        accountBalance: 1000000,
        avatar: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/08/086da7454762a9ace5644521d08f4e74cf21267f_full.jpg",
        index: 1,
        personaname: "KhuongDuy",
        profileurl: "https://steamcommunity.com/id/hitorisatoh/",
        steamid: "76561198105770372",
        tradeOfferUrl: "https://steamcommunity.com/tradeoffer/new/?partner=145504644&token=DPqTGHAQ",
        __v: 0,
        _id: "5e997607dd74cd1634666862"
      }
    }, type: "SETTING_BALANCE", exec_code: "CONFIRMATION_SET_BALANCE"
  }]
  //overlayStack: []
}

const overlayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OverlayTypes.OVERLAY_PUSH:
      return {
        ...state,
        overlayStack: [...state.overlayStack, action.overlayObject]
      }

    case OverlayTypes.OVERLAY_POP_FINISH:
      return {
        ...state,
        overlayStack: action.stacks
      }

    case OverlayTypes.UPDATE_LAST_STACK_FINISH:
      return {
        ...state,
        overlayStack: action.stacks
      }


    default:
      return state
  }
}

export default overlayReducer