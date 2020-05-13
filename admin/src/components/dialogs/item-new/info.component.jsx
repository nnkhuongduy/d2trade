import React, { useState, useCallback, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Grid, Typography, TextField, Divider, Collapse, IconButton
} from '@material-ui/core'
import {
  SwapVert
} from '@material-ui/icons'

import HeroesSelector from '../../heroes-selector/heroes-selector.component'
import RaritySelector from '../../rarity-selector/rarity-selector.component'

import { fetchCurrencyRateStart } from '../../../redux/site-settings/site-settings.actions'

import { selectCurrencyRate } from '../../../redux/site-settings/site-settings.selectors'

const NumberFormatCustom = ({ inputRef, onChange, ...props }) => (
  <NumberFormat
    {...props}
    getInputRef={inputRef}
    onValueChange={(values) => {
      onChange({
        target: {
          value: values.floatValue
        }
      })
    }}
    thousandSeparator
    isNumericString
    decimalScale={2}
    allowNegative={false}
  />
)

const Info = ({ item, onChange, rate, fetchCurrencyRate }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!rate)
      fetchCurrencyRate()
    //eslint-disable-next-line
  }, [])

  const onNameChange = useCallback(e => {
    onChange({ name: e.target.value })
    setValue(e.target.value)
    //eslint-disable-next-line
  }, [item])

  const convertClick = useCallback(to => {
    if (rate) {
      const value = {
        usd: Math.round(((item.prices.vnd / (rate * 1000)) + Number.EPSILON) * 100) / 100,
        vnd: Math.round(item.prices.usd * (rate * 1000) / 1000) * 1000
      }

      onChange({
        prices: {
          [to]: value[to]
        }
      })
    }
    //eslint-disable-next-line
  }, [item])

  return (
    // <Collapse in={Boolean(item)}>
    <Collapse in={true}>
      <Grid container spacing={1} direction='column' alignItems='center'>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant='h6' style={{ marginBottom: 15 }}>Thông tin Item</Typography>
        </Grid>
        <Grid item>
          <form noValidate autoComplete='off'>
            <TextField
              label={'Tên Item'}
              InputLabelProps={{ shrink: item ? true : undefined }}
              disabled={false}
              value={item && !item.configs.isNonMarket ? item.name : value}
              onChange={onNameChange}
              disabled={item && !item.configs.isNonMarket}
              variant='outlined'
              size='small'
            />
          </form>
        </Grid>
        <Grid item>
          <Grid container justify='space-between' spacing={3}>
            <Grid item>
              <Grid container spacing={1} direction='column' alignItems='center'>
                <Grid item>
                  <Typography variant='body2'>Hero :</Typography>
                </Grid>
                <Grid item>
                  <HeroesSelector hero={item && item.hero} setHero={onChange} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={1} direction='column' alignItems='center'>
                <Grid item>
                  <Typography variant='body2'>Rarity :</Typography>
                </Grid>
                <Grid item>
                  <RaritySelector rarity={item && item.rarity} setRarity={onChange} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction='column' alignItems='center' spacing={2}>
            <Grid item>
              <Typography variant='body2'>Giá :</Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' spacing={1}>
                <Grid item xs={2}>
                  <Typography variant='body2'>USD</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant='body2'>:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label='Giá USD'
                    name='usd'
                    value={item && item.prices.usd}
                    onChange={e => item && onChange({
                      prices: {
                        usd: e.target.value
                      }
                    })}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    size='small'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => convertClick('usd')}>
                    <SwapVert id='usd' />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' spacing={1}>
                <Grid item xs={2}>
                  <Typography variant='body2'>VND</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant='body2'>:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label='Giá VND'
                    name='usd'
                    value={item && item.prices.vnd}
                    onChange={e => item && onChange({
                      prices: {
                        vnd: e.target.value
                      }
                    })}
                    InputProps={{
                      inputComponent: NumberFormatCustom
                    }}
                    size='small'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => convertClick('vnd')}>
                    <SwapVert />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Collapse>
  )
}

const mapStateToProps = createStructuredSelector({
  rate: selectCurrencyRate
})

const mapDispatchToProps = dispatch => ({
  fetchCurrencyRate: () => dispatch(fetchCurrencyRateStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Info)