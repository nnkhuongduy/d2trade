const Items = require('../models/item-model')

const newItem = item => {
  return new Promise((resolve, reject) => {
    Items.findOne({ name: item.name }, (err, dataItem) => {
      if (!err) {
        if (!dataItem) {
          new Items({
            ...item
          }).save((err) => {
            if (!err) resolve()
            else reject()
          })
        } else reject()
      } else reject()
    })
  })
}

module.exports = newItem