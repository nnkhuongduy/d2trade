const SteamUsers = require('../models/user-model')
const Items = require('../models/item-model')

const checkBalance = (steamId, balance) => new Promise(async (resolve, reject) => {
  try {
    const user = await SteamUsers.findOne({ steamid: steamId });

    if (user.accountBalance >= balance) resolve()
    else reject()

  } catch (err) {
    reject(err)
  }
})

const checkItems = (botItems, userItems, balance) => new Promise(async (resolve, reject) => {
  const botNames = botItems.map(item => item.name.replace("Inscribed ", ""))
  const userNames = userItems.map(item => item.name.replace("Inscribed ", ""))
  let botHash = {};
  let userHash = {};
  let botDBHash = {};
  let userDBHash = {};
  let valid = true;

  try {
    const botItemsDB = await Items.find({ name: { "$in": botNames } })
    const userItemsDB = await Items.find({ name: { "$in": userNames } })

    await botItems.forEach(item => botHash[item.name.replace("Inscribed ", "")] = item.prices.vnd);
    await userItems.forEach(item => userHash[item.name.replace("Inscribed ", "")] = item.prices.vnd);
    await botItemsDB.forEach(item => botDBHash[item.name] = item.prices.vnd);
    await userItemsDB.forEach(item => userDBHash[item.name] = item.prices.vnd);

    await botNames.forEach(name => valid = botHash[name] !== botDBHash[name] ? false : valid)
    await userNames.forEach(name => valid = userHash[name] !== userDBHash[name] ? false : valid)

    const balanceDB = await botItemsDB.reduce((accumulator, item) => accumulator += item.prices.vnd, 0);
    const userItemsDBTotal = await userItemsDB.reduce((accumulator, item) => accumulator += item.prices.vnd, 0);
    if (balanceDB > balance + userItemsDBTotal) valid = false;

    if (valid) resolve();
    else reject("Invalid!")
  } catch (err) {
    reject(err)
  }
})

const checkValidOffer = (offer) => new Promise(async (resolve, reject) => {
  try {
    await checkItems(offer.bot, offer.user, offer.balance)
    await checkBalance(offer.steamId, offer.balance);
    resolve();
  } catch (err) {
    reject(err)
  }
})

module.exports = checkValidOffer