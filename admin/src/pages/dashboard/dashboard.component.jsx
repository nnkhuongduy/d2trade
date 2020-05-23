import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Grid, Paper, Tabs, Tab
} from '@material-ui/core'
import {
  LocalOffer, Person, Style
} from '@material-ui/icons'

import OffersContainer from './table-containers/offers-container.component'
import UserContainer from './table-containers/users-container.component'
import ItemsContainer from './table-containers/items-container.component'

const Dashboard = () => {
  const [tableTab, setTableTab] = useState(0)
  const history = useHistory()

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            yoo
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ height: '55vh' }}>
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
      </Grid>
    </Grid>
  )
}

export default Dashboard