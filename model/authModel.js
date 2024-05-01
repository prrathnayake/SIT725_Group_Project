const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Employee = require("../model/employeeModel.js");

const { employeeCollection } = require("../database/dbConnection.js");
const { setLocalStorage, getLocalStorage } = require("../utils/localStorage.js");
const { LocalStorage_JWT_Token } = require("../utils/globalVariable.js");

// user register function to register new users in to the system
async function register(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await employeeCollection.insertOne({
    username: username,
    email: email,
    password: hashedPassword,
  });
}

// user login function to login and validate existing users in the system
async function login(username, password) {
  const employee = await employeeCollection.findOne({ username });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const valid = await bcrypt.compare(password, employee.password);
  if (!valid) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ userId: employee._id }, process.env.SECRET_KEY, {
    expiresIn: "30s",
  });
  await setLocalStorage(LocalStorage_JWT_Token, token);
  return token;
}

module.exports = { register, login };
