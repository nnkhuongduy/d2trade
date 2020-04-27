const Users = require('../models/user-model')

const getUsers = () => {
  return new Promise((resolve, reject) => {
    Users.find((err, result) => {
      if (!err)
        resolve(result)
      else reject(err)
    })
  })
}

module.exports = getUsers