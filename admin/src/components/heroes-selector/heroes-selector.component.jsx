import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Dialog, DialogContent, DialogTitle,
  Grid, CircularProgress, TextField,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'

import { fetchHeroesStart } from '../../redux/hero/hero.actions'

import { selectHeroes } from '../../redux/hero/hero.selectors'

const useStyles = makeStyles(theme => ({
  selector: {
    width: (127 / 3 * 2),
    height: (71 / 3 * 2),
    backgroundColor: 'grey',
    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(120%)'
    },
    overflow: 'hidden',
  },
  portrait: {
    width: '100%',
    height: '100%',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  container: {
    width: '60vw',
    height: '80vh'
  }
}))

const HeroContainer = ({ src, name, onClick, width }) => {
  const classes = useStyles()

  const heroClick = useCallback(() => {
    onClick({ hero: { name: name, src: src } })
  }, [])

  return (
    <div className={classes.selector} onClick={heroClick} style={width && { width: width, height: (width * 71 / 127) }}>
      {src && (
        <img src={src} className={classes.portrait} />
      )}
    </div>
  )
}

const HeroesSelector = ({ heroes, fetchHeroesStart, hero, setHero, width }) => {
  const classes = useStyles()
  const [dialog, setDialog] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!heroes) fetchHeroesStart()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <HeroContainer src={hero && hero.src} onClick={() => setDialog(true)} width={width} />
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby='hero-dialog-title'
        maxWidth='lg'
        classes={{ paper: classes.container }}
      >
        <DialogTitle id='hero-dialog-title'>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              Bảng Hero
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Search style={{ marginRight: 10 }} />
              <TextField label='Tìm Hero' size='small' value={search} onChange={e => setSearch(e.target.value)} autoFocus />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} alignItems='center'>
            {heroes ? heroes
              .filter(hero => hero.localized_name.toLowerCase().includes(search.toLowerCase()))
              .map(hero => (
                <Grid item key={hero.localized_name}>
                  <HeroContainer
                    src={hero.portrait_url}
                    name={hero.localized_name}
                    onClick={obj => {
                      setDialog(false);
                      setHero(obj);
                    }}
                    width={width}
                  />
                </Grid>
              )) : <Grid item><CircularProgress /></Grid>}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchHeroesStart: () => dispatch(fetchHeroesStart())
})

const mapStateToProps = createStructuredSelector({
  heroes: selectHeroes
})

export default connect(mapStateToProps, mapDispatchToProps)(HeroesSelector)