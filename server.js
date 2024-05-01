const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { origins: "*:*" });

const auth = require("./routes/authRoute.js");
const index = require("./routes/indexRoute.js");
const employee = require("./routes/employeeRoute.js");
const login = require("./routes/loginRoute.js");
const register = require("./routes/registerRoute.js");
const home = require("./routes/homeRoute.js");

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

let liveCount = 0;

// add socket for count live users
io.on("connection", (socket) => {
  liveCount = liveCount + 1;
  socket.on("disconnect", () => {
    liveCount = liveCount - 1;
  });
  console.log(liveCount);
});

// start server
server.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
