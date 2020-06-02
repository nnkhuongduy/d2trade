import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Paper, Tabs, Tab, Typography, Divider, Select, InputLabel, MenuItem
} from '@material-ui/core'
import {
  LocalOffer, Person, Style
} from '@material-ui/icons'

import OffersContainer from './table-containers/offers-container.component'
import UserContainer from './table-containers/users-container.component'
import ItemsContainer from './table-containers/items-container.component'
import Revenue from './revenue.component'

const useStyles = makeStyles(theme => ({
  height: {
    height: '60vh',
    [theme.breakpoints.down('md')]: {
      height: 1200
    }
  },
  grid: {
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2)
  }
}))

const Dashboard = () => {
  const history = useHistory()
  const classes = useStyles()
  const [tableTab, setTableTab] = useState(0)

  return (
    <>
      <Grid container spacing={1} className={classes.height}>
        <Grid item xs={12} md={8}>
          yoo
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ height: '100%' }}>
            <Grid container direction='column' style={{ width: '100%', height: '100%' }}>
              <Grid item>
                <Tabs
                  value={tableTab}
                  onChange={(e, val) => setTableTab(val)}
                  aria-label='table tabs'
                  indicatorColor='primary'
                  textColor='primary'
                  variant="fullWidth"
                >
                  <Tab label='Offers' icon={<LocalOffer />} id='table-tab-0' aria-controls='table-tabpanel-0' />
                  <Tab label='Users' icon={<Person />} id='table-tab-1' aria-controls='table-tabpanel-1' />
                  <Tab label='Items' icon={<Style />} id='table-tab-2' aria-controls='table-tabpanel-2' />
                </Tabs>
              </Grid>
              <Grid item style={{ flex: 1 }}>
                <div style={{ width: '100%', height: '100%' }}>
                  {tableTab === 0 && <OffersContainer onRowClick={e => history.push('offers')} />}
                  {tableTab === 1 && <UserContainer onRowClick={e => history.push(`users/${e.rowData.steamid}`)} />}
                  {tableTab === 2 && <ItemsContainer />}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={3}>
          <Revenue />
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            yoo
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            yoo
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            yoo
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard