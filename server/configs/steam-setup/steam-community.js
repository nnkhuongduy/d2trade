const SteamCommunity = require('steamcommunity');

const community = new SteamCommunity();

community.on("sessionExpired", err => {
  client.webLogOn();
})

module.exports = community;