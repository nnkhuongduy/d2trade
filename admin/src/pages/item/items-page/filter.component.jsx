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

const Filter = ({ tools, onChange }) => {
  const classes = useStyles()
  const filter = tools[2].value
  const search = tools[0].value

  const onDelete = token => {
    const newTools = [...tools]

    if (token === 'search')
      newTools[0].value = ''

    if (token === 'hero')
      newTools[2].value.hero = null

    if (token === 'rarity')
      newTools[2].value.rarity = null

    if (token === 'inscribed')
      newTools[2].value.configs.isInscribed = false

    if (token === 'non-market')
      newTools[2].value.configs.nonMarket = false

    if (token === 'prices') {
      newTools[2].value.price.min = 0
      newTools[2].value.price.max = 0
    }

    onChange(newTools)
  }

  return (
    <Grid container spacing={1} alignItems='center'>
      {search &&
        <Grid item>
          <Chip
            label={`"${search}"`}
            onDelete={() => onDelete('search')}
          />
        </Grid>}
      {filter &&
        <>
          {filter.hero &&
            <Grid item>
              <Chip
                label={filter.hero.name}
                avatar={<Avatar src={filter.hero.src} />}
                color='primary'
                onDelete={() => onDelete('hero')}
              />
            </Grid>}
          {filter.rarity &&
            <Grid item>
              <Chip
                label={filter.rarity}
                classes={{ root: classes[filter.rarity] }}
                onDelete={() => onDelete('rarity')}
              />
            </Grid>}
          {filter.configs.isInscribed &&
            <Grid item>
              <Chip
                label='Inscribed'
                clickable
                classes={{ root: classes.inscribed }}
                onDelete={() => onDelete('inscribed')}
              />
            </Grid>}
          {filter.configs.isNonMarket &&
            <Grid item>
              <Chip
                label='Non-market'
                clickable
                color='secondary'
                onDelete={() => onDelete('non-market')}
              />
            </Grid>}
          {(filter.price.min !== 0 || filter.price.max !== 0) &&
            <Grid item>
              <Chip
                label={`${filter.price.type.toUpperCase()} ${filter.price.min.toLocaleString()} - ${filter.price.max.toLocaleString()}`}
                clickable
                color='secondary'
                onDelete={() => onDelete('prices')}
              />
            </Grid>}
        </>
      }
    </Grid>
  )
}

export default Filter