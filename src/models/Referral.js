const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  refferredAddress: String,
  refferredUsers: Number,
  refferredUsersticketsBought: Number,
  lastactivity: Number,
  addedAt: {
    type: Date,
    default: new Date(),
  },
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
