import React, { useState } from 'react'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, IconButton, Collapse, TextField, Typography, Slider, Button, Chip, Divider, Fade,
  FormControlLabel, Checkbox, FormGroup
} from '@material-ui/core'
import {
  Clear, CheckBoxOutlineBlank, CheckBox as CheckBoxIcon
} from '@material-ui/icons'

import HeroesSelector from '../../../components/heroes-selector/heroes-selector.component'
import NumberFormatCustom from '../../../components/number-format-input/number-format-input.component'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  slider: {
    width: '150px'
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
  immortalClickable: {
    '&:focus': {
      backgroundColor: theme.palette.item.immortal
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
  },
  arcanaClickable: {
    '&:focus': {
      backgroundColor: theme.palette.item.arcana
    }
  },
}))

const ToolbarContent = ({ tools, onChange }) => {
  const classes = useStyles()
  const [slideValue, setSlideValue] = useState(700)
  const [searchValue, setSearchValue] = useState('')
  const [filter, setFilter] = useState({
    hero: null,
    rarity: null,
    configs: {
      any: true,
      isInscribed: false,
      isNonMarket: false
    },
    price: {
      type: 'vnd',
      min: 0,
      max: 0
    }
  })

  const onSearchClick = e => {
    e.preventDefault()
    const newTools = [...tools]

    newTools[0] = { ...newTools[0], value: searchValue }

    onChange(newTools)
  }

  const onSlideCommit = () => {
    const newTools = [...tools]

    newTools[1] = { ...newTools[1], value: slideValue }

    onChange(newTools)
  }

  const onFilterClick = () => {
    const newTools = [...tools]

    newTools[2] = { ...newTools[2], value: filter }
    onChange(newTools)
  }

  return (
    <div className={classes.root}>
      <Collapse in={tools[0].active} mountOnEnter unmountOnExit>
        <form noValidate autoComplete="off">
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <TextField
                id='search'
                label='Search'
                variant='outlined'
                size='small'
                type='search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' onClick={onSearchClick} type='submit'>
                Search
                </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
      <Collapse in={tools[1].active} mountOnEnter unmountOnExit>
        <Typography variant='body2'>Chiều cao khung</Typography>
        <Slider
          aria-labelledby='slide'
          getAriaLabel={() => `${slideValue}%`}
          valueLabelDisplay="auto"
          value={slideValue}
          onChangeCommitted={onSlideCommit}
          onChange={(e, newValue) => setSlideValue(newValue)}
          className={classes.slider}
          min={400}
          max={800}
        />
      </Collapse>
      <Collapse in={tools[2].active} mountOnEnter unmountOnExit>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <HeroesSelector
              width={80}
              hero={filter.hero && filter.hero}
              setHero={obj => setFilter({ ...filter, hero: obj })}
            />
          </Grid>
          <Fade in={Boolean(filter.hero)} mountOnEnter unmountOnExit>
            <Grid item>
              <IconButton size='small' onClick={() => setFilter({ ...filter, hero: null })}>
                <Clear fontSize='small' />
              </IconButton>
            </Grid>
          </Fade>
          <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
          <Grid item>
            <Chip
              label='Immortal'
              classes={{
                root: clsx({ [classes.immortal]: filter.rarity === 'Immortal' }),
                clickable: clsx({ [classes.immortalClickable]: filter.rarity === 'Immortal' }),
              }}
              clickable
              onClick={() => setFilter({ ...filter, rarity: filter.rarity === 'Immortal' ? null : 'Immortal' })}
            />
          </Grid>
          <Grid item>
            <Chip
              label='Arcana'
              classes={{
                root: clsx({ [classes.arcana]: filter.rarity === 'Arcana' }),
                clickable: clsx({ [classes.arcanaClickable]: filter.rarity === 'Arcana' }),
              }}
              clickable
              onClick={() => setFilter({ ...filter, rarity: filter.rarity === 'Arcana' ? null : 'Arcana' })}
            />
          </Grid>
          <Fade in={Boolean(filter.rarity)} mountOnEnter unmountOnExit>
            <Grid item>
              <IconButton size='small' onClick={() => setFilter({ ...filter, rarity: null })}>
                <Clear fontSize='small' />
              </IconButton>
            </Grid>
          </Fade>
          <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
          <Grid item>
            <Button
              color='secondary'
              onClick={() => setFilter({ ...filter, price: { ...filter.price, type: filter.price.type === 'vnd' ? 'usd' : 'vnd' } })}
            >{filter.price.type.toUpperCase()}
            </Button>
          </Grid>
          <Grid item>
            <TextField
              label='Min'
              name='min'
              value={filter.price.min}
              onChange={e => setFilter({ ...filter, price: { ...filter.price, min: e.target.value } })}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              size='small'
              variant='outlined'
              style={{ width: 100 }}
            />
          </Grid>
          <Grid item>
            <Typography>-</Typography>
          </Grid>
          <Grid item>
            <TextField
              label='Max'
              name='max'
              value={filter.price.max}
              onChange={e => setFilter({ ...filter, price: { ...filter.price, max: e.target.value } })}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              size='small'
              variant='outlined'
              style={{ width: 100 }}
            />
          </Grid>
          <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
          <FormGroup row>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize='small' />}
                    checkedIcon={<CheckBoxIcon fontSize='small' />}
                    checked={filter.configs.any}
                    onChange={() => setFilter({ ...filter, configs: { any: true, isInscribed: false, isNonMarket: false } })}
                    name='any'
                  />}
                label='Any'
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize='small' />}
                    checkedIcon={<CheckBoxIcon fontSize='small' />}
                    checked={filter.configs.isInscribed}
                    onChange={() => setFilter({
                      ...filter,
                      configs: {
                        ...filter.configs,
                        any: filter.configs.isInscribed && !filter.configs.isNonMarket,
                        isInscribed: !filter.configs.isInscribed,
                      }
                    })}
                    name='inscribed'
                  />}
                label='Inscribed'
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize='small' />}
                    checkedIcon={<CheckBoxIcon fontSize='small' />}
                    checked={filter.configs.isNonMarket}
                    onChange={() => setFilter({
                      ...filter,
                      configs: {
                        ...filter.configs,
                        any: !filter.configs.isInscribed && filter.configs.isNonMarket,
                        isNonMarket: !filter.configs.isNonMarket,
                      }
                    })}
                    name='non-market'
                  />}
                label='Non-market'
              />
            </Grid>
          </FormGroup>
          <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
          <Grid item>
            <Button color='primary' variant='contained' onClick={onFilterClick}>
              Lọc
              </Button>
          </Grid>
        </Grid>
      </Collapse>
    </div>
  )
}

export default ToolbarContent