import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Box, Grid, Typography, Divider, CircularProgress
} from '@material-ui/core'
import {
  SwapHoriz
} from '@material-ui/icons'

import ItemImg from '../../components/item/item-img/item-img.component'
import InfoContainer from '../../components/info-container/info-container.component'

import { fetchUsersStart } from '../../redux/users/users.actions'

import { selectUsers, selectUsersFetching } from '../../redux/users/users.selectors'

const useStyles = makeStyles(theme => ({
  success: {
    color: theme.palette.success.dark
  },
  error: {
    color: theme.palette.error.main
  },
  warning: {
    color: theme.palette.warning.main
  }
}))

const OfferInfo = ({ offer, users, fetching, fetchUsers }) => {
  const classes = useStyles()

  const [user, setUser] = useState(null)
  const [color, setColor] = useState(null)

  useEffect(() => {
    if (!users)
      fetchUsers()
  }, [])

  useEffect(() => {
    if (users && offer) {
      setUser(users.find(user => user.steamid === offer.steam_id))
      setColor(offer.status === 'Accepted' ? 'success' :
        offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created" ? 'warning' : 'error'
      )
    }
  }, [offer])

  if (offer) return (
    <Paper elevation={3}>
      <Box p={3}>
        <Grid container spacing={2} direction='column' alignItems='center'>
          {fetching && <Grid item>
            <CircularProgress />
          </Grid>}
          {users &&
            <>
              <Grid item>
                <Typography variant='h6'>Nội dung</Typography>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Grid container spacing={1} justify='space-between'>
                  <Grid item xs={12} sm={5}>
                    <Typography style={{ textAlign: 'center' }} variant='body2'>Người dùng</Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography style={{ textAlign: 'center' }} variant='body2'>Bot</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} justify='space-between'>
                  <Grid item xs={12} sm={5}>
                    <Grid container spacing={1}>
                      {offer.user_items
                        .map(item => (
                          <Grid key={item.id} item>
                            <ItemImg src={item.icon_url} perc={30} money={item.id === 'moneyItem'} />
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                  <Grid item style={{ alignSelf: 'center' }}>
                    <SwapHoriz />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Grid container spacing={1}>
                      {offer.bot_items
                        .map(item => (
                          <Grid key={item.id} item>
                            <ItemImg src={item.icon_url} perc={30} />
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={1} justify='space-between'>
                  <Grid item xs={12} sm={5}>
                    <Typography style={{ textAlign: 'center' }} variant='body2'>
                      Tổng: {offer.userTotalPrice.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography style={{ textAlign: 'center' }} variant='body2'>
                      Tổng: {offer.botTotalPrice.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ width: '100%', margin: '24px 0' }}>
                <Divider />
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Typography variant='h6' style={{ textAlign: 'center' }}>Thông tin</Typography>
              </Grid>
              <Grid item style={{ width: '90%' }}>
                <InfoContainer
                  info={{
                    label: 'Offer ID',
                    value: offer.offer_id,
                  }}
                  dense
                />
              </Grid>
              <Grid item style={{ width: '90%' }}>
                <InfoContainer
                  info={{
                    label: 'Người dùng',
                    value: user && user.personaname,
                    link: user && `users/${user.steamid}`,
                    isLink: true
                  }}
                  dense
                />
              </Grid>
              <Grid item style={{ width: '90%' }}>
                <InfoContainer
                  info={{
                    label: 'Số dư đã sử dụng',
                    value: offer.user_balance,
                    isBalance: true
                  }}
                  dense
                />
              </Grid>
              <Grid item style={{ width: '90%' }}>
                <InfoContainer
                  info={{
                    label: 'Ngày thực hiện',
                    value: offer.date,
                    isDate: true
                  }}
                  dense
                />
              </Grid>
              <Grid item style={{ width: '90%' }}>
                <InfoContainer
                  info={{
                    label: 'Trạng thái',
                    value: offer.status,
                  }}
                  dense
                  classes={{ value: color && classes[color] }}
                />
              </Grid>
            </>}
        </Grid>
      </Box>
    </Paper>
  )
  else return (
    <>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersStart())
})

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  fetching: selectUsersFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(OfferInfo)