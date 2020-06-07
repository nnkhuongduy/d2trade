import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'

import { makeStyles, useTheme } from '@material-ui/styles'
import {
  Grid, IconButton, TextField, InputAdornment, useMediaQuery, Collapse
} from '@material-ui/core'
import {
  Refresh, Cancel, Search, FilterList
} from '@material-ui/icons'

import InventoryUser from './inventory-user.component'
import InventoryBot from './inventory-bot.component'
import HeroesSelector from '../heroes-selector/heroes-selector.component'
import RaritySelector from '../rarity-selector/rarity-selector.component'

import { fetchInventoryStart } from '../../redux/inventory/inventory.actions'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      boxSizing: 'border-box',
      minHeight: '70vh',
    }
  }
}))

const InventoryContainer = ({ tab, fetchInventory }) => {
  const classes = useStyles()
  const itemRef = useRef(null)
  const [heroName, setHeroName] = useState(null)
  const [rarity, setRarity] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const onRefresh = () => {
    fetchInventory(tab === 0 ? 'user' : 'bot')
  }

  const getRef = () => itemRef

  if (!matches)
    return (
      <Grid container direction='column' className={classes.root} spacing={2} wrap='nowrap'>
        <Grid item>
          <Grid container spacing={1} alignItems='center' justify='space-between'>
            <Grid item>
              <Grid container spacing={1} alignItems='center'>
                <Grid item>
                  <HeroesSelector heroName={heroName} setHeroName={name => setHeroName(name)} />
                </Grid>
                {heroName && <Grid item>
                  <IconButton size='small' onClick={() => setHeroName(null)}>
                    <Cancel />
                  </IconButton>
                </Grid>}
                <Grid item>
                  <RaritySelector rarity={rarity} setRarity={rarity => setRarity(rarity)} />
                </Grid>
                {rarity && <Grid item>
                  <IconButton size='small' onClick={() => setRarity(null)}>
                    <Cancel />
                  </IconButton>
                </Grid>}
                <Grid item>
                  <TextField
                    id='search-input'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    variant='outlined'
                    size='small'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton size='small' onClick={onRefresh}>
                <Refresh />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ flex: 1 }} ref={itemRef}>
          {tab === 0 && <InventoryUser getRef={getRef} heroName={heroName} rarity={rarity} search={search} />}
          {tab === 1 && <InventoryBot getRef={getRef} heroName={heroName} rarity={rarity} search={search} />}
        </Grid>
      </Grid>
    )
  else return (
    <Grid container direction='column' className={classes.root} wrap='nowrap' spacing={2} >
      <Grid item>
        <Grid container spacing={1} alignItems='center' justify='space-between'>
          <Grid item>
            <IconButton size='small' onClick={() => setFilter(!filter)}>
              <FilterList />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size='small' onClick={onRefresh}>
              <Refresh />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {filter && <Grid item>
        <Grid container spacing={1} alignItems='center' justify='center'>
          <Grid item>
            <HeroesSelector heroName={heroName} setHeroName={name => setHeroName(name)} />
          </Grid>
          {heroName && <Grid item>
            <IconButton size='small' onClick={() => setHeroName(null)}>
              <Cancel />
            </IconButton>
          </Grid>}
          <Grid item>
            <RaritySelector rarity={rarity} setRarity={rarity => setRarity(rarity)} />
          </Grid>
          {rarity && <Grid item>
            <IconButton size='small' onClick={() => setRarity(null)}>
              <Cancel />
            </IconButton>
          </Grid>}
          <Grid item>
            <TextField
              id='search-input'
              value={search}
              onChange={e => setSearch(e.target.value)}
              variant='outlined'
              size='small'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>}
      <Grid item style={{ flex: 1 }} ref={itemRef}>
        {tab === 0 && <InventoryUser getRef={getRef} heroName={heroName} rarity={rarity} search={search} />}
        {tab === 1 && <InventoryBot getRef={getRef} heroName={heroName} rarity={rarity} search={search} />}
      </Grid>

    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchInventory: type => dispatch(fetchInventoryStart(type))
})

export default connect(null, mapDispatchToProps)(InventoryContainer)