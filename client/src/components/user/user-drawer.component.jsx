import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/styles'
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Typography
} from '@material-ui/core'
import {
  Person, AccountBalanceWallet, LocalOffer, PowerSettingsNew, Link
} from '@material-ui/icons'

import { checkTradeUrl } from '../../helpers/helpers'

import UserInfo from '../info/user-info.component'

import { logOutStart } from '../../redux/user/user.actions'
import { setUrlDialog } from '../../redux/offer/offer.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    backgroundColor: theme.palette.grey[100],
    height: '100%',
  }
}))

const INITIAL_LIST = [
  {
    label: 'Thông tin tài khoản',
    Icon: Person,
    isLink: true,
    to: '/user'
  },
  {
    label: 'Lịch sử giao dịch',
    Icon: LocalOffer,
    isLink: true,
    to: '/user'
  },
  {
    label: 'Nạp tiền',
    Icon: AccountBalanceWallet,
    isLink: true,
    to: '/transaction'
  },
  {
    label: 'Đăng xuất',
    Icon: PowerSettingsNew,
    isLink: false
  },
]

const UserDrawer = ({ open, onClose, user, logOut, setUrlDialog }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [list, setList] = useState(null)

  useEffect(() => {
    if (user) {
      const newList = [...INITIAL_LIST]

      if (!checkTradeUrl(user.tradeOfferUrl)) {
        newList.splice(1, 0, {
          label: 'Cập nhật link trade offer',
          Icon: Link,
          handle: () => setUrlDialog(true)
        })
      }

      newList.find(menu => menu.label === 'Đăng xuất').handle = () => logOut()

      setList(newList)
    }
    //eslint-disable-next-line
  }, [user])

  const onClick = handle => () => {
    onClose()
    handle && handle()
  }

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <div className={classes.root}>
        <UserInfo user />
        <Typography style={{ marginTop: theme.spacing(2) }}>
          Số dư tài khoản: {user.accountBalance.toLocaleString('en-US')} VND
        </Typography>
        <Typography
          variant='body2'
          style={{
            color: checkTradeUrl(user.tradeOfferUrl) ? theme.palette.success.main : theme.palette.error.main
          }}
        >
          {checkTradeUrl(user.tradeOfferUrl) ? 'Đã cập nhật link trade offer' : 'Chưa cập nhật link trade offer'}
        </Typography>
        <List aria-label="user">
          {list && list.map(({ label, Icon, handle, isLink, to }, index) =>
            isLink ?
              <ListItem button onClick={onClick(handle && handle)} component={RouterLink} to={to} key={index}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
              :
              <ListItem key={index} button onClick={onClick(handle && handle)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
          )}
        </List>
      </div>
    </Drawer>
  )
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutStart()),
  setUrlDialog: state => dispatch(setUrlDialog(state))
})

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDrawer)