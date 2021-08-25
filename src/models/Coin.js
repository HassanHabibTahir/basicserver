const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  name: String,
  votes: {
    type: Number,
    default: 0,
  },
  addedAt: {
    type: Date,
    default: new Date(),
  },
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
