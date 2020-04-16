const SteamUser = require('steam-user');

const CONFIGS = require('../configs')
const community = require('./steam-community')
const manager = require('./steam-manager')

const client = new SteamUser();

client.logOn(CONFIGS.STEAM_BOT);

client.on("loggedOn", () => {
  console.log("Logged into bot steam");
})

module.exports = client;