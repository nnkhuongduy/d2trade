const Items = require('../models/item-model')

const newItem = item => {
  return new Promise((resolve, reject) => {
    Items.findOne({ name: item.name }, (err, dataItem) => {
      if (!err) {
        if (!dataItem) {
          new Items({
            ...item,
            iconUrl: item.icon_url ? item.icon_url : item.iconUrl,
            name: item.name.replace('Inscribed ', '')
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