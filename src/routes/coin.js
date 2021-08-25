const express = require('express');

const User = require('../models/User');
const Coin = require('../models/Coin');

const updateUser = (address) =>
  Promise.resolve(
    User.findOneAndUpdate(
      { address },
      { $inc: { usedTickets: 1 } },
      { upsert: true }
    )
  );

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const coins = await Coin.find();

    res.json({ status: true, data: coins });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, address } = req.body;

    const found = await Coin.findOne({ name });

    if (found) {
      res.status(203).json({ status: false, message: 'Coin already Exists' });
    } else {
      const coin = new Coin({ name });
      await coin.save();
      await updateUser(address);

      res.status(200).json({ status: true, message: 'Coin Added' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/vote', async (req, res, next) => {
  try {
    const { address, coinId } = req.body;

    await updateUser(address);

    await Coin.findOneAndUpdate({ _id: coinId }, { $inc: { votes: 1 } });

    res.status(202).json({ status: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
