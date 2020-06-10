const Receipts = require('../models/receipt-model')
const SteamUsers = require('../models/user-model')

const createReceipt = (total, steamId) => new Promise(async (resolve, reject) => {

  try {
    const user = await SteamUsers.findOne({ steamid: steamId })

    const receipt = {
      userId: user._id,
      steamId: steamId,
      total: total
    }

    const newReceipt = await new Receipts(receipt).save()

    await user.receipts.push(newReceipt._id)
    resolve(newReceipt)
  } catch (err) {
    reject(err)
  }
})

module.exports = createReceipt