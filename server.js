require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy;
const cors = require("cors");
const session = require('express-session')
const cookieParser = require("cookie-parser");

const market = require('steam-market-pricing');
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);
app.use(session({
  name: "d2trade sessions",
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  maxAge: 24 * 60 * 60 * 100
}))

app.use(cookieParser())

const uri = `mongodb+srv://${process.env.MONGODB_ADMIN_USERNAME}:${process.env.MONGODB_ADMIN_PASSWORD}@cluster0-alnrp.mongodb.net/test?retryWrites=true&w=majority`;
//const uri = `mongodb://127.0.0.1:27017/`;

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
  "steam": client,
  "domain": "yespubg.com",
  "language": 'en'
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
  manager.setCookies(cookies)

  community.setCookies(cookies);
  //community.startConfirmationChecker(10000, process.env.STEAM_IDENTITY_SECRET);
})

community.on("sessionExpired", err => {
  client.webLogOn();
})

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => console.log("connected to mongodb atlas"));

const port = 5000;
const steamInfo = {
  steamId: process.env.BOT_STEAM_ID,
  appId: 570,
  contextId: 2
}

const itemsSchema = new mongoose.Schema({}, { strict: false })

const heroesSchema = new mongoose.Schema({}, { strict: false })

const steamUserSchema = new mongoose.Schema({}, { strict: false })

const BotItems = mongoose.model("BotItem", itemsSchema);
const UserItems = mongoose.model("UserItem", itemsSchema);
const Heroes = mongoose.model("Hero", heroesSchema, "Hero");
const SteamUsers = mongoose.model("SteamUser", steamUserSchema);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  SteamUsers.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:5000/auth/steam/return',
  realm: 'http://localhost:5000/',
  apiKey: process.env.STEAM_API_KEY
}, async (indentifier, profile, done) => {
  const currentUser = await SteamUsers.findOne({ steamid: profile._json.steamid });

  if (!currentUser) {
    const newUser = await new SteamUsers({
      ...profile._json,
      accountBalance: 0,
      tradeOfferUrl: "",
    }).save();

    if (newUser) done(null, newUser);
  } else {
    done(null, currentUser);
  }
}))

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

app.use(passport.initialize());
app.use(passport.session());
app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/inventory/bot', (req, res) => {
  // BotItems.find({}, (err, items) => {
  //   res.json(items);
  // })

  manager.getInventoryContents(steamInfo.appId, steamInfo.contextId, true, (err, inventory) => {
    if (err) {
      res.statusMessage = "Can't get bot inventory";
      res.sendStatus(503);

    } else {
      const itemsOnBlackList = {};

      manager.getOffersContainingItems(inventory, false, (err, sent, received) => {
        if (err) {
          res.statusMessage = "Can't get offers containing bot item(s)";
          res.sendStatus(503);
        } else {
          sent.forEach(offer => offer.itemsToGive.forEach(item => itemsOnBlackList[item.id] ? itemsOnBlackList[item.id]++ : itemsOnBlackList[item.id] = 1))

          inventory = inventory.filter(item => !itemsOnBlackList[item.id]);

          res.json(inventory)
        }
      })

    }
  })
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

app.get("/inventory/:steamid", (req, res) => {
  // UserItems.find({}, (err, items) => {
  //   res.json(items);
  // })
  const moneyItem = {
    id: 'moneyItem',
    icon_url: 'https://img.topbank.vn/2018/05/03/jDFnkIeH/credit-card-f988.jpg',
    market_hash_name: 'Account Balance',
    tags: [
      { color: 'e4ae39' },
      { color: 'e4ae39', name: "Immortal" }
    ],
    market_price: '0',
  }
  const steamId = req.params.steamid

  manager.getUserInventoryContents(steamId, steamInfo.appId, steamInfo.contextId, true, (err, inventory) => {
    if (err) {
      res.statusMessage = "Can't get user inventory";
      res.sendStatus(503);

    } else {
      const itemsOnBlackList = {};

      manager.getOffersContainingItems(inventory, false, (err, sent, received) => {
        if (err) {
          res.statusMessage = "Can't get offers containing user item(s)";
          res.sendStatus(503);
        } else {
          sent.forEach(offer => offer.itemsToReceive.forEach(item => itemsOnBlackList[item.id] ? itemsOnBlackList[item.id]++ : itemsOnBlackList[item.id] = 1))

          inventory = inventory.filter(item => !itemsOnBlackList[item.id]);

          inventory.unshift(moneyItem)

          res.json(inventory)
        }
      })

    }
  })
})

app.post("/tradeoffer", (req, res) => {
  //check balance

  manager.getInventoryContents(steamInfo.appId, steamInfo.contextId, true, (err, botInventory) => {
    if (err) {
      console.log(err);
      res.sendStatus(503);
    } else {
      const offer = manager.createOffer(req.body.userData.tradeOfferUrl)
      let botItems = [];
      let userItems = [];

      req.body.bot.forEach(id => {
        botInventory.forEach(item => {
          if (item.id === id) {
            botItems.push(item);
          }
        })
      })

      manager.getUserInventoryContents(req.body.userData.steamid, steamInfo.appId, steamInfo.contextId, true, (err, userInventory) => {
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
            offer.send((err, status) => {
              if (err) {
                console.log(err);
                res.sendStatus(500);
              } else {
                if (status === "pending") {
                  community.acceptConfirmationForObject(process.env.STEAM_IDENTITY_SECRET, offer.id, (err) => {
                    if (err) {
                      console.log(err);
                      res.sendStatus(500);
                    }
                    console.log("Sent");
                    res.sendStatus(200);
                  })
                }
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

app.get("/heroes", (req, res) => {
  Heroes.find({}, (err, hero) => res.json(hero));
})

app.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

app.get('/auth/login/failed', (req, res) => {
  res.sendStatus(401).json({
    sucess: false,
    message: "user failed to authenticated"
  })
})

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});


app.get('/auth/steam', passport.authenticate('steam'))

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/auth/login/failed', successRedirect: 'http://localhost:3000/' }));

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

app.post('/edituser/', (req, res) => {
  const infoObj = req.body;
  const userId = infoObj.userId;
  if (!infoObj || !userId) {
    res.statusMessage = "Invalid post data";
    res.sendStatus(501);
  } else {
    SteamUsers.findOneAndUpdate({ steamid: userId }, infoObj.info, (err) => {
      if (err) {
        console.log(err);
        res.statusMessage = "Error find user in database";
        res.sendStatus(501);
      } else {
        res.sendStatus(200);
      }
    })
  }
})