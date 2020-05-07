const adminRouter = require('express').Router();
const getUsers = require('../services/get-users');
const errorHandler = require('../services/error-handler')
const editUser = require('../services/edit-user')
const getMarketItem = require('../services/get-market-item')

adminRouter.get("/users", (req, res) => {
  getUsers()
    .then(users => res.json(users))
    .catch(err => errorHandler(err, res, 500))
});

adminRouter.get("/item/:itemName", (req, res) => {
  const itemName = req.params.itemName

  getMarketItem(itemName)
    .then(item => res.json(item))
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
    .catch(err => errorHandler(err))
})


module.exports = adminRouter;