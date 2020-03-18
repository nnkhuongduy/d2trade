const express = require('express');
const InventoryAPI = require('steam-inventory-api-ng');
const market = require('steam-market-pricing');
const mongoose = require('mongoose');

const app = express();
const inventoryApi = new InventoryAPI();

mongoose.connect("mongodb://localhost:27017/itempricesDB", { useNewUrlParser: true, useUnifiedTopology: true });

const port = 5000;
const steamInfo = {
  steamId: '76561198105770372',
  appId: 570,
  contextId: 2
}

const itemPriceSchema = new mongoose.Schema({
  name: String,
  price: {
    sucess: Boolean,
    lowest_price: String,
    volume: String,
    median_price: String,
    market_hash_name: String
  }
})

const ItemPrice = mongoose.model("MarketPrice", itemPriceSchema);

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/inventory', (req, res) => {
  const inventory = [];

  inventoryApi.get(steamInfo.steamId, steamInfo.appId, steamInfo.contextId, true, 10)
    .then(steamRes => {
      JSON.stringify(steamRes.inventory.map(item => inventory.push(item)));
    })
    .then(steamRes => res.json(inventory))
    .catch(err => console.log(err));
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