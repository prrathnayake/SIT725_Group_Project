const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { employeeCollection } = require("../database/dbConnection.js");

// create a middleware function to authenticate the user with jwt token
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

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
