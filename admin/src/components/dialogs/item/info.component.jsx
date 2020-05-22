import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import axios from 'axios'

import {
  Grid, Typography, TextField, IconButton, Button, CircularProgress
} from '@material-ui/core'
import {
  SwapVert
} from '@material-ui/icons'

import HeroesSelector from '../../heroes-selector/heroes-selector.component'
import RaritySelector from '../../rarity-selector/rarity-selector.component'
import NumberFormatCustom from '../../number-format-input/number-format-input.component'

import { enqSnackbar } from '../../../redux/snackbar/snackbar.actions'
import { fetchSiteConfigsStart } from '../../../redux/site-configs/site-configs.actions'

import { selectCurrencyRate } from '../../../redux/site-configs/site-configs.selectors'

const Info = ({ item, onChange, rate, enqSnackbar, fetchConfigs }) => {
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (!rate) fetchConfigs()
  }, [])

  const convertClick = to => {
    console.log(rate)

    if (rate) {
      const value = {
        usd: Math.round(((item.prices.vnd / (rate * 1000)) + Number.EPSILON) * 100) / 100,
        vnd: Math.round(item.prices.usd * (rate * 1000) / 1000) * 1000
      }

      onChange({
        ...item,
        prices: {
          ...item.prices,
          [to]: value[to]
        }
      })
    }
    //eslint-disable-next-line
  }

  const fetchPrices = () => {
    const fetch = async () => {
      setFetching(true)
      const respone = await axios(`/admin/items/market/${item.name}`)

      if (respone.status === 200) {
        onChange({ ...item, prices: respone.data.prices })
        enqSnackbar({
          severity: 'success',
          text: 'Lấy giá từ market thành công!',
          key: new Date().getTime()
        })
      } else
        enqSnackbar({
          severity: 'error',
          text: 'Lấy giá từ market thất bại!',
          key: new Date().getTime()
        })

      setFetching(false)
    }
    fetch()
  }

  return (
    <Grid container spacing={1} direction='column' alignItems='center'>
      <Grid item>
        <form noValidate autoComplete='off'>
          <TextField
            label={'Tên Item'}
            InputLabelProps={{ shrink: true }}
            value={item.name}
            onChange={e => onChange({ ...item, name: e.target.value })}
            disabled={!item.configs.isNonMarket}
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
                <HeroesSelector heroName={item.hero} setHeroName={name => onChange({ ...item, hero: name })} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction='column' alignItems='center'>
              <Grid item>
                <Typography variant='body2'>Rarity :</Typography>
              </Grid>
              <Grid item>
                <RaritySelector rarity={item.rarity} setRarity={label => onChange({ ...item, rarity: label })} />
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
                  value={item.prices.usd}
                  onChange={e => onChange({ ...item, prices: { ...item.prices, usd: e.target.value } })}
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
                  onChange={e => item && onChange({ ...item, prices: { ...item.prices, vnd: e.target.value } })}
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
      <Grid item style={{ marginLeft: 'auto' }}>
        {fetching ? <CircularProgress size={20} />
          : <Button color='primary' size='small' onClick={fetchPrices}>Lấy giá</Button>}
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  enqSnackbar: snackbar => dispatch(enqSnackbar(snackbar)),
  fetchConfigs: () => dispatch(fetchSiteConfigsStart())
})

const mapStateToProps = createStructuredSelector({
  rate: selectCurrencyRate,
})

export default connect(mapStateToProps, mapDispatchToProps)(Info)