const express = require('express');
const InventoryAPI = require('steam-inventory-api-ng');

const app = express();
const inventoryApi = new InventoryAPI();

const port = 5000;
const steamInfo = {
  steamId: '76561198105770372',
  appId: 570,
  contextId: 2
}

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

