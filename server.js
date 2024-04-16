const express = require("express");
require("dotenv").config();

const { testDatabaseConnection } = require("./database/dbConnection.js");
const login = require("./routes/loginRoute.js");
const index = require("./routes/indexRoute.js");

const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", login);
app.use("/", index);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  testDatabaseConnection();
});
