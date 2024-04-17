const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Employee = require("../model/employeeModel.js");

const { employeeCollection } = require("../database/dbConnection.js");

async function register(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await employeeCollection.insertOne({
    username: username,
    email: email,
    password: hashedPassword,
  });
}

async function login(username, password) {
  const employee = await employeeCollection.findOne({ username });
  console.log(employee);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const valid = await bcrypt.compare(password, employee.password);
  if (!valid) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ userId: employee._id }, process.env.SECRET_KEY, {
    expiresIn: "1 hour",
  });
  return token;
}

module.exports = { register, login };
