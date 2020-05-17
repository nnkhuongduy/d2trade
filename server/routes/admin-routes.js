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

adminRouter.post("/user/balance/edit", (req, res) => {
  const steamId = req.body.steamId
  let updateObj = {};

  if (req.body.type === "SET")
    updateObj = { accountBalance: req.body.value }
  if (req.body.type === "MODIFY")
    updateObj = { $inc: { accountBalance: req.body.value } }

  editUser(steamId, updateObj)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
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

module.exports = adminRouter;