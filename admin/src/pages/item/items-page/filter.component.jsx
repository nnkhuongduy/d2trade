import React from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Chip, Grid, Avatar
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  Immortal: {
    backgroundColor: theme.palette.item.immortal,
    '&:hover': {
      backgroundColor: theme.palette.item.immortal,
    },
    '&:focus': {
      backgroundColor: theme.palette.item.immortal,
    }
  },
  Arcana: {
    backgroundColor: theme.palette.item.arcana,
    '&:hover': {
      backgroundColor: theme.palette.item.arcana,
    },
    '&:focus': {
      backgroundColor: theme.palette.item.arcana,
    }
  },
  inscribed: {
    backgroundColor: theme.palette.item.inscribed,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.item.inscribed,
      color: 'white',
    },
    '&:focus': {
      backgroundColor: theme.palette.item.inscribed,
      color: 'white',
    },
  }
}))

const Filter = ({ filter, search }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={1} alignItems='center'>
      {search &&
        <Grid item>
          <Chip
            label={`"${search}"`}
            clickable
          />
        </Grid>}
      {filter &&
        <>
          {filter.hero &&
            <Grid item>
              <Chip
                label={filter.hero.name}
                avatar={<Avatar src={filter.hero.src} />}
                clickable
                color='primary'
              />
            </Grid>}
          {filter.rarity &&
            <Grid item>
              <Chip
                label={filter.rarity}
                clickable
                classes={{ root: classes[filter.rarity] }}
              />
            </Grid>}
          {filter.configs.isInscribed &&
            <Grid item>
              <Chip
                label='Inscribed'
                clickable
                classes={{ root: classes.inscribed }}
              />
            </Grid>}
          {filter.configs.isNonMarket &&
            <Grid item>
              <Chip
                label='Non-market'
                clickable
                color='secondary'
              />
            </Grid>}
        </>
      }
    </Grid>
  )
}

export default Filter