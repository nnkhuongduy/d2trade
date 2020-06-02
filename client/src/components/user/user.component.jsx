import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Typography, Box
} from '@material-ui/core'

import UserDrawer from './user-drawer.component'
import UserInfo from '../info/user-info.component'

import { selectCurrentUser } from '../../redux/user/user.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  box: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: theme.shape.borderRadius
  },
  hoverable: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const User = ({ user }) => {
  const classes = useStyles()
  const [drawer, setDrawer] = useState(false)

  const onSteamClick = () => {
    window.open('http://localhost:5000/auth/steam', '_self');
  }

  const onProfileClick = () => {
    setDrawer(true)
  }

  if (user)
    return (
      <>
        <Grid container spacing={2} alignItems='center' justify='flex-end'>
          <Grid item>
            <Box p={1} className={classes.box}>
              <Typography>{user.accountBalance.toLocaleString('en-US')} VND</Typography>
            </Box>
          </Grid>
          <Grid item>
            <UserInfo user onClick={onProfileClick} />
          </Grid>
        </Grid>
        <UserDrawer open={drawer} onClose={() => setDrawer(false)} />
      </>
    )
  else return (
    <img
      src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
      alt={'Steam log in'}
      onClick={onSteamClick}
      className={classes.root}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

export default connect(mapStateToProps)(User)