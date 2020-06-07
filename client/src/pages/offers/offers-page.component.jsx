import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, Paper
} from '@material-ui/core'

import OffersList from '../../components/offer/offer-list.component'
import Offer from '../../components/offer/offer.component'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      height: 'max-content'
    }
  },
  fullHeight: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      height: '80vh'
    }
  },
  paper: {
    height: '100%',
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      height: '90%',
      padding: theme.spacing(2),
    }
  }
}))

const OffersPage = () => {
  const classes = useStyles()
  const params = useParams()
  const offerRef = useRef(null)

  const executeScroll = () => offerRef.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={6} className={classes.fullHeight}>
        <Paper elevation={3} className={classes.paper}>
          <OffersList onClick={executeScroll} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} ref={offerRef}>
        <Offer id={params.id} />
      </Grid>
    </Grid>
  )
}

export default OffersPage