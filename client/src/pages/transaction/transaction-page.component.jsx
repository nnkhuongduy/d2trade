import React from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  img: {
    maxWidth: '100%',
    height: '100%',
    margin: '0 auto',
    display: 'block'
  },
  imgContainer: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}))

const TransactionPage = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={6} className={classes.imgContainer}>
        <img
          src='https://phongvu.vn/cong-nghe/wp-content/uploads/2018/07/Dota-2.jpg'
          alt='dota_img'
          className={classes.img}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ExpansionPanel expanded>
          <ExpansionPanelSummary
            id='bank'
            aria-controls='transaction-panel-1'
          >
            Hướng dẫn
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            Thông tin
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            id='bank'
            aria-controls='transaction-panel-1'
          >
            Ngân hàng
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            Thông tin
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            id='momo'
            aria-controls='transaction-panel-2'
          >
            Momo
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            Thông tin
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>
  )
}

export default TransactionPage