//email validation
  // Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the radio buttons and form sections
    const loginToggle = document.getElementById("login-toggle");
    const registerToggle = document.getElementById("register-toggle");
    const loginSection = document.getElementById("login");
    const registerSection = document.getElementById("register");
  
    // Add an event listener to the login radio button
    loginToggle.addEventListener("change", function () {
      // Check if the login radio button is checked
      if (this.checked) {
        // Show the login form and hide the register form
        loginSection.style.display = "block";
        registerSection.style.display = "none";
      }
    });
  
    // Add an event listener to the register radio button
    registerToggle.addEventListener("change", function () {
      // Check if the register radio button is checked
      if (this.checked) {
        // Show the register form and hide the login form
        registerSection.style.display = "block";
        loginSection.style.display = "none";
      }
    });
  });