const User = require('../userModel.js');

const findUser = async (username, password) => {
  return await User.findOne({ username, password });
};

module.exports = {
  findUser
};
