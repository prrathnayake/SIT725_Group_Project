const userService = require('../model/service/userService');

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await userService.findUser(username, password);
    
    if (user) {
      res.status(200).json({ userId: user.userId, userType: user.type });
    } else {
      res.status(401).send('Invalid username or password. Please try again!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
    userLogin
};
