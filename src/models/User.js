const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: String,
  usedTickets: Number,
  addedAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
