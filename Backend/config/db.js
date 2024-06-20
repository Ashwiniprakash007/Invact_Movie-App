const mongoose = require("mongoose");
// Load environment variables
require('dotenv').config();

const connection = mongoose.connect(process.env.MONGO_URL)
module.exports = {
  connection
};