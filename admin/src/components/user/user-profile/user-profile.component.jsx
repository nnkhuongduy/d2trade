import React, { useState } from 'react'
import moment from 'moment-timezone'

import {
  Grid, Paper, Typography, Link,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from '@material-ui/core'
import {
  ExpandMore,
} from '@material-ui/icons'

import UserCard from '../user-card/user-card.component'
import InfoContainer from '../../info-container/info-container.component'
import OffersContainer from '../../offers/offers-container.component'
import ReceiptsContainer from '../../receipts/receipts-container.component'

const UserProfile = ({ user }) => {
  const [infos] = useState([
    { label: 'Username', content: user.personaname },
    { label: 'Steam ID', content: user.steamid },
    { label: 'Steam Profile', content: <Link href={user.profileurl} target="_blank" rel="noopener">{user.profileurl}</Link> },
    {
      label: 'Steam Trade URL',
      content: user.tradeOfferUrl.replace('https://steamcommunity.com/tradeoffer/new/', '')
    },
    { label: 'Lần đăng nhập đầu tiên', content: moment(user.createdDate).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm:ss A') },
    { label: 'Lần đăng nhập mới nhất', content: moment(user.lastLogin).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm:ss A') },
    { label: 'Số dư tài khoản', content: `${user.accountBalance.toLocaleString('en-US')} VND` },
  ])

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3}>
          <UserCard user={user} elevation={3} size='medium' />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-controls='user-info-panel-content'
            id='user-info-panel-header'
          >
            <Typography>Thông tin người dùng</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ width: '100%' }}>
              {infos.map((info, index) => (
                <InfoContainer key={index} info={info} />
              ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-controls='user-offers-panel-content'
            id='user-offers-panel-header'
          >
            <Typography>Lịch sử offers</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <OffersContainer filter={{
              searchQuery: user.steamid,
              date: {
                from: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                to: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                toPlus: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                active: false
              },
              status: 'All'
            }} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-controls='user-offers-panel-content'
            id='user-offers-panel-header'
          >
            <Typography>Lịch sử biến động số dư</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ReceiptsContainer filter={{ steamId: user.steamid }} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>
  )
}
export default UserProfile