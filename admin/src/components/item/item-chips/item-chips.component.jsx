import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Chip, Avatar, Grid
} from '@material-ui/core'

import { fetchHeroesStart } from '../../../redux/hero/hero.actions'

import { selectHeroes } from '../../../redux/hero/hero.selectors'

const useStyles = makeStyles(theme => ({
  chip: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      filter: 'brightness(105%)',
      cursor: 'pointer'
    }
  },
  inscribed: {
    backgroundColor: theme.palette.item.inscribed,
    '&:hover': {
      backgroundColor: theme.palette.item.inscribed,
    },
    '&:focus': {
      backgroundColor: theme.palette.item.inscribed,
    },
  },
  immortal: {
    backgroundColor: theme.palette.item.immortal,
    '&:hover': {
      backgroundColor: theme.palette.item.immortal,
    },
    '&:focus': {
      backgroundColor: theme.palette.item.immortal,
    },
  },
  arcana: {
    backgroundColor: theme.palette.item.arcana,
    '&:hover': {
      backgroundColor: theme.palette.item.arcana,
    },
    '&:focus': {
      backgroundColor: theme.palette.item.arcana,
    },
  }
}))

const ItemChips = ({ item, heroes, fetchHeroes, selectable }) => {
  const classes = useStyles()
  const [hero, setHero] = useState(null)

  useEffect(() => {
    if (!heroes) fetchHeroes()
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (item && heroes)
      setHero(heroes.find(hero => hero.localized_name === item.hero))
    //eslint-disable-next-line
  }, [item, heroes])

  return (
    <Grid container spacing={1} alignItems='center'>
      {!item.available &&
        <Grid item>
          <Chip
            size='small'
            label='Unavailable'
            clickable={selectable}
            className={classes.chip}
          />
        </Grid>
      }
      {item.hero &&
        <Grid item>
          <Chip
            size='small'
            label={item.hero}
            avatar={<Avatar src={hero && hero.portrait_url} />}
            clickable={selectable}
            color='primary'
            className={classes.chip}
          />
        </Grid>
      }
      {item.rarity &&
        <Grid item>
          <Chip
            size='small'
            label={item.rarity}
            clickable={selectable}
            className={clsx(classes.chip, classes[item.rarity.toLowerCase()])}
          />
        </Grid>
      }
      {item.configs.isNonMarket &&
        <Grid item>
          <Chip
            size='small'
            label='Non-market'
            clickable={selectable}
            color='secondary'
            className={classes.chip}
          />
        </Grid>
      }
      {item.configs.isDisabled &&
        <Grid item>
          <Chip
            size='small'
            label='Disabled'
            clickable={selectable}
            className={classes.chip}
          />
        </Grid>
      }
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchHeroes: () => dispatch(fetchHeroesStart())
})

const mapStateToProps = createStructuredSelector({
  heroes: selectHeroes
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemChips)