
// Get the button and message elements from the HTML page.
const welcomeButton = document.getElementById("welcomeButton");
const message = document.getElementById("message");

// Add a click event to the button.
welcomeButton.addEventListener("click", () => {
    message.textContent = "Your Express static website is working successfully!";
});
