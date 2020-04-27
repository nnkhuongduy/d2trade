const adminRouter = require('express').Router();
const getUsers = require('../services/get-users');
const errorHandler = require('../services/error-handler')
const editUser = require('../services/edit-user')

adminRouter.get("/users", (req, res) => {
  getUsers()
    .then(users => res.json(users))
    .catch(err => errorHandler(err, res, 500))
});

adminRouter.post("/user/balance/edit", (req, res) => {
  const steamId = req.body.steamId
  const updateObj = {
    accountBalance: req.body.value
  };

  editUser(steamId, updateObj)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err))
})

adminRouter.post("/user/balance/modify", (req, res) => {
  const steamId = req.body.steamId
  const updateObj = { $inc: { accountBalance: req.body.value } }

  editUser(steamId, updateObj)
    .then(() => res.sendStatus(200))
    .catch(err => errorHandler(err))
})

module.exports = adminRouter;