const Heroes = require('../models/hero-model')

const getHeroes = () => {
  return new Promise((resolve, reject) => {
    Heroes.find({}, (err, heroes) => {
      if (!err) resolve(heroes)
      else reject(err)
    })
  })
}

module.exports = getHeroes