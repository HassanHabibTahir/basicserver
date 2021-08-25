const express = require('express');

const Referral = require('../models/Referral');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const referrals = await Referral.find().sort({
      refferredUsers: -1,
      refferredUsersticketsBought: -1,
    });

    res.status(200).json({ success: true, data: referrals });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      refferredAddress,
      refferredUsers,
      refferredUsersticketsBought,
      lastactivity,
    } = req.body;

    await Referral.findOneAndUpdate(
      { refferredAddress },
      {
        refferredAddress,
        refferredUsers,
        refferredUsersticketsBought,
        lastactivity,
      },
      {
        upsert: true,
      }
    );

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
