import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, TextField, Button, Divider
} from '@material-ui/core'

import Switch from './switch.component'

import { fetchItemStart, fetchItemSuccess } from '../../../redux/item/item.actions'

import { selectItem, selectFetchingState } from '../../../redux/item/item.selectors'

const useStyles = makeStyles(theme => ({
  btn: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}))

const FetchItem = ({ fetchItemStart, fetchItemSuccess, fetchedItem, item, fetching, onMarketChange }) => {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState('')
  const [market, setMarket] = useState(false)

  useEffect(() => {
    setMarket(item.configs.isNonMarket)
    //eslint-disable-next-line
  }, [item])

  useEffect(() => {
    onMarketChange({ ...item, configs: { ...item.configs, isNonMarket: market } })
  }, [market])

  const onFindClick = e => {
    e.preventDefault()
    fetchItemStart(searchValue)
  }

  const onClearClick = () => {
    if (fetchedItem)
      fetchItemSuccess(null)
    onMarketChange({ ...item, configs: { ...item.configs, isNonMarket: false } })
  }

  return (
    <Grid container direction='column' spacing={2} alignItems='center'>
      <form noValidate autoComplete='off'>
        <Grid item>
          <TextField
            id='item-search-name'
            label='Tên Item'
            variant='outlined'
            helperText='Tên item trên market'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            disabled={fetching || market}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                onClick={onFindClick}
                type='submit'
                variant='contained'
                color='secondary'
                className={classes.btn}
                disabled={fetching || market}
              >Tìm
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={onClearClick}
                variant='outlined'
                color='secondary'
                className={classes.btn}
              >Xóa
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <Grid item>
        <Switch
          label='Item không có trên market'
          caption='Không sử dụng market để tìm item. Dùng cho những item không có trên market'
          name='isMarket'
          value={market}
          onChange={() => setMarket(!market)}
          disabled={fetchedItem || fetching}
        />
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchItemStart: itemName => dispatch(fetchItemStart(itemName)),
  fetchItemSuccess: item => dispatch(fetchItemSuccess(item)),
})

const mapStateToProps = createStructuredSelector({
  fetchedItem: selectItem,
  fetching: selectFetchingState
})

export default connect(mapStateToProps, mapDispatchToProps)(FetchItem)