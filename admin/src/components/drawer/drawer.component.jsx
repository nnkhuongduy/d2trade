import React, { useState, useCallback, Fragment } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  Drawer, Toolbar, Typography, Divider,
  List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'
import {
  Person as PersonIcon,
  Build as BuildIcon,
  LocalOffer as LocalOfferIcon,
  Style as StyleIcon
} from '@material-ui/icons'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflow: 'hidden',
    width: theme.spacing(7) + 1,
  },
  paper: {
    overflow: 'hidden'
  },
  background: {
    height: '100%',
    position: 'absolute',
    left: '-60%',
    opacity: 0.2
  }
}))

const CustomizedDrawer = ({ open }) => {
  const classes = useStyles()
  const [items, setItems] = useState([
    { label: "Users", Icon: PersonIcon, selected: false },
    { label: "Items", Icon: StyleIcon, selected: false },
    { label: "Offers", Icon: LocalOfferIcon, selected: false },
    { label: "Configs", Icon: BuildIcon, selected: false },
  ])

  const onClick = useCallback(i => () => {
    const newItems = [...items]
    const item = items[i];

    newItems[i] = { ...item, selected: true }
    setItems(newItems)
  }, [items])

  return (
    <Drawer
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      variant="permanent"
    >
      <Toolbar />
      <img className={classes.background} src="https://i.pinimg.com/564x/d1/59/e9/d159e9ca272b73f56ef2b770a7c0b17b.jpg" alt="background_img" />
      <List >
        {items.map(({ label, Icon, selected }, index) => (
          <Fragment key={index}>
            <Link to={`/${label.toLowerCase()}`}>
              <ListItem button selected={selected} onClick={onClick(index)}>
                <ListItemIcon><Icon color={selected ? "primary" : "inherit"} /></ListItemIcon>
                <ListItemText disableTypography>
                  <Typography color={selected ? "primary" : "initial"}>{label}</Typography>
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Drawer>
  )
}

export default CustomizedDrawer