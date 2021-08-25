const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const referralRoutes = require('./routes/referral');
const userRoutes = require('./routes/user');
const coinRoutes = require('./routes/coin');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/referral', referralRoutes);
app.use('/user', userRoutes);
app.use('/coin', coinRoutes);
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ status: false, data: error });
});

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://Bunny:admin2468@cluster0.dc3lu.mongodb.net/livecryptoparty?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    app.listen(PORT, () => console.log(`server is listning on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
