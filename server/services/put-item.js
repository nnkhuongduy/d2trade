const Items = require('../models/item-model')

const putItem = item => {
  return new Promise((resolve, reject) => {
    Items.findOneAndUpdate({ name: item.name }, item, (err) => {
      if (!err) resolve()
      else reject(err)
    })
  })
}

module.exports = putItem