const SteamUsers = require('../models/user-model')

const userTransaction = (userId, transactionValue) => {
  return new Promise((resolve, reject) => {
    SteamUsers.findOneAndUpdate({ steamid: userId }, { $inc: { accountBalance: transactionValue } }, (err, user) => {
      if (!err) {
        resolve(user);
      } else reject(err)
    })
  })
}

module.exports = userTransaction;