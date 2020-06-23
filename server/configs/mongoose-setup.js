require('dotenv').config();
const mongoose = require('mongoose');

const CONFIGS = require('./configs')

const uri = CONFIGS.MONGODB.MONGODB_URI;

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => console.log("connected to mongodb atlas"));
mongoose.connect('mongodb://localhost:27017/tradeDB',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
  () => console.log("connected to mongodb atlas"));

module.exports = mongoose;