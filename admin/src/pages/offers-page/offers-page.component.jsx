import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Grid, LinearProgress, Collapse
} from '@material-ui/core'
import {
  Refresh
} from '@material-ui/icons'

import Toolbar from '../../components/toolbar/toolbar.component'
import OffersContainer from '../../components/offers/offers-container.component'
import OfferInfo from './offer-info.component'

import { fetchOffersStart } from '../../redux/offers/offers.actions'

import { selectOffersFetching } from '../../redux/offers/offers.selectors'

const OffersPage = ({ fetchOffers, fetching }) => {
  const [currentOffer, setCurrentOffer] = useState(null)
  const [tools, setTools] = useState([
    {
      label: 'refresh',
      Icon: <Refresh />,
      func: () => { fetchOffers() }
    }
  ])

  return (
    <>
      <Grid container direction='column' spacing={1}>
        <Collapse in={fetching}>
          <Grid item>
            <LinearProgress />
          </Grid>
        </Collapse>
        <Grid item style={{ alignSelf: 'flex-end' }}>
          <Toolbar tools={tools} onChange={tools => setTools(tools)} />
        </Grid>
        <Grid item>
          <Grid container spacing={5}>
            <Grid item sm={12} md={7}>
              <OffersContainer setCurrentOffer={offer => setCurrentOffer(offer)} />
            </Grid>
            <Grid item sm={12} md={5}>
              <OfferInfo offer={currentOffer} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchOffers: () => dispatch(fetchOffersStart())
})

const mapStateToProps = createStructuredSelector({
  fetching: selectOffersFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersPage)