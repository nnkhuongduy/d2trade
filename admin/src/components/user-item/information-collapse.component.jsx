import React, { useMemo } from 'react'
import moment from 'moment-timezone'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, List, ListItem, ListItemText, Link, Collapse, Typography, TableRow, TableCell
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  marginBot: {
    marginBottom: theme.spacing(2)
  }
}))

const InformationCollapse = ({ user, open }) => {
  const classes = useStyles()

  const infos1 = useMemo(() => ([
    { label: 'Tên tài khoản', value: user.personaname },
    { label: 'Steam ID', value: user.steamid },
    { label: 'Steam Profile', value: user.profileurl, isLink: true, link: user.profileurl },
    { label: 'Số dư tài khoản', value: user.accountBalance },
  ]), [user])

  const infos2 = useMemo(() => ([
    { label: 'Lần đăng nhập mới nhất', value: user.lastLogin, isDate: true },
    { label: 'Lần đăng nhập đầu tiên', value: user.createdDate, isDate: true },
  ]), [user])


  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
        <Collapse in={open} className={clsx({ [classes.marginBot]: open })}>
          <Typography variant='h6' gutterBottom component='div'>Thông tin:</Typography>
          <Grid container>
            <Grid item sm={6}>
              <Grid container>
                <Grid item>
                  <List disablePadding dense>
                    {infos1.map(({ label }, index) => (
                      <ListItem key={index}>
                        <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{label} :</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item>
                  <List disablePadding dense>
                    {infos1.map(({ value, isLink, link, isDate }, index) => (
                      <ListItem key={index}>
                        <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                          {isLink && <Link href={link} target='_blank' rel='noopener'>{value}</Link>}
                          {isDate && moment(value).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm:ss A')}
                          {!isLink && !isDate && value}
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <Grid container>
                <Grid item>
                  <List disablePadding dense>
                    {infos2.map(({ label }, index) => (
                      <ListItem key={index}>
                        <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{label} :</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item>
                  <List disablePadding dense>
                    {infos2.map(({ value, isLink, link, isDate }, index) => (
                      <ListItem key={index}>
                        <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                          {isLink && <Link href={link} target='_blank' rel='noopener'>{value}</Link>}
                          {isDate && moment(value).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY hh:mm:ss A')}
                          {!isLink && !isDate && value}
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default InformationCollapse