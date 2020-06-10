const Receipts = require('../models/receipt-model')

const getReceipts = () => new Promise((resolve, reject) => {
  Receipts.find({}).sort({ createdAt: -1 }).exec((err, receipts) => {
    if (!err && receipts) resolve(receipts)
    else reject(err && err)
  })
})

module.exports = getReceipts