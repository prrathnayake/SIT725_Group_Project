import { connectSocketIo } from "./clientSocket.js";

// Connect to the Socket.IO server
connectSocketIo();

const sidebarContainer = document.getElementById("sidebarContainer");
fetch("../views/navigation.html")
  .then((response) => response.text())
  .then((html) => {
    sidebarContainer.innerHTML = html;
    initializeSidebar();
  })
  .catch((error) => console.error("Error fetching sidebar content:", error));

function initializeSidebar() {
  document.querySelectorAll(".nav-links li").forEach((link) => {
    link.style.display = "none";
  });

  const data = getCookie("user_principal");
  if (!data) {
    console.error("User Principal not found in cookie");
    return;
  }

  const userPrincipal = JSON.parse(data);
  const role = userPrincipal.userRole;

  document.querySelector(".log_out").style.display = "block"; // Logout

  // Show links based on role
  if (role) {
    if (role === "Admin") {
      document.getElementById("dashboard-link").style.display = "block";
      document.getElementById("employee-profile-link").style.display = "block";
      document.getElementById("add-employee-link").style.display = "block";
      document.getElementById("update-employee-link").style.display = "block";
      document.getElementById("view-employee-link").style.display = "block";
      document.getElementById("view-payroll-link").style.display = "block";
      document.getElementById("report-link").style.display = "block";
      document.getElementById("settings-link").style.display = "block";
      document.getElementById("view-payroll-link").style.display = "block";
    } else if (role === "Employee") {
      document.getElementById("view-employee-payroll-link").style.display = "block";
      document.getElementById("employee-profile-link").style.display = "block";
      document.getElementById("view-task-employee-link").style.display = "block";
    }
  }

  // Initialize sidebar toggle
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".sidebarBtn");
  sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };
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
