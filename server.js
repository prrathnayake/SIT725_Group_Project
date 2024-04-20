const express = require("express");
require("dotenv").config();

const auth = require("./routes/authRoute.js");
const index = require("./routes/indexRoute.js");
const employee = require("./routes/employeeRoute.js");
const login = require("./routes/loginRoute.js");
const register = require("./routes/registerRoute.js");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/", index);
app.use("/employee", employee);
app.use("/login", login);
app.use("/register", register);

// start server
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
