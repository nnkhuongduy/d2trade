import React, { useState } from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Chip, Fade, Grid
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute'
  },
  immortal: {
    backgroundColor: theme.palette.item.immortal,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      backgroundColor: theme.palette.item.immortal,
      filter: 'brightness(110%)'
    }
  },
  arcana: {
    backgroundColor: theme.palette.item.arcana,
    '&:hover': {
      backgroundColor: theme.palette.item.arcana,
      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest
      }),
      filter: 'brightness(110%)'
    }
  }
}))

const RaritySelector = ({ rarity, setRarity }) => {
  const classes = useStyles()
  const [active, setActive] = useState(false)

  const onRarityClick = (label) => {
    setRarity(label)
    setActive(false)
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        direction='column'
        alignItems='center'
      >
        <Grid item>
          <Chip
            label={rarity ? rarity : 'Rarity'}
            clickable
            onClick={() => setActive(!active)}
            classes={{ root: rarity && classes[rarity.toLowerCase()] }}
          />
        </Grid>
        <Grid item>
          <Fade in={active} mountOnEnter unmountOnExit>
            <Chip
              label='Immortal'
              clickable
              onClick={() => onRarityClick('Immortal')}
              classes={{ root: classes.immortal }}
            />
          </Fade>
        </Grid>
        <Grid item>
          <Fade in={active} mountOnEnter unmountOnExit>
            <Chip
              label='Arcana'
              clickable
              onClick={() => onRarityClick('Arcana')}
              classes={{ root: classes.arcana }}
            />
          </Fade>
        </Grid>
      </Grid>
    </>
  )
}

export default RaritySelector