const Items = require('../models/item-model.js')

const deleteItems = (items) => {
  return new Promise((resolve, reject) => {
    Items.deleteMany({ name: { '$in': items } }, (err) => {
      if (!err) resolve()
      else reject(err)
    })
  })
}

module.exports = deleteItems