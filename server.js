require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const SteamStrategy = require('passport-steam').Strategy;
const cors = require("cors");
const session = require('express-session')
const cookieParser = require("cookie-parser");
const axios = require('axios')

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

manager.on('sentOfferChanged', (offer, oldState) => {
  SteamOffers.findOneAndUpdate({ offer_id: offer.id }, { status: TradeOfferManager.ETradeOfferState[offer.state] }, (err) => {
    if (!err) {
      console.log("Successfully update offer state in db!")
    } else {
      console.log(err);
    }
  })

  console.log(`Offer #${offer.id} changed: ${TradeOfferManager.ETradeOfferState[oldState]} -> ${TradeOfferManager.ETradeOfferState[offer.state]}`);
})

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => console.log("connected to mongodb atlas"));

const port = 5000;
const steamInfo = {
  steamId: process.env.BOT_STEAM_ID,
  appId: 570,
  contextId: 2
}

const heroesSchema = new mongoose.Schema({}, { strict: false })
const steamUserSchema = new mongoose.Schema({}, { strict: false })
const siteSettingSchema = new mongoose.Schema({
  currencyRate: Number
})
const steamOffersSchema = new mongoose.Schema({
  offer_index: Number,
  offer_id: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SteamUser' },
  steam_id: String,
  date: { type: Date, default: Date.now, expires: 24 * 60 * 60 },
  bot_items: [{
    id: String,
    image_url: String
  }],
  user_items: [{
    id: String,
    image_url: String
  }],
  status: String,
})

const Heroes = mongoose.model("Hero", heroesSchema, "Hero");
const SteamUsers = mongoose.model("SteamUser", steamUserSchema, "SteamUsers");
const SiteSettings = mongoose.model("SiteSettings", siteSettingSchema, "SiteSettings");
const SteamOffers = mongoose.model("SteamOffers", steamOffersSchema, "SteamOffers");

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
      steamid: profile._json.steamid,
      personaname: profile._json.personaname,
      profileurl: profile._json.profileurl,
      avatar: profile._json.avatar,
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

const TransactionFunc = (reqUserData, moneyCheck, moneyItem, type, callback) => {
  let updateObj = {};
  let isCallback = false;

  if (type === "transaction")
    updateObj = { accountBalance: reqUserData.accountBalance - parseInt(moneyItem.vnd_price.replace(/,/g, '')) }
  if (type === "refund")
    updateObj = { accountBalance: reqUserData.accountBalance + parseInt(moneyItem.vnd_price.replace(/,/g, '')) }
  if (callback && typeof callback === 'function') isCallback = true;

  if (moneyCheck && updateObj.accountBalance !== undefined)
    SteamUsers.findOneAndUpdate({ steamid: reqUserData.steamid }, updateObj, (err) => {
      if (err) {
        console.log(err);
        isCallback && callback(false)
      } else {
        console.log(type === 'transaction' ? 'transaction completed!' : "refund completed!")
        isCallback && callback(true)
      }
    })
  else isCallback && callback(false)
}

