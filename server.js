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
const sendOffer = require('./server/services/send-offer')

const errorsHandler = (err, res, statusCode) => {
  console.log(err);
  res.sendStatus(statusCode)
}

app.get('/inventory/bot', (req, res) => {
  getInventory(CONFIGS.STEAM_INFO.STEAM_BOT_ID)
    .then(inventory => res.json(inventory))
    .catch((err) => errorsHandler(err, res))
})

app.get("/inventory/:steamid", async (req, res) => {
  try {
    const steamId = req.params.steamid;
    const moneyItem = {
      id: 'moneyItem',
      icon_url: 'https://img.topbank.vn/2018/05/03/jDFnkIeH/credit-card-f988.jpg',
      market_hash_name: 'Account Balance',
      tags: [
        { color: 'e4ae39' },
        { color: 'e4ae39', name: "Account Balance" }
      ],
      market_price: '0.00',
      vnd_price: '0'
    }

    const inventory = await getInventory(steamId);

    inventory.unshift(moneyItem)

    res.json(inventory)

  } catch (err) {
    errorsHandler(err, res, 500)

  }
})

app.get("/heroes", (req, res) => {
  getHeroes()
    .then((heroes) => res.json(heroes))
    .catch((err) => errorsHandler(err, res, 500))
})

app.post('/edituser/', (req, res) => {
  const infoObj = req.body;
  const userId = infoObj.userId;
  if (!infoObj || !userId) {
    res.statusMessage = "Invalid post data";
    res.sendStatus(501);
  } else {
    editUser(userId, infoObj.info)
      .then(() => res.sendStatus(200))
      .catch(err => errorsHandler(err, res, 500))
  }
})

app.get('/currency/rate', (req, res) => {
  getCurrencyRate()
    .then(rate => res.json(rate))
    .catch(err => errorsHandler(err, res, 500))
})

// app.get('/users/offers', authCheck, (req, res) => {
//   const steamId = req.user.steamid;

//   getUserOffers(steamId)
//     .then(offers => res.json(offers))
//     .catch(err => errorsHandler(err, res))
// })

app.get('/users/:steamid/offers', (req, res) => {
  const steamId = req.params.steamid;

  getUserOffers(steamId)
    .then(offers => res.json(offers))
    .catch(err => errorsHandler(err, res, 500))
})

app.post("/tradeoffer", async (req, res) => {
  const reqBotItems = req.body.bot;
  const reqUserItems = req.body.user;
  const reqUserData = req.body.userData;

  let isTransactionFinished = false;
  let isError = false;
  let userBalance = null;

  try {
    const items = await checkValidOffer(reqBotItems, reqUserItems, reqUserData)
    userBalance = items.moneyItem && parseInt(items.moneyItem.vnd_price.replace(/,/g, ''))
    console.log("Successfully checking valid offer!")

    if (userBalance !== null) {
      await userTransaction(reqUserData.steamid, userBalance)
      isTransactionFinished = true;
      console.log("Transaction complete!")
    }

    let offer = await createOffer(items.bot, items.user, reqUserData);
    console.log("Created Steam Offer!")

    offer = await sendOffer(offer);
    console.log("Successfully send Steam Offer!")

    await createDBOffer(reqBotItems, reqUserItems, reqUserData, offer.id)
    console.log("Created DB Offer!")

    res.sendStatus(200)
  } catch (err) {
    isError = true;
    errorsHandler(err, res, 500)
  } finally {
    console.log("finally staged")
    console.log(`isTransactionFinished: ${isTransactionFinished}`)
    console.log(`isError: ${isError}`)
    if (isTransactionFinished && isError)
      await userTransaction(reqUserData.steamid, -Math.abs(userBalance))
        .then(() => console.log("Successfully refunded!"))
        .catch(() => console.log(`REFUND FAILED! USER'S ID: ${reqUserData.steamid}`))
  }
})

app.listen(CONFIGS.PORT, () => console.log(`Server started on port ${CONFIGS.PORT}`));