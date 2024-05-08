import { connectSocketIo } from "./clientSocket.js";

// Connect to the Socket.IO server
connectSocketIo();

// Function to handle button click and send a request to the server
function navigateToEmployeeProfile() {
  fetch("/employee/navigateToEmployeeProfile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to navigate to employee profile.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    alert(error.message);
  });
}

// Add event listener to the button to trigger the navigateToEmployeeProfile function
document.getElementById("employeeBtn").addEventListener("click", navigateToEmployeeProfile);
