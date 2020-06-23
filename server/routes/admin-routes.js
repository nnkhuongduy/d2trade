const adminRouter = require('express').Router();
const passport = require('../configs/passport-setup')
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
const clearErrorOffers = require('../services/clear-error-offers')
const getReceipts = require('../services/get-receipts')
const adminNewPassword = require('../services/admin-new-password')
const adminAuthorize = require('../services/admin-authorize')

const authCheck = (req, res, next) => {
  adminAuthorize(req.user)
    .then(() => next())
    .catch(() => res.sendStatus(401))
}

adminRouter.get("/users", authCheck, (req, res) => {
  getUsers()
    .then(users => res.json(users))
    .catch(err => errorHandler(err, res, 500))
});

adminRouter.get("/items/market/:itemName", authCheck, (req, res) => {
  const itemName = req.params.itemName

  getMarketItem(itemName)
    .then(item => res.json(item))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/items/', authCheck, (req, res) => {
  getItems()
    .then(items => res.json(items))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/items/bot', authCheck, (req, res) => {
  AdminGetBotInventory()
    .then(item => res.json(item))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/offers/', authCheck, (req, res) => {
  getOffers()
    .then(offers => res.json(offers))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/configs', authCheck, (req, res) => {
  getSiteConfigs()
    .then(configs => res.json(configs))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/offers/clear', authCheck, (req, res) => {
  clearErrorOffers()
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/receipts', authCheck, (req, res) => {
  getReceipts()
    .then(receipts => res.json(receipts))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.get('/login', authCheck, (req, res) => {
  res.json(req.user)
})

adminRouter.post("/user/balance/edit", authCheck, async (req, res) => {
  const steamId = req.body.steamId
  let updateObj = {};

  if (req.body.type === "SET")
    updateObj = { accountBalance: req.body.value }
  if (req.body.type === "MODIFY")
    updateObj = { $inc: { accountBalance: req.body.value } }

  try {
    await editUser(steamId, updateObj)

    await createReceipt(req.body.value, steamId)

    res.sendStatus(200)
  } catch (err) {
    errorHandler(err, res, 500)
  }

})

adminRouter.post('/items/new', authCheck, (req, res) => {
  newItem(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.post('/items/delete', authCheck, (req, res) => {
  const items = Object.keys(req.body)

  deleteItems(items)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200)
})

adminRouter.put('/items/put', authCheck, (req, res) => {
  const item = req.body

  putItem(item)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.put('/configs', authCheck, (req, res) => {
  const config = req.body

  putConfig(config)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

adminRouter.put('/password', authCheck, (req, res) => {
  const password = req.body.password

  adminNewPassword(password)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err, res, 500))
})

module.exports = adminRouter;