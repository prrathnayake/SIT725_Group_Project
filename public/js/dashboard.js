document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("logoutButton").addEventListener("click", function(event) {
      event.preventDefault();
      
      //Clear userId
      sessionStorage.removeItem("userId");
      localStorage.removeItem("userId");
      
      window.location.href = "/login";
    });
  });
  