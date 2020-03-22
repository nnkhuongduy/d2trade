require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const InventoryAPI = require('steam-inventory-api-ng');
const market = require('steam-market-pricing');
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const inventoryApi = new InventoryAPI();

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
  steam: client,
  community: community,
  language: 'en'
});

const steamLogOnOptions = {
  accountName: process.env.STEAM_USER_NAME,
  password: process.env.STEAM_PASSWORD,
  twoFactorCode: SteamTotp.generateAuthCode(process.env.STEAM_SHARED_SECRET)
}

client.logOn(steamLogOnOptions);

client.on("loggedOn", () => {
  console.log("Logged into bot steam");
})

client.on("webSession", (sessionid, cookies) => {
  manager.setCookies(cookies);

  community.setCookies(cookies);
  community.startConfirmationChecker(10000, process.env.STEAM_IDENTITY_SECRET);
})

mongoose.connect("mongodb://localhost:27017/botinventoryDB", { useNewUrlParser: true, useUnifiedTopology: true });

const port = 5000;
const steamInfo = {
  steamId: '76561198105770372',
  steamId2: '76561198083658783',
  appId: 570,
  contextId: 2
}

const botItemsSchema = new mongoose.Schema({
  item: Object
})

const BotItems = mongoose.model("BotItem", botItemsSchema);
const UserItems = mongoose.model("UserItem", botItemsSchema);

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/inventory', (req, res) => {
  let inventory = [];

  BotItems.find({}, (err, items) => {
    res.json(items);
  })

  // inventoryApi.get(steamInfo.steamId, steamInfo.appId, steamInfo.contextId, true, 10)
  //   .then(steamRes => {
  //     JSON.stringify(steamRes.inventory.map(item => {
  //       const botitem = new BotItems({
  //         item: item
  //       })
  //       console.log("Sucessfully added item to database");
  //       botitem.save();
  //     }));
  //   })
  //   .then(steamRes => res.json(inventory))
  //   .catch(err => console.log(err));

  // inventoryApi.get(steamInfo.steamId, steamInfo.appId, steamInfo.contextId, true, 10)
  //   .then(steamRes => {
  //     JSON.stringify(steamRes.inventory.map(item => inventory.push(item)));
  //   })
  //   .then(steamRes => res.json(inventory))
  //   .catch(err => console.log(err));
})

app.get('/itemprice/:id', (req, res) => {
  const itemName = req.params.id;
  const condition = { "name": `${itemName}` }

  async function handle() {
    try {
      const isExistInDB = await ItemPrice.exists(condition);

      if (isExistInDB) {
        ItemPrice.findOne(condition, (err, item) => {
          if (!err) {
            res.json(item);
          } else {
            console.log(err);
          }
        })
      } else {
        // market.getItemPrice(steamInfo.appId, itemName)
        //   .then(data => {
        //     const item = new ItemPrice({
        //       name: itemName,
        //       price: data
        //     });
        //     item.save();
        //     console.log("Sucessfully added item price into database!");
        //     res.json(item);
        //   })
        //   .catch(err => { console.log(err) });
        res.json({
          name: itemName,
          price: {
            sucess: true,
            lowest_price: "$0.1",
            volume: 111,
            median_price: "$123",
            market_hash_name: itemName
          }
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  handle();
})

app.get("/inventory2", (req, res) => {
  UserItems.find({}, (err, items) => {
    res.json(items);
  })
})

app.post("/tradeoffer", (req, res) => {


  manager.loadInventory(steamInfo.appId, steamInfo.contextId, true, (err, botInventory) => {
    if (err) {
      console.log(err);
      res.sendStatus(503);
    } else {
      const offer = manager.createOffer(steamInfo.steamId2)
      let botItems = [];
      let userItems = [];

      req.body.bot.forEach(id => {
        botInventory.forEach(item => {
          if (item.id === id) {
            botItems.push(item);
          }
        })
      })

      manager.loadUserInventory(steamInfo.steamId2, steamInfo.appId, steamInfo.contextId, true, (err, userInventory) => {
        if (err) {
          console.log(err);
          res.sendStatus(503);
        } else {
          req.body.user.forEach(id => {
            userInventory.forEach(item => {
              if (item.id === id) {
                userItems.push(item);
              }
            })
          })

          if (botItems.length === req.body.bot.length && userItems.length === req.body.user.length) {
            offer.addMyItems(botItems);
            offer.addTheirItems(userItems);
            offer.setMessage("Test");
            offer.send((err) => {
              if (err) {
                console.log(err);
                res.sendStatus(500);
              } else {
                console.log("Sent");
                res.sendStatus(200);
              }
            });
          } else {
            console.log("Missing item(s)");
            res.sendStatus(500);
          }
        }
      })
    }
  })
})