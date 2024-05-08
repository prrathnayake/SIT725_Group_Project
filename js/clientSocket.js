let socket;

export function connectSocketIo() {
  const jwtToken = getCookie("jwt_token");
  if (!jwtToken) {
    console.error("JWT token not found in local storage");
    return null;
  }
  if (!socket) {
    socket = io(`ws://localhost:4000`, {
      auth: {
        token: jwtToken,
      },
      transports: ["websocket"],
    });

  }

  // Handle messages specific to the admin room
  socket.on("admin-room", (message) => {
    new Noty({
      type: "info",
      text: message.data.empId + " has been updated",
      timeout: 5000,
      layout: "bottomRight",
    }).show();
  });

  // Handle messages specific to the employee room
  socket.on("employee-room", (message) => {
    new Noty({
      type: "info",
      text: message.data.empId + " has been updated",
      timeout: 5000,
      layout: "bottomRight",
    }).show();
  });

  socket.on("message", (message) => {
    new Noty({
      type: "info",
      text: message.data.empId + " has been updated",
      timeout: 5000,
      layout: "bottomRight",
    }).show();
  });

  // On Disconnect
  socket.on("disconnect", () => {
    console.log("Socket.IO connection closed");
  });

  return socket;
}

// TODO: useful when logging out
// Function to close Socket.IO connection
export function disconnectSocketIo() {
  if (socket) {
    socket.disconnect();
  }
}

export function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
