var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var processSchema = new Schema({
    name:  {type : String , required: true},
    creator: {type : String , required: true},
    no_of_steps : {type : Number , required: true},
    active: {type : Boolean}
  });

  module.exports = mongoose.model('Process', processSchema);