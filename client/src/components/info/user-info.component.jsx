import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles, useTheme } from '@material-ui/styles'
import {
  Grid, Avatar, Typography, Badge, useMediaQuery
} from '@material-ui/core'
import {
  CheckCircle
} from '@material-ui/icons'

import { checkTradeUrl } from '../../helpers/helpers'

import { selectCurrentUser } from '../../redux/user/user.selectors'

const useStyles = makeStyles(theme => ({
  hoverable: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  check: {
    width: 15,
    height: 15,
    color: theme.palette.success.main,
    backgroundColor: 'white',
    borderRadius: '100%'
  }
}))

const UserInfo = ({ user, currentUser, onClick, header }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  if (currentUser && user)
    return (
      <Grid container spacing={2} alignItems='center' className={onClick && classes.hoverable} onClick={onClick && onClick}>
        <Grid item>
          {checkTradeUrl(currentUser.tradeOfferUrl) ?
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={<CheckCircle className={classes.check} />}
            >
              <Avatar src={currentUser.avatar} />
            </Badge>
            : <Avatar src={currentUser.avatar} />}
        </Grid>
        <Grid item>
          {(!matches || !header) && <Typography variant='body1'>{currentUser.personaname}</Typography>}
        </Grid>
      </Grid>
    )
  else return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item>
        <Avatar src={''} />
      </Grid>
      <Grid item>
        <Typography variant='body1'>{!user ? "D2Trade's Bot" : 'Người dùng'}</Typography>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(UserInfo)