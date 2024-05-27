document.addEventListener('DOMContentLoaded', function() {
    // Hide all boxes by default
    document.querySelectorAll(".overview-boxes .box, .content .widget-box").forEach((box) => {
        box.style.display = "none";
    });

    // Get the user role from the cookie
    const data = getCookie("user_principal");
    if (!data) {
        console.error("User Principal not found in cookie");
        return;
    }

    const userPrincipal = JSON.parse(data);
    const role = userPrincipal.userRole;

    // Show specific boxes based on the user role
    if (role) {
        if (role === "Admin") {
            document.querySelector("#employee-content .overview-boxes:nth-child(1) .box").style.display = "block"; // Total Employee
            document.querySelector("#employee-content .overview-boxes:nth-child(2) .box").style.display = "block"; // Update Employee
            document.getElementById("emp-performance").style.display = "block"; // Employee Performance
            document.getElementById("hr-performance").style.display = "block"; // HR Performance
            document.getElementById("task-performance").style.display = "block"; // Task Performance
            document.getElementById("payroll-performance").style.display = "block"; // Payroll Performance
        } else if (role === "Employee") {
            document.getElementById("emp-performance").style.display = "block"; // Employee Performance
            document.getElementById("task-performance").style.display = "block"; // Task Performance
        }
    }
});
  
  // Function to get cookie value
  function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if(name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
  