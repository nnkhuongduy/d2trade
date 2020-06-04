import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect } from 'react-router-dom'
import moment from 'moment-timezone'

import {
  Grid, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, Link, Button
} from '@material-ui/core'
import {
  ExpandMore
} from '@material-ui/icons'

import { checkTradeUrl } from '../../helpers/helpers'

import UserPaper from '../../components/user/user-paper.component'
import InfoContainer from '../../components/info/info-container.component'
import OffersList from '../../components/offer/offer-list.component'

import { setUrlDialog } from '../../redux/offer/offer.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

const UserPage = ({ user, setDialog }) => {
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    if (user)
      setUserInfo([
        {
          label: 'Tên tài khoản',
          content: user.personaname
        },
        {
          label: 'Steam ID',
          content: user.steamid
        },
        {
          label: 'Steam Profile',
          content: <Link href={user.profileurl} target="_blank" rel="noopener">{user.profileurl}</Link>
        },
        {
          label: 'Trade Offer URL',
          content: checkTradeUrl(user.tradeOfferUrl) ? user.tradeOfferUrl.replace('https://steamcommunity.com/tradeoffer/new/', '') :
            <Button color='secondary' size='small' onClick={() => setDialog(true)}>Cập nhật</Button>
        },
        {
          label: 'Số dư',
          content: `${user.accountBalance.toLocaleString('en-US')} VND`
        },
        {
          label: 'Đăng nhập gần nhất',
          content: moment(user.lastLogin).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
        },
        {
          label: 'Đăng nhập lần đầu',
          content: moment(user.createdDate).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')
        },
      ])
    //eslint-disable-next-line
  }, [user])

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={5}>
        <UserPaper />
      </Grid>
      <Grid item xs={12} md={7}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-controls="info-content"
            id="info-header"
          >
            <Typography>Thông tin tài khoản</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction='column' spacing={1} wrap='nowrap'>
              {userInfo.map((info, index) =>
                <Grid item key={index}>
                  <InfoContainer info={info} />
                </Grid>
              )}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-controls="offer-content"
            id="offer-header"
          >
            <Typography>Lịch sử giao dịch</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ height: 500 }}>
            <OffersList />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  setDialog: state => dispatch(setUrlDialog(state))
})

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)