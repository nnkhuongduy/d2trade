import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles, useTheme } from '@material-ui/styles'
import {
  Grid, Button, Tabs, Tab, Paper, Typography, useMediaQuery
} from '@material-ui/core'
import { SwapVert } from '@material-ui/icons'

import { checkTradeUrl } from '../../helpers/helpers'

import Stash from '../../components/stash/stash.component'
import InventoryContainer from '../../components/inventory/inventory-container.component'

import { postOfferStart } from '../../redux/offer/offer.actions'
import { toggleConfirmation } from '../../redux/dialog/dialog.actions'

import { selectTradeable } from '../../redux/stash/stash.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

const useStyles = makeStyles(theme => ({
  button: {
    padding: `${theme.spacing(1)}px ${theme.spacing(8)}px`,
    fontSize: theme.typography.pxToRem(22)
  },
  icon: {
    width: 50,
    height: 50,
    opacity: 0.5
  },
  tab: {
    backgroundColor: theme.palette.grey[200],
    transition: theme.transitions.create('all',
      theme.transitions.duration.short,
      theme.transitions.easing.easeInOut
    )
  },
  tabSelected: {
    backgroundColor: 'unset',
    transition: theme.transitions.create('all',
      theme.transitions.duration.short,
      theme.transitions.easing.easeInOut
    )
  }
}))

const HomePage = ({ tradeable, user, postOffer, toggleConfirmation }) => {
  const classes = useStyles()
  const [tab, setTab] = useState(1)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  if (!matches)
    return (
      <Grid container spacing={3} style={{ height: '100%' }}>
        <Grid item xs={12} md={6}>
          <Grid container direction='column' spacing={3} alignItems='center'>
            <Grid item>
              <Button
                color='secondary'
                variant='contained'
                className={classes.button}
                disabled={!tradeable || (user && !checkTradeUrl(user.tradeOfferUrl))}
                onClick={() => toggleConfirmation('Bạn có chắc chắn muốn thực hiện phiên trade này?', () => postOffer())}
              >
                TRADE
            </Button>
            </Grid>
            {user && !checkTradeUrl(user.tradeOfferUrl) && <Grid item>
              <Typography variant='subtitle2' style={{ color: 'red' }}>Cần cập nhật link Trade Offer!</Typography>
            </Grid>}
            <Grid item style={{ width: '80%' }}>
              <Stash type='user' />
            </Grid>
            <Grid item>
              <SwapVert className={classes.icon} />
            </Grid>
            <Grid item style={{ width: '80%' }}>
              <Stash type='bot' />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ height: '100%' }}>
            <Grid container direction='column' style={{ height: '100%' }}>
              <Grid item>
                <Tabs
                  value={tab}
                  onChange={(e, v) => setTab(v)}
                  aria-label="inventory tab"
                  variant='fullWidth'
                  indicatorColor='primary'
                  textColor='primary'
                >
                  <Tab
                    label={user ? user.personaname : 'Người dùng'}
                    id='inventory-tab-0'
                    aria-controls='inventory-tabpanel-0'
                    classes={{ root: classes.tab, selected: classes.tabSelected }}
                  />
                  <Tab
                    label='Bot'
                    id='inventory-tab-1'
                    aria-controls='inventory-tabpanel-1'
                    classes={{ root: classes.tab, selected: classes.tabSelected }}
                  />
                </Tabs>
              </Grid>
              <Grid item style={{ flex: 1 }}>
                <InventoryContainer tab={tab} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  else return (
    <Grid container spacing={3} style={{ height: '100%' }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ height: '100%' }}>
          <Grid container direction='column' style={{ height: '100%' }}>
            <Grid item>
              <Tabs
                value={tab}
                onChange={(e, v) => setTab(v)}
                aria-label="inventory tab"
                variant='fullWidth'
                indicatorColor='primary'
                textColor='primary'
              >
                <Tab
                  label={user ? user.personaname : 'Người dùng'}
                  id='inventory-tab-0'
                  aria-controls='inventory-tabpanel-0'
                  classes={{ root: classes.tab, selected: classes.tabSelected }}
                />
                <Tab
                  label='Bot'
                  id='inventory-tab-1'
                  aria-controls='inventory-tabpanel-1'
                  classes={{ root: classes.tab, selected: classes.tabSelected }}
                />
              </Tabs>
            </Grid>
            <Grid item style={{ flex: 1 }}>
              <InventoryContainer tab={tab} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container direction='column' spacing={3} alignItems='center'>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              className={classes.button}
              disabled={!tradeable || (user && !checkTradeUrl(user.tradeOfferUrl))}
              onClick={() => postOffer()}
            >
              TRADE
            </Button>
          </Grid>
          {user && !checkTradeUrl(user.tradeOfferUrl) && <Grid item>
            <Typography variant='subtitle2' style={{ color: 'red' }}>Cần cập nhật link Trade Offer!</Typography>
          </Grid>}
          <Grid item style={{ width: '100%' }}>
            <Stash type='user' />
          </Grid>
          <Grid item>
            <SwapVert className={classes.icon} />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Stash type='bot' />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  postOffer: () => dispatch(postOfferStart()),
  toggleConfirmation: (text, func) => dispatch(toggleConfirmation(text, func))
})

const mapStateToProps = createStructuredSelector({
  tradeable: selectTradeable,
  user: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)