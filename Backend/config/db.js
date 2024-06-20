const mongoose = require("mongoose");
require('dotenv').config();

const connection = mongoose.connect(process.env.MONGO_URL,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 30000,
})
module.exports = {
  connection
};