import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Paper, Grid, Typography, Divider
} from '@material-ui/core'
import {
  SwapHoriz
} from '@material-ui/icons'

import ItemImg from '../item/item-img.component'
import InfoContainer from '../info/info-container.component'

import { selectOffers } from '../../redux/user/user.selectors'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  red: {
    color: theme.palette.error.main
  },
  yellow: {
    color: theme.palette.warning.main
  },
  green: {
    color: theme.palette.success.dark
  },
}))

const Offer = ({ id, offers }) => {
  const classes = useStyles()
  const [offer, setOffer] = useState(null)

  useEffect(() => {
    const offer = offers.find(offer => offer.offer_id === id)

    if (offer)
      setOffer({
        ...offer,
        userTotal: offer.user_items.reduce((accumulator, item) => accumulator += item.prices.vnd, 0),
        botTotal: offer.bot_items.reduce((accumulator, item) => accumulator += item.prices.vnd, 0),
      })
  }, [id])

  if (offer)
    return (
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={2} direction='column' alignItems='center'>
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
                      <Grid key={item.assetId} item>
                        <ItemImg src={item.iconUrl} perc={30} />
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
                      <Grid key={item.assetId} item>
                        <ItemImg src={item.iconUrl} perc={30} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={1} justify='space-between'>
              <Grid item xs={12} sm={5}>
                <Typography style={{ textAlign: 'center' }} variant='body2'>
                  Tổng: {offer.userTotal.toLocaleString('en-US')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography style={{ textAlign: 'center' }} variant='body2'>
                  Tổng: {offer.botTotal.toLocaleString('en-US')}
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
                content: offer.offer_id,
              }}
            />
          </Grid>
          <Grid item style={{ width: '90%' }}>
            <InfoContainer
              info={{
                label: 'Số dư đã sử dụng',
                content: offer.user_balance.toLocaleString('en-US'),
              }}
            />
          </Grid>
          <Grid item style={{ width: '90%' }}>
            <InfoContainer
              info={{
                label: 'Ngày thực hiện',
                content: moment(offer.date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY'),
              }}
            />
          </Grid>
          <Grid item style={{ width: '90%' }}>
            <InfoContainer
              info={{
                label: 'Trạng thái',
                content: <span className={clsx({
                  [classes.green]: offer.status === 'Accepted',
                  [classes.yellow]: offer.status === "Active" || offer.status === "CreatedNeedsConfirmation" || offer.status === "Created",
                  [classes.red]: offer.status !== 'Accepted' && offer.status !== "Active" && offer.status !== "CreatedNeedsConfirmation" && offer.status !== "Created"
                })}>{offer.status}</span>,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    )
  else return (
    <>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  offers: selectOffers,
})

export default connect(mapStateToProps)(Offer)