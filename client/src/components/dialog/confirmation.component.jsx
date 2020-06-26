import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  Dialog, DialogActions, DialogContent, DialogContentText, Button
} from '@material-ui/core'

import CancelButton from '../buttons/cancel-button.component'

import { toggleConfirmation } from '../../redux/dialog/dialog.actions'

import { selectConfirmationState, selectConfirmationText, selectConfirmationFunc } from '../../redux/dialog/dialog.selectors'

const ConfirmationDialog = ({ toggleConfirmation, state, text, func }) => {

  const onConfirm = () => {
    func();
    toggleConfirmation();
  }

  return (
    <Dialog
      open={state}
      onClose={() => toggleConfirmation()}
      keepMounted
      aria-labelledby="confirmation-dialog"
    >
      <DialogContent>
        <DialogContentText>
          {text ? text : 'Bạn có chắc chắn muốn thực hiện hành động này?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton
          onClick={() => toggleConfirmation()}
        >Hủy bỏ</CancelButton>
        <Button
          color='primary'
          variant='contained'
          onClick={onConfirm}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleConfirmation: () => dispatch(toggleConfirmation())
})

const mapStateToProps = createStructuredSelector({
  state: selectConfirmationState,
  text: selectConfirmationText,
  func: selectConfirmationFunc
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog)