import React, { useState } from 'react'

import {
  Grid, Paper, Typography,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core'
import {
  ExpandMore,
} from '@material-ui/icons'

import UserCard from '../user-card/user-card.component'
import InfoContainer from '../../info-container/info-container.component'

const UserProfile = ({ user }) => {
  const [infos] = useState([
    { label: 'Username', value: user.personaname },
    { label: 'Steam ID', value: user.steamid },
    { label: 'Steam Profile', value: user.profileurl, isLink: true },
    { label: 'Steam Trade URL', value: user.tradeOfferUrl, isLink: true },
    { label: 'Lần đăng nhập đầu tiên', value: user.createdDate, isDate: true },
    { label: 'Lần đăng nhập mới nhất', value: user.lastLogin, isDate: true },
    { label: 'Số dư tài khoản', value: user.accountBalance, isBalance: true },
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
            <Typography variant='body2'>UNDER CONSTRUCTION!</Typography>
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
            <Typography variant='body2'>UNDER CONSTRUCTION!</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>
  )
}
export default UserProfile