const CONFIGS = require('./server/configs/configs')
const app = require('./server/configs/express-setup')
const getInventory = require('./server/services/get-inventory')
const getHeroes = require('./server/services/get-heroes')
const editUser = require('./server/services/edit-user')
const getCurrencyRate = require('./server/services/get-currency-rate')
const getUserOffers = require('./server/services/get-user-offers')
const createOffer = require('./server/services/create-offer')
const checkValidOffer = require('./server/services/check-valid-offer')
const userTransaction = require('./server/services/user-transaction')
const createDBOffer = require('./server/services/create-db-offer')
const updateDBOffer = require('./server/services/update-db-offer')
const sendOffer = require('./server/services/send-offer')
const errorHandler = require('./server/services/error-handler')
const SiteConfigs = require('./server/models/site-configs-model')
const Heroes = require('./server/models/hero-model.js')
const createReceipt = require('./server/services/create-receipt')
const bcrypt = require('bcrypt')

app.get('/inventory/bot', (req, res) => {
  getInventory(CONFIGS.STEAM_INFO.STEAM_BOT_ID)
    .then(inventory => res.json(inventory))
    .catch((err) => errorHandler(err, res, 500))
})

app.get("/inventory/:steamid", (req, res) => {
  const moneyItem = {
    assetId: "moneyItem",
    iconUrl: "https://infinancialservices.com/wp-content/uploads/2019/10/CreditCardsStack.jpg",
    name: "Số dư tài khoản",
    prices: {
      usd: 0,
      vnd: 0
    },
    rarity: "Immortal"
  }

  getInventory(req.params.steamid)
    .then(inventory => {
      inventory.unshift(moneyItem)
      res.json(inventory)
    })
    .catch((err) => errorHandler(err, res, 500))
})

app.get("/heroes", (req, res) => {
  getHeroes()
    .then((heroes) => res.json(heroes))
    .catch((err) => errorHandler(err, res, 500))
})

app.get('/currency/rate', (req, res) => {
  getCurrencyRate()
    .then(rate => res.json(rate))
    .catch(err => errorHandler(err, res, 500))
})

app.get('/currency/rate/new', (req, res) => {
  const rate = new SiteConfigs({
    name: 'currencyRate',
    value: 22
  }).save((err) => {
    if (!err) res.sendStatus(200)
    else res.sendStatus(500)
  })
})

// app.get('/users/offers', authCheck, (req, res) => {
//   const steamId = req.user.steamid;

//   getUserOffers(steamId)
//     .then(offers => res.json(offers))
//     .catch(err => errorHandler(err, res))
// })

app.get('/users/:steamid/offers', (req, res) => {
  const steamId = req.params.steamid;

  getUserOffers(steamId)
    .then(offers => res.json(offers))
    .catch(err => errorHandler(err, res, 500))
})

app.post('/edituser', (req, res) => {
  const infoObj = req.body;
  const userId = infoObj.userId;
  if (!infoObj || !userId) {
    res.statusMessage = "Invalid post data";
    res.sendStatus(501);
  } else {
    editUser(userId, infoObj.info)
      .then(() => res.sendStatus(200))
      .catch(err => errorHandler(err, res, 500))
  }
})

app.post("/tradeoffer", async (req, res) => {
  const offer = req.body
  const { steamId, bot, user, balance } = offer

  let isTransactionFinished = false;

  const dbOffer = await createDBOffer(offer)
  console.log(`Initialized offer _ID: ${dbOffer._id}`)

  try {
    await checkValidOffer(offer)
      .then(() => updateDBOffer(dbOffer._id, { status: "Valid" }))
      .catch(() => {
        updateDBOffer(dbOffer._id, { status: "Invalid" })
        throw `Offer _ID: ${dbOffer._id} is INVALID!`
      })
    console.log(`Offer _ID: ${dbOffer._id} is VALID!`)

    await userTransaction(steamId, -Math.abs(balance))
      .then(() => updateDBOffer(dbOffer._id, { status: "Transaction Complete" }))
      .catch(() => {
        updateDBOffer(dbOffer._id, { status: "Transaction Failure" })
        throw `Transaction failed! Offer ID: ${dbOffer._id}`
      })
    isTransactionFinished = true;
    console.log(`Transaction complete! Offer ID: ${dbOffer._id}`)

    let steamOffer = await createOffer(bot, user, steamId)

    if (steamOffer) await updateDBOffer(dbOffer._id, { status: "Created" })
    else {
      await updateDBOffer(dbOffer._id, { status: "Fail To Create" })
      throw "Fail to create offer!"
    }
    console.log(`Created Steam Offer ID: ${dbOffer._id}`)

    if (balance > 0) {
      await createReceipt(-Math.abs(balance), steamId)
        .then(receipt => console.log(`Receipt successfully created, ID: ${receipt._id}`))
        .catch(err => {
          throw 'Receipt fail to create!'
        })
    }

    // steamOffer = await sendOffer(steamOffer);
    // await updateDBOffer(dbOffer._id, { offer_id: steamOffer.id })
    // console.log(`Successfully send Steam Offer ID: ${steamOffer.id} !`)

    res.sendStatus(200)
  } catch (err) {
    if (isTransactionFinished)
      await userTransaction(steamId, balance)
        .then(() => {
          updateDBOffer(dbOffer._id, { status: "Refunded" })
          console.log(`Refuned offer ID: ${dbOffer._id}`)
        })
        .catch(err => {
          updateDBOffer(dbOffer._id, { status: "Refund Failed" })
          console.log(`REFUND FAILED! OFFER'S ID: ${dbOffer._id}`)
        })

    errorHandler(err, res, 500);
  }
})

app.listen(CONFIGS.PORT, () => console.log(`Server started on port ${CONFIGS.PORT}`));