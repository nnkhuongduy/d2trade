require('dotenv').config();
const community = require('../configs/steam-setup/steam-community')

const sendOffer = offer => {
  return new Promise((resolve, reject) => {

    offer.send((err) => {
      if (!err) {
        community.acceptConfirmationForObject(process.env.STEAM_IDENTITY_SECRET, offer.id, err => {
          if (!err) resolve(offer);

          else reject(err)
        })
      }
      else reject(err)
    })
  })
}

module.exports = sendOffer;