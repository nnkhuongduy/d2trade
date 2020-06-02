const Items = require('../models/item-model')

const putItem = item => {
  return new Promise((resolve, reject) => {
    name = item.name.replace('Inscribed ', '')
    Items.findOneAndUpdate({ name: name }, { ...item, name: name }, (err) => {
      if (!err) resolve()
      else reject(err)
    })
  })
}

module.exports = putItem