let ioInstance;

function setIo(io) {
  ioInstance = io;
}

function emitMessage(data) {
  ioInstance.emit("message", data);
}
function emitMessageToAdmins(data) {
  const connectedSockets = Array.from(ioInstance.sockets.sockets.values());

  // Filter sockets based on admin role
  const adminSockets = connectedSockets.filter((socket) => {
    // Check if the user associated with the socket has admin role
    return socket.user && socket.user.userRole === "Admin";
  });

  // Emit message to admin sockets
  adminSockets.forEach((socket) => {
    socket.emit("message", data);
  });
}

function emitMessagebyEmployeeId(empId, data) {
  const connectedSockets = Array.from(ioInstance.sockets.sockets.values());

  // Filter sockets based on empId 
  const userSocket = connectedSockets.filter((socket) => {
    return socket.user && socket.user.empId === empId;
  });

  // Emit message to admin sockets
  userSocket.forEach((socket) => {
    socket.emit("message", data);
  });
}

function emitMessageToAdminRoom(data) {
  ioInstance.to("admin-room").emit("admin-room", data);
}

function emitMessageToEmployeeRoom(data) {
  ioInstance.to("employee-room").emit("employee-room", data);
}

module.exports = {
  setIo,
  emitMessage,
  emitMessageToAdmins,
  emitMessageToAdminRoom,
  emitMessageToEmployeeRoom,
};
