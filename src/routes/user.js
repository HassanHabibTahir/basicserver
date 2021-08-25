const { json } = require('express');
const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.get('/tickets/:address', async (req, res, next) => {
  try {
    const { address } = req.params;

    const user = await User.findOne({ address });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
