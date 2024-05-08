const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const { setupSocketIoServer } = require('./middleware/websocket-server/socketServer.js');
const { connectToRabbitMQ } = require('./middleware/websocket-server/rabbitmqProducer.js');
require("./middleware/websocket-server/rabbitmqConsumer.js");
const server = http.createServer(app);

const auth = require("./routes/authRoute.js");
const index = require("./routes/indexRoute.js");
const employee = require("./routes/employeeRoute.js");
const login = require("./routes/loginRoute.js");
const register = require("./routes/registerRoute.js");
const home = require("./routes/homeRoute.js");

const port = process.env.PORT || 4000;

// Setup Socket.IO server
setupSocketIoServer(server);

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/", index);
app.use("/employee", employee);
app.use("/login", login);
app.use("/register", register);
app.use("/home", home);

// Start server
server.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
});