const sendOffer = (offer, user, botItems, userItems, callback) => {
  let isCallback = false
  if (callback && typeof callback === 'function') isCallback = true;

  offer.addMyItems(botItems);
  offer.addTheirItems(userItems);
  offer.setMessage("Test");

  SteamOffers.estimatedDocumentCount((err, count) => {
    if (err) {
      console.log(err);
      isCallback && callback(500)
    } else {
      const offerBotItems = [];
      const offerUserItems = [];

      botItems.forEach(item => {
        const obj = {
          id: item.id,
          image_url: `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`
        }

        offerBotItems.push(obj);
      })
      userItems.forEach(item => {
        const obj = {
          id: item.id,
          image_url: `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`
        }

        offerUserItems.push(obj);
      })

      const newOffer = SteamOffers({
        offer_index: count + 1,
        user_id: user._id,
        steam_id: user.steamid,
        bot_items: offerBotItems,
        user_items: offerUserItems,
        status: "Created",
      })

      newOffer.save((err) => {
        if (err) console.log(err);
        else
          offer.send((err, status) => {
            if (err) {
              console.log(err);
              isCallback && callback(500)
            } else {
              if (status === "pending") {
                community.acceptConfirmationForObject(process.env.STEAM_IDENTITY_SECRET, offer.id, (err) => {
                  if (err) {
                    console.log(err);
                    isCallback && callback(500)
                  } else
                    SteamOffers.findOneAndUpdate({ offer_index: count + 1 }, { offer_id: offer.id }, (err) => {
                      if (err) console.log(err);
                      else {
                        console.log("Sent");
                        isCallback && callback(200);
                      }
                    })
                })
              }
            }
          });
      })
    }
  })
}

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
          console.log(err)
          res.statusMessage = "Can't get offers containing bot item(s)";
          res.sendStatus(503);
        } else {
          sent.forEach(offer => offer.itemsToGive.forEach(item => itemsOnBlackList[item.id] ? itemsOnBlackList[item.id]++ : itemsOnBlackList[item.id] = 1))

          inventory = inventory.filter(item => !itemsOnBlackList[item.id]);

          SiteSettings.findById(process.env.MONGODB_CURRENCY_RATE_ID, (err, rate) => {
            if (!err) {
              inventory.forEach(item => {
                const randPrice = (Math.random() * (10 - 0.01) + 0.01).toFixed(2)
                item.market_price = item.id !== 'moneyItem' ? randPrice : "0.00";
                item.vnd_price = Math.round((parseFloat(randPrice) * rate.currencyRate * 1000)).toLocaleString();
              })

              res.json(inventory)
            } else res.sendStatus(503)
          })
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
      { color: 'e4ae39', name: "Account Balance" }
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

          SiteSettings.findById(process.env.MONGODB_CURRENCY_RATE_ID, (err, rate) => {
            if (!err) {
              inventory.forEach(item => {
                const randPrice = (Math.random() * (10 - 0.01) + 0.01).toFixed(2)
                item.market_price = item.id !== 'moneyItem' ? randPrice : "0.00";
                item.vnd_price = item.id !== 'moneyItem' ? Math.round((parseFloat(randPrice) * rate.currencyRate * 1000)).toLocaleString() : '0';
              })

              res.json(inventory)
            } else res.sendStatus(503)
          })
        }
      })

    }
  })
})

