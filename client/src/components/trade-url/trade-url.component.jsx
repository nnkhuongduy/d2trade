import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ReactLoading from 'react-loading';

import { editUserInfo, editUserInfoFinish } from '../../redux/user/user.actions'

import { selectCurrentUser, selectUserEditingState } from '../../redux/user/user.selectors'

import './trade-url.component.scss'

const TradeUrl = ({ currentUser, editUserInfo, userEditingState, editUserInfoFinish }) => {
  const [tradeOfferUrlState, setTradeOfferUrlState] = useState(false);
  const [tradeOfferUrlInputState, setTradeOfferUrlInputState] = useState(false);
  const [placeholderState, setPlaceholderState] = useState(false);
  const [inputPlaceholderState, setInputPlaceholderState] = useState(false);
  const [inputState, setInputState] = useState('');
  const [notifyState, setNotifyState] = useState(false);

  useEffect(() => {
    if (userEditingState !== undefined) {
      setInputState('input-success');

    }
  }, [userEditingState])

  const resetStates = () => {
    setTradeOfferUrlInputState(false);
    setTradeOfferUrlState(false);
    setPlaceholderState(false);
    setInputPlaceholderState(false);
    setInputState('');
    editUserInfoFinish(null, undefined);
    setNotifyState(false)
  }

  const checkValidTradeUrl = e => {
    const tradeUrl = e.target.value;

    setInputPlaceholderState(tradeUrl !== "" ? true : false);

    if (tradeUrl.includes("https://steamcommunity.com/tradeoffer/new/?partner=") && tradeUrl.includes("&token=")) {
      const infoObj = {
        tradeOfferUrl: tradeUrl
      }

      setInputState('input-lock');
      setTradeOfferUrlState(false);

      editUserInfo(infoObj)
    }
  }

  return (
    <div className="steam-trade-url" >
      {tradeOfferUrlInputState &&
        <>
          <input
            className={`steam-trade-url-input ${inputState}`}
            onChange={checkValidTradeUrl}
            onFocus={() => inputPlaceholderState === false && setPlaceholderState(true)}
            onBlur={() => inputPlaceholderState === false && setPlaceholderState(false)}
            onAnimationEnd={() => inputState === 'input-success' && setNotifyState(true)}
            disabled={inputState !== '' && 'disabled'} />
          <p className={`steam-trade-url-input-placeholder ${placeholderState ? 'animation' : ''}`}>
            {currentUser.tradeOfferUrl === "" ? "PASTE YOUR TRADE URL HERE" : currentUser.tradeOfferUrl}
          </p>
          {inputState === 'input-lock' && <ReactLoading type={'bubbles'} className={'input-bubbles'} />}
          {notifyState &&
            <p
              className={`notify-string`}
              style={{ border: `2px solid ${userEditingState === true ? '#18a11d' : '#f03030'}`, color: `${userEditingState === true ? '#33f030' : '#f03030'}` }}
              onAnimationEnd={resetStates}
            >
              {userEditingState === true ? "SUCCESSFULLY UPDATE YOUR TRADE URL!" : "FAILED TO UPDATE YOUR TRADE URL!"}
            </p>
          }
        </>
      }
      {!tradeOfferUrlInputState &&
        <span className={tradeOfferUrlState ? 'span-animation' : ''} onClick={() => setTradeOfferUrlState(true)} onAnimationEnd={() => setTradeOfferUrlInputState(true)}>
          Change Steam Trade URL
        </span>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  editUserInfo: infoObj => dispatch(editUserInfo(infoObj)),
  editUserInfoFinish: (infoObj, state) => dispatch(editUserInfoFinish(infoObj, state))
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userEditingState: selectUserEditingState
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeUrl)