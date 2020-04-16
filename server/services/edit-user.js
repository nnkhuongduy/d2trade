const SteamUsers = require('../models/user-model')

const editUser = (userId, updateObj) => {
  return new Promise((resolve, reject) => {
    SteamUsers.findOneAndUpdate({ steamid: userId }, updateObj, (err) => {
      if (!err)
        resolve()
      else
        reject(err)
    })
  })
}

module.exports = editUser