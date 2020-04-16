require('dotenv').config();
const SteamOffers = require('../models/offer-model')
const community = require('../configs/steam-setup/steam-community')

const addToOfferArray = (items, offerArray) => {
  const obj = {
    id: null,
    image_url: null,
  };

  items.forEach(item => {
    obj.id = item.id;
    obj.image_url = `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}`

    offerArray.push(obj);
  })
}

const sendOffer = (offer, user, botItems, userItems) => {
  return new Promise((resolve, reject) => {
    offer.addMyItems(botItems);
    offer.addTheirItems(userItems);
    offer.setMessage("Test");

    const offerBotItems = [];
    const offerUserItems = [];

    addToOfferArray(botItems, offerBotItems);
    addToOfferArray(userItems, offerUserItems);

    const newOffer = SteamOffers({
      steam_id: user.steamid,
      bot_items: offerBotItems,
      user_items: offerUserItems,
      status: "Created",
    })

    newOffer.save()
      .then(dbOffer => {
        offer.send((err, status) => {
          if (!err)
            community.acceptConfirmationForObject(process.env.STEAM_IDENTITY_SECRET, offer.id, (err) => {
              if (!err)
                SteamOffers.findOneAndUpdate({ _id: dbOffer._id }, { offer_id: offer.id }, (err) => {
                  if (!err) {
                    console.log("sent")
                    resolve();
                  } else reject(err)
                })
              else reject(err)
            })
          else reject(err)
        })
      })
      .catch(err => reject(err))

    // newOffer.save((err) => {
    //   if (err) console.log(err);
    //   else
    //     offer.send((err, status) => {
    //       if (err) {
    //         console.log(err);
    //         isCallback && callback(500)
    //       } else {
    //         if (status === "pending") {
    //           community.acceptConfirmationForObject(process.env.STEAM_IDENTITY_SECRET, offer.id, (err) => {
    //             if (err) {
    //               console.log(err);
    //               isCallback && callback(500)
    //             } else
    //               SteamOffers.findOneAndUpdate({ offer_index: count + 1 }, { offer_id: offer.id }, (err) => {
    //                 if (err) console.log(err);
    //                 else {
    //                   console.log("Sent");
    //                   isCallback && callback(200);
    //                 }
    //               })
    //           })
    //         }
    //       }
    //     });
    // })
  })
}

module.exports = sendOffer;