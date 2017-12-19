/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose


const userSsoSchema = new Schema({
  deviceToken: { type: String},
  usertoken: { type: String},
  accessToken : {type : String},
  refreshToken : {type : String}
});

// Export Module/Schema
module.exports = mongoose.model('Usersso', userSsoSchema);