app.post("/tradeoffer", (req, res) => {
  const reqBotItems = req.body.bot;
  let reqUserItems = req.body.user;
  const reqUserData = req.body.userData;

  reqUserItems = reqUserItems.filter(item => item.market_price !== "0.00" || item.vnd_price !== "0");

  //Check database for prices

  const botTotalPriceUSD = parseFloat((reqBotItems.reduce((accumulator, item) => accumulator + parseFloat(item.market_price), 0)).toFixed(2));
  const userTotalPriceUSD = parseFloat((reqUserItems.reduce((accumulator, item) => accumulator + parseFloat(item.market_price), 0)).toFixed(2));
  const userTotalPriceUSDWithoutMoney = parseFloat(
    (reqUserItems.filter(item => item.id !== "moneyItem").reduce((accumulator, item) => accumulator + parseFloat(item.market_price), 0)).toFixed(2)
  );

  const botTotalPriceVND = reqBotItems.reduce((accumulator, item) => accumulator + parseInt(item.vnd_price.replace(/,/g, "")), 0);
  const userTotalPriceVND = reqUserItems.reduce((accumulator, item) => accumulator + parseInt(item.vnd_price.replace(/,/g, "")), 0);
  const userTotalPriceVNDWithoutMoney = reqUserItems.filter(item =>
    item.id !== "moneyItem").reduce((accumulator, item) => accumulator + parseInt(item.vnd_price.replace(/,/g, "")), 0);

  let balanceCheck = false;
  let moneyCheck = false;
  let moneyItem = {};
  reqUserItems.forEach(item => {
    if (item.id === "moneyItem") {
      moneyCheck = true;
      moneyItem = item
    }
  })

  if (botTotalPriceUSD <= userTotalPriceUSD && botTotalPriceVND <= userTotalPriceVND) {
    balanceCheck = true;
  } else {
    balanceCheck = false;
    console.log("unbalance prices error")
    console.log(`botTotalPriceUSD: ${botTotalPriceUSD}`)
    console.log(`userTotalPriceUSD: ${userTotalPriceUSD}`)
    console.log(`botTotalPriceVND: ${botTotalPriceVND}`)
    console.log(`userTotalPriceVND: ${userTotalPriceVND}`)
    console.log(`userTotalPriceUSDWithoutMoney: ${userTotalPriceUSDWithoutMoney}`)
    console.log(`userTotalPriceVNDWithoutMoney: ${userTotalPriceVNDWithoutMoney}`)
    res.sendStatus(503);
  }

  if (balanceCheck) {
    manager.getInventoryContents(steamInfo.appId, steamInfo.contextId, true, (err, botInventory) => {
      if (err) {
        console.log(err);
        res.sendStatus(503);
      } else {
        const offer = manager.createOffer(reqUserData.tradeOfferUrl)
        let botItems = [];
        let userItems = [];

        reqBotItems.forEach(reqItem => {
          botInventory.forEach(item => {
            if (item.id === reqItem.id) {
              botItems.push(item);
            }
          })
        })

        manager.getUserInventoryContents(reqUserData.steamid, steamInfo.appId, steamInfo.contextId, true, (err, userInventory) => {
          if (err) {
            console.log(err);
            res.sendStatus(503);
          } else {
            reqUserItems.filter(item => item.id !== "moneyItem").forEach(reqItem => {
              userInventory.forEach(item => {
                if (item.id === reqItem.id) {
                  userItems.push(item);
                }
              })
            })

            if (botItems.length === reqBotItems.length &&
              ((moneyCheck === false && userItems.length === reqUserItems.length) || (moneyCheck === true && userItems.length === reqUserItems.length - 1))) {
              if (moneyCheck) {
                moneyCheck = parseFloat(moneyItem.market_price) === parseFloat((botTotalPriceUSD - userTotalPriceUSDWithoutMoney).toFixed(2)) &&
                  parseInt(moneyItem.vnd_price.replace(/,/g, '')) === botTotalPriceVND - userTotalPriceVNDWithoutMoney
                TransactionFunc(reqUserData, moneyCheck, moneyItem, 'transaction', (status) => {
                  if (!status) {
                    console.log("transaction failed")
                    res.sendStatus(503);
                  }
                  else {
                    sendOffer(offer, reqUserData, botItems, userItems, (status) => {
                      if (status === 200) res.sendStatus(status)
                      else {
                        TransactionFunc(reqUserData, moneyCheck, moneyItem, 'refund', (status) => {
                          if (!status) {
                            console.log("error refund! need to fix database!")
                            res.sendStatus(500)
                          } else {
                            console.log("refund error")
                            res.sendStatus(503)
                          }
                        })
                      }
                    })
                  }
                })
              } else sendOffer(offer, reqUserData, botItems, userItems, (status) => res.sendStatus(status))
            } else {
              console.log("Missing item(s)");
              res.sendStatus(500);
            }
          }
        })
      }
    })
  }
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
        res.statusMessage = "Cant find user in database"
        res.sendStatus(503)
      } else {
        res.sendStatus(200)
      }
    })
  }
})

app.get('/currency/rate', (req, res) => {
  SiteSettings.findById(process.env.MONGODB_CURRENCY_RATE_ID, (err, result) => {
    if (!err) {
      res.json(result);
    } else {
      res.sendStatus(500);
    }
  })
})

app.get('/users/offers', authCheck, (req, res) => {
  const steamId = req.user.steamid;

  SteamOffers.find({ steam_id: steamId }, (err, offers) => {
    if (!err) res.json(offers)
    else console.log(err)
  })
})

app.get('/users/:steamid/offers', (req, res) => {
  const steamId = req.params.steamid;

  SteamOffers.find({ steam_id: steamId }).sort({ offer_id: -1 }).exec((err, offers) => {
    if (!err) res.json(offers)
    else {
      console.log(err);
      res.sendStatus(500);
    }
  })
})