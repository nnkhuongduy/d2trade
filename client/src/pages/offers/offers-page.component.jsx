import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Paper
} from '@material-ui/core'

import OffersList from '../../components/offer/offer-list.component'
import Offer from '../../components/offer/offer.component'

const useStyles = makeStyles(theme => ({
  fullHeight: {
    height: '100%'
  },
  paper: {
    height: '100%',
    padding: theme.spacing(3)
  }
}))

const OffersPage = () => {
  const classes = useStyles()
  const params = useParams()

  return (
    <Grid container spacing={3} className={classes.fullHeight}>
      <Grid item xs={12} md={6} className={classes.fullHeight}>
        <Paper elevation={3} className={classes.paper}>
          <OffersList />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Offer id={params.id} />
      </Grid>
    </Grid>
  )
}

export default OffersPage