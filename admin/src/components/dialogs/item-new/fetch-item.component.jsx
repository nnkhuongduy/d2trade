import React, { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Grid, TextField, Button
} from '@material-ui/core'

import { fetchItemStart, fetchItemSuccess } from '../../../redux/item/item.actions'
import { enqSnackbar } from '../../../redux/snackbar/snackbar.actions'

import { selectItem, selectFetchingState } from '../../../redux/item/item.selectors'

const useStyles = makeStyles(theme => ({
  btn: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}))

const FetchItem = ({ fetchItemStart, fetchItemSuccess, enqSnackbar, item, fetching, currentItem, nonMarket, setMarket }) => {
  const classes = useStyles()
  const [itemName, setItemName] = useState('')
  const [searched, setSearched] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (currentItem)
      setDisabled(currentItem.configs.isNonMarket)
    else setDisabled(nonMarket)
  }, [currentItem, nonMarket])

  useEffect(() => {
    if (!fetching)
      if (itemName) {
        setSearched(true)
        if (item) enqSnackbar({ severity: 'success', text: 'Lấy thông tin item thành công', key: new Date().getTime() })
        else enqSnackbar({ severity: 'error', text: 'Lấy thông tin item không thành công', key: new Date().getTime() })
      }
    //eslint-disable-next-line
  }, [fetching])

  const onFindClick = e => {
    e.preventDefault()
    fetchItemStart(itemName)
  }

  const onClearClick = () => {
    fetchItemSuccess(null)
    setMarket(false)
  }

  const onChange = useCallback(e => {
    setItemName(e.target.value)
    if (searched) setSearched(false)
  }, [searched])

  return (
    <form noValidate autoComplete='off'>
      <Grid container direction='column' spacing={2} alignItems='center'>
        <Grid item>
          <TextField
            id='item-search-name'
            label='Tên Item'
            variant='outlined'
            helperText='Tên item trên market'
            value={itemName}
            onChange={onChange}
            error={!item && searched}
            disabled={disabled || fetching}
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
                disabled={disabled}
              >
                Tìm
          </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={onClearClick}
                variant='outlined'
                color='secondary'
                className={classes.btn}
              >
                Xóa
          </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchItemStart: itemName => dispatch(fetchItemStart(itemName)),
  fetchItemSuccess: item => dispatch(fetchItemSuccess(item)),
  enqSnackbar: snack => dispatch(enqSnackbar(snack))
})

const mapStateToProps = createStructuredSelector({
  item: selectItem,
  fetching: selectFetchingState
})

export default connect(mapStateToProps, mapDispatchToProps)(FetchItem)