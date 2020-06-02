import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/styles'
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button
} from '@material-ui/core'

import { checkTradeUrl } from '../../helpers/helpers'

import { setUrlDialog, postUrlStart } from '../../redux/offer/offer.actions'

import { selectUrlDialog } from '../../redux/offer/offer.selectors'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    boxSizing: 'border-box'
  }
}))

const TradeUrlDialog = ({ open, setState, post }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submitHandle = () => {
    setError(!checkTradeUrl(value))

    if (checkTradeUrl(value)) {
      post(value)
      setState(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => setState(false)} aria-labelledby="trade-url-dialog-title" classes={{ paper: classes.root }}>
      <DialogTitle id='trade-url-dialog-title'>Cập nhật link Trade Offer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Xin vui lòng điền link trade offer steam của bạn vào đây.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="Trade Offer URL"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          error={error}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setState(false)} color="secondary">
          Hủy Bỏ
          </Button>
        <Button onClick={submitHandle} color="secondary" variant='contained'>
          Xác nhận
          </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
  setState: state => dispatch(setUrlDialog(state)),
  post: url => dispatch(postUrlStart(url))
})

const mapStateToProps = createStructuredSelector({
  open: selectUrlDialog
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeUrlDialog)