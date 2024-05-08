const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { employeeCollection } = require("../database/dbConnection.js");
const { getLocalStorage } = require("../utils/localStorage.js");
const { LocalStorage_JWT_Token } = require("../utils/globalVariable.js");

// create a middleware function to authenticate the user with jwt token
const authenticate = async (req, res, next) => {
  try {
    const token = await getLocalStorage(LocalStorage_JWT_Token);
    const valideToken = await validateToken(token);
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

// validating jwt token
async function validateToken(token) {
  let validToken = false;
  try {
    if (!token) {
      return validToken;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const employee = await employeeCollection.findOne({
      _id: new ObjectId(decodedToken.userId),
    });
    validToken = true;
    return validToken;
  } catch (error) {
    validToken = false;
    return validToken;
  }
}

function extractUserFromToken(token) {
  try {
    // Decode the JWT token to access its payload
    const decodedToken = jwt.decode(token);

    // Retrieve user information from the token's payload
    const userId = decodedToken.userId;
    const username = decodedToken.username;
    const empId = decodedToken.empId;
    const userRole = decodedToken.userRole;

    // Construct the user object
    const userPrincipal = {
      userId,
      username,
      empId,
      userRole,
    };

    return userPrincipal;
  } catch (error) {
    console.error("Error extracting user from token:", error);
    return null;
  }
}

module.exports = { authenticate, validateToken, extractUserFromToken };
