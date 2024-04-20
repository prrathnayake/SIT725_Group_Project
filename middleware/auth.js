const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { employeeCollection } = require("../database/dbConnection.js");
const { getLocalStorage } = require("../utils/localStorage.js");
const { LocalStorage_JWT_Token } = require("../utils/globalVariable.js");
{
}

// create a middleware function to authenticate the user with jwt token
const authenticate = async (req, res, next) => {
  const token = await getLocalStorage(LocalStorage_JWT_Token);

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const employee = await employeeCollection.findOne({
      _id: new ObjectId(decodedToken.userId),
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    req.employee = employee;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
