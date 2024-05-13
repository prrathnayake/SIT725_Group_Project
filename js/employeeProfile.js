import { connectSocketIo } from "./clientSocket.js";
connectSocketIo();

async function fetchEmployeeDetails() {
  try {
    const data = getCookie("user_principal");
    if (!data) {
      console.error("User Principal not found in cookie");
    }
    const userPrincipal = JSON.parse(data);
    const empId = userPrincipal.empId;
    if (empId) {
      const url = `/employee/id?empId=${empId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        document.getElementById("firstName").value = data.data.firstName;
        document.getElementById("lastName").value = data.data.lastName;
        document.getElementById("empId").value = data.data.empId;
        document.getElementById("phone").value = data.data.phone;
        document.getElementById("address").value = data.data.address;
        document.getElementById("dateOfBirth").value = data.data.dateOfBirth;
        document.getElementById("designation").value = data.data.designation;
        document.getElementById("status").checked = data.data.status === "on";
        document.getElementById("department").value = data.data.department;
      } else {
        console.error("Failed to fetch employee details:", data.message);
      }
    } else {
      console.error("User profile not found in local storage");
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
  }
}

export function editProfile() {
  const form = document.getElementById("profileForm");
  const inputs = form.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    if (input.id !== "empId") {
      input.removeAttribute("disabled");
    }
  });
  document.querySelector(".btn-save").style.display = "block";
}

document
  .getElementById("profileForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const disabledFields = document.querySelectorAll(
      "input[disabled], textarea[disabled], select[disabled]"
    );
    disabledFields.forEach((field) => {
      formData.append(field.name, field.value);
    });
    const jsonFormData = {};
    formData.forEach((value, key) => {
      jsonFormData[key] = value;
    });
    const data = getCookie("user_principal");
    if (!data) {
      console.error("User Principal not found in cookie");
    }
    const userPrincipal = JSON.parse(data);
    const userRole = userPrincipal.userRole;
    if (userRole) {
      jsonFormData["userRole"] = userRole;
    }

    try {
      const response = await fetch("/employee/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonFormData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        window.location.reload();
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  });

document.getElementById("editButton").addEventListener("click", editProfile);
fetchEmployeeDetails();

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
