let { register, login } = require("../model/authModel.js");

const registerEmployee = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await register(username, email, password);
    res.redirect('/home');
  } catch (error) {
    console.log(error);
  }
};

const loginEmployee = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await login(username, password);
    
    // Set the token in a cookie named 'jwt_token'
    res.cookie('jwt_token', token, {
      httpOnly: false,
      secure: true, 
    });

    res.redirect(`/home`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerEmployee, loginEmployee };
