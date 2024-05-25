const mongoose = require('mongoose');

const userDetails = new mongoose.Schema({
  userId:{
    type:String
    },
  username:{
    type:String
    },
  password: {
    type: String
  },
  type: {
    type:Number
    }
});

const User = mongoose.model('User', userDetails);

module.exports = User;
