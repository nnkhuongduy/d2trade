const CONFIGS = require('./server/configs/configs')
const app = require('./server/configs/express-setup')
const manager = require('./server/configs/steam-setup/steam-manager')
const getInventory = require('./server/services/get-inventory')
const getHeroes = require('./server/services/get-heroes')
const editUser = require('./server/services/edit-user')
const getCurrencyRate = require('./server/services/get-currency-rate')
const getUserOffers = require('./server/services/get-user-offers')
const createOffer = require('./server/services/create-offer')

const errorsHandler = (err, res) => {
  console.log(err);
  res.send(500)
}

app.get('/inventory/bot', (req, res) => {
  getInventory(CONFIGS.STEAM_INFO.STEAM_BOT_ID)
    .then(inventory => res.json(inventory))
    .catch((err) => errorsHandler(err, res))
})

app.get("/inventory/:steamid", (req, res) => {
  const steamId = req.params.steamid;

  getInventory(steamId)
    .then(inventory => res.json(inventory))
    .catch((err) => errorsHandler(err, res))
})

app.get("/heroes", (req, res) => {
  getHeroes()
    .then((heroes) => res.json(heroes))
    .catch((err) => errorsHandler(err, res))
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
      .catch(err => errorsHandler(err, res))
  }
})

app.get('/currency/rate', (req, res) => {
  getCurrencyRate()
    .then(rate => res.json(rate))
    .catch(err => errorsHandler(err, res))
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
    .catch(err => errorsHandler(err, res))
})

app.post("/tradeoffer", (req, res) => {
  const reqBotItems = req.body.bot;
  const reqUserItems = req.body.user;
  const reqUserData = req.body.userData;

  createOffer(reqBotItems, reqUserItems, reqUserData)

  //   manager.getInventoryContents(steamInfo.appId, steamInfo.contextId, true, (err, botInventory) => {
  //     if (err) {
  //       console.log(err);
  //       res.sendStatus(503);
  //     } else {
  //       const offer = manager.createOffer(reqUserData.tradeOfferUrl)
  //       let botItems = [];
  //       let userItems = [];

  //       reqBotItems.forEach(reqItem => {
  //         botInventory.forEach(item => {
  //           if (item.id === reqItem.id) {
  //             botItems.push(item);
  //           }
  //         })
  //       })

  //       manager.getUserInventoryContents(reqUserData.steamid, steamInfo.appId, steamInfo.contextId, true, (err, userInventory) => {
  //         if (err) {
  //           console.log(err);
  //           res.sendStatus(503);
  //         } else {
  //           reqUserItems.filter(item => item.id !== "moneyItem").forEach(reqItem => {
  //             userInventory.forEach(item => {
  //               if (item.id === reqItem.id) {
  //                 userItems.push(item);
  //               }
  //             })
  //           })

  //           if (botItems.length === reqBotItems.length &&
  //             ((moneyCheck === false && userItems.length === reqUserItems.length) || (moneyCheck === true && userItems.length === reqUserItems.length - 1))) {
  //             if (moneyCheck) {
  //               moneyCheck = parseFloat(moneyItem.market_price) === parseFloat((botTotalPriceUSD - userTotalPriceUSDWithoutMoney).toFixed(2)) &&
  //                 parseInt(moneyItem.vnd_price.replace(/,/g, '')) === botTotalPriceVND - userTotalPriceVNDWithoutMoney
  //               TransactionFunc(reqUserData, moneyCheck, moneyItem, 'transaction', (status) => {
  //                 if (!status) {
  //                   console.log("transaction failed")
  //                   res.sendStatus(503);
  //                 }
  //                 else {
  //                   sendOffer(offer, reqUserData, botItems, userItems, (status) => {
  //                     if (status === 200) res.sendStatus(status)
  //                     else {
  //                       TransactionFunc(reqUserData, moneyCheck, moneyItem, 'refund', (status) => {
  //                         if (!status) {
  //                           console.log("error refund! need to fix database!")
  //                           res.sendStatus(500)
  //                         } else {
  //                           console.log("refund error")
  //                           res.sendStatus(503)
  //                         }
  //                       })
  //                     }
  //                   })
  //                 }
  //               })
  //             } else sendOffer(offer, reqUserData, botItems, userItems, (status) => res.sendStatus(status))
  //           } else {
  //             console.log("Missing item(s)");
  //             res.sendStatus(500);
  //           }
  //         }
  //       })
  //     }
  //   })
  // }
})

app.listen(CONFIGS.PORT, () => console.log(`Server started on port ${CONFIGS.PORT}`));