import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'

import { makeStyles } from '@material-ui/styles'
import {
  CircularProgress, Avatar, Link, Tabs, Tab, Grid
} from '@material-ui/core'

import comparator from '../../../helpers/sort-function'

import VirtualizedTable from '../virtualized-table.component'
import ItemImg from '../../../components/item/item-img/item-img.component'

import { fetchOffersStart } from '../../../redux/offers/offers.actions'
import { fetchItemsStart } from '../../../redux/item/item.actions'

import { selectOffers, selectOffersFetching } from '../../../redux/offers/offers.selectors'
import { selectItems, selectFetchingItems } from '../../../redux/item/item.selectors'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 30,
    height: 30
  },
  root: {
    fontSize: theme.typography.pxToRem(12),
    width: '100%',
    height: '65vh'
  }
}))

const INITIAL_COLUMNS = [
  {
    widthPerc: 20,
    label: 'Icon',
    dataKey: 'icon',
  },
  {
    widthPerc: 50,
    label: 'Tên',
    dataKey: 'name',
  },
  {
    widthPerc: 30,
    label: 'Giá',
    dataKey: 'price',
  },
]

const ItemsContainer = ({ offers, fetchingOffers, fetchOffers, items, fetchingItems, fetchItems }) => {
  const classes = useStyles()

  const [columns, setColumns] = useState(INITIAL_COLUMNS)
  const [rows, setRows] = useState(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (!offers && !fetchingOffers) fetchOffers()
    if (!items && !fetchingItems) fetchItems()
  }, [])

  useEffect(() => {
    if (tab === 0)
      if (offers) {
        const newRows = []

        offers
          .filter(offer => offer.status === 'Accepted')
          .sort(comparator('date', false))
          .slice(0, 10)
          .forEach(offer => {

            offer.user_items
              .filter(item => item.id !== 'moneyItem')
              .forEach(item => newRows.push({
                icon: <ItemImg src={item.icon_url} perc={20} />,
                name: <span style={{ color: 'green' }}>{item.name ? item.name : 'error'}</span>,
                price: item.vnd_price
              }))
            offer.bot_items.forEach(item => newRows.push({
              icon: <ItemImg src={item.icon_url} perc={20} />,
              name: <span style={{ color: 'red' }}>{item.name ? item.name : 'error'}</span>,
              price: item.vnd_price
            }))
          })

        setRows(newRows)
      }
    if (tab === 1)
      if (items) {
        const newRows = []

        items
          .sort(comparator('updatedAt', false))
          .slice(0, 10)
          .forEach(item => {
            newRows.push({
              icon: <ItemImg src={item.icon_url} perc={20} />,
              name: item.name,
              price: item.prices.vnd.toLocaleString()
            })
          })

        setRows(newRows)
      }
  }, [tab])

  if (offers && items && rows)
    return (
      <Grid container direction='column' style={{ width: '100%', height: '100%' }}>
        <Grid item>
          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            aria-label='items tabs'
            indicatorColor='primary'
            textColor='primary'
            variant="fullWidth"
          >
            <Tab label='Biến động' id='table-tab-0' aria-controls='table-tabpanel-0' />
            <Tab label='Cập nhật mới nhất' id='table-tab-1' aria-controls='table-tabpanel-1' />
          </Tabs>
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <VirtualizedTable
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={columns}
          />
        </Grid>
      </Grid>
    )
  else
    return (
      <>
        {(fetchingOffers || fetchingItems) && <CircularProgress style={{ display: 'block', margin: '0 auto' }} />}
      </>
    )

}

const mapDispatchToProps = dispatch => ({
  fetchOffers: () => dispatch(fetchOffersStart()),
  fetchItems: () => dispatch(fetchItemsStart())
})

const mapStateToProps = createStructuredSelector({
  offers: selectOffers,
  fetchingOffers: selectOffersFetching,
  items: selectItems,
  fetchingItems: selectFetchingItems
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer)