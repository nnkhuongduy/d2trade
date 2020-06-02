const Receipts = require('../models/receipt-model')
const SteamUsers = require('../models/user-model')

const createReceipt = (infos, steamId) => new Promise(async (resolve, reject) => {

  try {
    const user = await SteamUsers.findOne({ steamid: steamId })

    const receipt = {
      userId: user._id,
      steamId: user.steamid,
      total: infos.type === 'MODIFY' ? infos.value : infos.value - user.accountBalance
    }

    const newReceipt = await new Receipts(receipt).save()

    await user.receipts.push(newReceipt._id)
    resolve()
  } catch (err) {
    reject(err)
  }
})

module.exports = createReceipt