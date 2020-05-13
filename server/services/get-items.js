const Items = require('../models/item-model')

const getItems = () => {
  return new Promise((resolve, reject) => {
    Items.find((err, items) => {
      if (!err) resolve(items)
      else reject(err)
    })
  })
}

module.exports = getItems