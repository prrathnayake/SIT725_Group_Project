const jwt = require('jsonwebtoken');
const Employee = require('../model/employeeModel.js');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const employee = await Employee.findById(decodedToken.userId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    req.employee = employee;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };