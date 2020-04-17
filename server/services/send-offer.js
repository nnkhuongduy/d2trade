require('dotenv').config();
const community = require('../configs/steam-setup/steam-community')

const sendOffer = offer => {
  return new Promise((resolve, reject) => {
    try {
      offer.send(async (err) => {
        if (!err) {
          community.acceptConfirmationForObject(process.env.STEAM_IDENTITY_SECRET, offer.id, err => {
            if (!err) resolve(offer);

            else throw err
          })
        }
        else throw err
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = sendOffer;