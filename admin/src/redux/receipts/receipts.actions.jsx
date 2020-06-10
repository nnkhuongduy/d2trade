import { ReceiptsTypes } from './receipts.types'

export const fetchReceiptsStart = () => ({
  type: ReceiptsTypes.FETCH_RECEIPTS_START
})

export const fetchReceiptsSuccess = receipts => ({
  type: ReceiptsTypes.FETCH_RECEIPTS_SUCCESS,
  receipts: receipts
})

export const fetchReceiptsFail = message => ({
  type: ReceiptsTypes.FETCH_RECEIPTS_FAIL,
  message: message
})