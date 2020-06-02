const adminRouter = require('express').Router();
const getUsers = require('../services/get-users');
const errorHandler = require('../services/error-handler')
const editUser = require('../services/edit-user')
const getMarketItem = require('../services/get-market-item')
const newItem = require('../services/new-item')
const getItems = require('../services/get-items')
const deleteItems = require('../services/delete-items')
const putItem = require('../services/put-item')
const AdminGetBotInventory = require('../services/admin-get-bot')
const getOffers = require('../services/get-offers')
const getSiteConfigs = require('../services/get-site-configs')
const putConfig = require('../services/put-config')
const createReceipt = require('../services/create-receipt')

adminRouter.get("/users", (req, res) => {
  getUsers()
    .then(users => res.json(users))
    .catch(err => errorHandler(err, res, 500))
});

adminRouter.get("/items/market/:itemName", (req, res) => {
  const itemName = req.params.itemName

  getMarketItem(itemName)
    .then(item => res.json(item))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/items/', (req, res) => {
  getItems()
    .then(items => res.json(items))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/items/bot', (req, res) => {
  AdminGetBotInventory()
    .then(item => res.json(item))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/offers/', (req, res) => {
  getOffers()
    .then(offers => res.json(offers))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/configs', (req, res) => {
  getSiteConfigs()
    .then(configs => res.json(configs))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.post("/user/balance/edit", async (req, res) => {
  const steamId = req.body.steamId
  let updateObj = {};

  if (req.body.type === "SET")
    updateObj = { accountBalance: req.body.value }
  if (req.body.type === "MODIFY")
    updateObj = { $inc: { accountBalance: req.body.value } }

  try {
    await editUser(steamId, updateObj)

    await createReceipt(req.body, steamId)

    res.sendStatus(200)
  } catch (err) {
    errorHandler(err, res, 500)
  }

})

adminRouter.post('/items/new', (req, res) => {
  newItem(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.post('/items/delete', (req, res) => {
  const items = Object.keys(req.body)

  deleteItems(items)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.put('/items/put', (req, res) => {
  const item = req.body

  putItem(item)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.put('/configs', (req, res) => {
  const config = req.body

  putConfig(config)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

module.exports = adminRouter;