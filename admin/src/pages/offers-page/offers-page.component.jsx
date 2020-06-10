import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'

import {
  Grid, LinearProgress, Collapse, Chip, Button
} from '@material-ui/core'
import {
  Refresh, FilterList
} from '@material-ui/icons'

import Toolbar from '../../components/toolbar/toolbar.component'
import OffersContainer from '../../components/offers/offers-container.component'
import OfferInfo from './offer-info.component'
import OfferFilter from './offer-filter.component'
import Confirmation from '../../components/dialogs/confirmation/confirmation.component'

import { fetchOffersStart, clearErrorOffersStart } from '../../redux/offers/offers.actions'

import { selectOffersFetching } from '../../redux/offers/offers.selectors'

const OffersPage = ({ fetchOffers, fetching, clearErrorOffers }) => {
  const [currentOffer, setCurrentOffer] = useState(null)
  const [tools, setTools] = useState([
    {
      label: 'Fitler',
      Icon: <FilterList />,
      active: false
    },
    {
      label: 'refresh',
      Icon: <Refresh />,
      func: () => { fetchOffers() }
    },
  ])
  const [filter, setFilter] = useState({
    searchQuery: '',
    date: {
      from: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
      to: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
      toPlus: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
      active: false
    },
    status: 'All'
  })
  const [confirmation, setConfirmation] = useState(false)

  const onConfirm = () => {
    clearErrorOffers()
  }

  return (
    <>
      <Grid container direction='column' spacing={1}>
        <Collapse in={fetching}>
          <Grid item>
            <LinearProgress />
          </Grid>
        </Collapse>
        <Grid item>
          <Grid container alignItems='center' justify='space-between'>
            <Grid item>
              <Grid container spacing={1} alignItems='center'>
                <Grid item>
                  <Button variant='contained' color='primary' onClick={() => setConfirmation(true)}>Xóa Offers Lỗi</Button>
                </Grid>
                <Grid item>
                  Lọc hiện tại:
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    {filter.searchQuery && <Grid item>
                      <Chip
                        size='small'
                        label={filter.searchQuery}
                        onDelete={() => setFilter({ ...filter, searchQuery: '' })}
                      />
                    </Grid>}
                    {filter.date.active &&
                      <>
                        <Grid item>
                          <Chip
                            size='small'
                            label={`Từ ${filter.date.from.slice(0, 10)}`}
                            onDelete={() => setFilter({
                              ...filter,
                              date: {
                                from: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                                to: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                                toPlus: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                                active: false
                              }
                            })}
                          />
                        </Grid>
                        <Grid item>
                          <Chip
                            size='small'
                            label={`Đến ${filter.date.to.slice(0, 10)}`}
                            onDelete={() => setFilter({
                              ...filter,
                              date: {
                                from: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                                to: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                                toPlus: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
                                active: false
                              }
                            })}
                          />
                        </Grid>
                      </>}
                    {filter.status !== 'All' && <Grid item>
                      <Chip
                        size='small'
                        label={filter.status}
                        onDelete={() => setFilter({ ...filter, status: 'All' })}
                      />
                    </Grid>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Toolbar tools={tools} onChange={tools => setTools(tools)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Collapse in={tools[0].active}>
            <OfferFilter filter={filter} onChange={filter => setFilter(filter)} />
          </Collapse>
        </Grid>
        <Grid item>
          <Grid container spacing={5}>
            <Grid item sm={12} md={7}>
              <OffersContainer setCurrentOffer={offer => setCurrentOffer(offer)} sortable filter={filter} />
            </Grid>
            <Grid item sm={12} md={5}>
              <OfferInfo offer={currentOffer} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Confirmation open={confirmation} onClose={() => setConfirmation(false)} onConfirm={onConfirm} />
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchOffers: () => dispatch(fetchOffersStart()),
  clearErrorOffers: () => dispatch(clearErrorOffersStart())
})

const mapStateToProps = createStructuredSelector({
  fetching: selectOffersFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersPage)