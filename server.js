const express = require("express");
require("dotenv").config();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, { origins: '*:*'});

const auth = require("./routes/authRoute.js");
const index = require("./routes/indexRoute.js");
const employee = require("./routes/employeeRoute.js");
const login = require("./routes/loginRoute.js");
const register = require("./routes/registerRoute.js");
const home = require("./routes/homeRoute.js");

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
app.use("/home", home);

const liveCout = 0;

io.on('connection', (socket) => {
  liveCout++;
  socket.on('disconnect', () => {
      liveCout--;
  });
  console.log(liveCout);
});

// start server
server.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
