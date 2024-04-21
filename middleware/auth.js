const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { employeeCollection } = require("../database/dbConnection.js");
const { getLocalStorage } = require("../utils/localStorage.js");
const { LocalStorage_JWT_Token } = require("../utils/globalVariable.js");
{
}

// create a middleware function to authenticate the user with jwt token
const authenticate = async (req, res, next) => {
  try {
    const valideToken = await validateToken();
    if (!valideToken) {
      // return res.status(404).json({ message: "Employee not found" });c
      return res.redirect("/login");
    }
    next();
  } catch (error) {
    console.log(error);
    // res.status(401).json({ message: "Invalid token" });
    return res.redirect("/login");
  }
};

async function validateToken() {
  let valideToken = false;
  try {
    const token = await getLocalStorage(LocalStorage_JWT_Token);

    if (!token) {
      return valideToken;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const employee = await employeeCollection.findOne({
      _id: new ObjectId(decodedToken.userId),
    });
    valideToken = true;
    return valideToken;
  } catch (error) {
    valideToken = false;
    return valideToken;
  }
}

module.exports = { authenticate, validateToken };
