const { validateToken, extractUserFromToken } = require("../auth");
const socketIo = require("socket.io");
const emitter = require("./emmiter");

function setupSocketIoServer(server) {
  const io = socketIo(server, { origins: "*:*" });
  connectionInterceptor(io);
  connectionHandler(io);
  emitter.setIo(io);
}

// interceptor for Socket.IO connection setup
function connectionInterceptor(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token || !validateToken(token)) {
      socket.disconnect();
      return next(new Error("Web Socket Authentication failed"));
    }
    const userPrincipal = extractUserFromToken(token);
    // Attach user information, including userRole, to the socket object
    socket.user = {
      userId: userPrincipal.userId,
      username: userPrincipal.username,
      empId: userPrincipal.empId,
      userRole: userPrincipal.userRole,
    };
    assignUserToRooms(socket);
    next();
  });
}

function assignUserToRooms(socket) {
  if (socket.user && socket.user.userRole === "Admin") {
    socket.join("admin-room");
    console.log(`Socket ${socket.id} joined room: admin-room`);
  } else if (socket.user && socket.user.userRole === "Employee") {
    socket.join("employee-room");
    console.log(`Socket ${socket.id} joined room: employee-room`);
  } else {
    console.error(
      `Socket ${socket.id} attempted to join invalid room}`
    );
  }
}

// Socket.IO connection handling
function connectionHandler(io) {
  io.on("connection", (socket) => {
    socket.on("message", (message) => {
      const token = socket.handshake.auth.token;
      if (!token || !validateToken(token)) {
        socket.disconnect();
        return;
      }
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
    console.log("Socket.IO connection established");
  });
}

module.exports = { setupSocketIoServer };
