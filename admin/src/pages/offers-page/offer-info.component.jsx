import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Box, Grid, Typography, Divider, CircularProgress, Link
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
  const [infos, setInfos] = useState([
    {
      label: 'Offer ID',
      content: ''
    },
    {
      label: 'Người dùng',
      content: '',
    },
    {
      label: 'Số dư đã sử dụng',
      content: ''
    },
    {
      label: 'Ngày thực hiện',
      content: ''
    },
    {
      label: 'Trạng thái',
      content: ''
    },
  ])

  useEffect(() => {
    if (!users)
      fetchUsers()
  }, [])

  useEffect(() => {
    if (users && offer) {
      const newInfos = [...infos]
      const newUser = users.find(user => user.steamid === offer.steam_id)
      const newColor = offer.status === 'Accepted' ? 'success' :
        offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" ? 'warning' : 'error'

      newInfos[0].content = <span className={offer.offer_id === 'UNSET' ? classes.error : undefined}>{offer.offer_id}</span>
      newInfos[1].content = <Link href={`/users/${newUser.steamid}`} target="_blank" rel="noopener">{newUser.personaname}</Link>
      newInfos[2].content = offer.user_balance.toLocaleString('en-US')
      newInfos[3].content = moment(offer.date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm A')
      newInfos[4].content = <span className={classes[newColor]}>{offer.status}</span>

      setInfos(newInfos)
      setUser(newUser)
      setColor(newColor)
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
                    <Grid container direction='column' alignItems='center' spacing={1}>
                      <Grid item>
                        <Typography style={{ textAlign: 'center' }}>Người dùng</Typography>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={1}>
                          {offer.user_items
                            .map(item => (
                              <Grid key={item.assetId} item>
                                <ItemImg src={item.iconUrl} perc={20} />
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography style={{ textAlign: 'center' }} variant='body2'>
                          Tổng: {offer.userTotalPrice.toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2} style={{ alignSelf: 'center' }}>
                    <SwapHoriz style={{ display: 'block', margin: '0 auto' }} />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Grid container direction='column' alignItems='center' spacing={1}>
                      <Grid item>
                        <Typography style={{ textAlign: 'center' }}>Bot</Typography>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={1}>
                          {offer.bot_items
                            .map(item => (
                              <Grid key={item.assetId} item>
                                <ItemImg src={item.iconUrl} perc={20} />
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography style={{ textAlign: 'center' }} variant='body2'>
                          Tổng: {offer.botTotalPrice.toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ width: '100%', margin: '24px 0' }}>
                <Divider />
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Typography variant='h6' style={{ textAlign: 'center' }}>Thông tin</Typography>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                {infos.map((info, index) =>
                  <InfoContainer key={index} info={info} />
                )}
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