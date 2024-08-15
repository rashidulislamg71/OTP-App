let OTPis; // Variable to store the generated OTP
let intervalID; // Variable to store the interval ID for countdown timer
const otpExpires_id = document.getElementById("otpExpires_id"); // Element to display OTP expiration status

// Function to handle OTP expiration
function expireOTP() {
  let totalTime = 30000; // Total time for OTP validity in milliseconds (11 seconds)
  let intervalTime = 1000; // Interval time for updating the countdown display in milliseconds (1 second)
  let countDown = totalTime / intervalTime; // Calculate the number of intervals

  // Start a countdown timer that updates every second
  intervalID = setInterval(() => {
    otpExpires_id.innerText = `OTP Will expire in ${countDown} seconds.`; // Update the countdown display
    countDown = countDown - 1; // Decrement the countdown timer
  }, intervalTime);

  // After the total time has passed, execute this block
  setTimeout(() => {
    otpExpires_id.innerText = `OTP Expired!`; // Notify the user that OTP has expired
    clearInterval(intervalID); // Clear the countdown timer to stop further updates
    generateOTP(); // Generate a new OTP
    clearInputFields(); // Clear all input fields and reset focus
  }, totalTime);
}

// Function to clear all OTP input fields and reset focus
function clearInputFields() {
    const boxListEle = document.getElementById("otp_box_list_id"); // Get the container element for OTP input fields
    const inputFields = [...boxListEle.children]; // Convert the children of the container into an array

    inputFields.forEach((elm) => {
        elm.value = ""; // Clear the value of each input field
    });

    // If there are input fields, focus on the first one
    if (inputFields.length > 0) {
        inputFields[0].focus(); // Set focus to the first input field
    }
}

// Function to handle OTP input box behavior
function OTPBoxes() {
  const boxes = document.getElementById("otp_box_list_id"); // Get the container element for OTP input fields

  // Event listener for handling input events in OTP fields
  boxes.addEventListener("input", (e) => {
    const target = e.target; // Get the input element that triggered the event
    const value = target.value; // Get the value entered in the input field

    // Check if the value is a number; if not, clear the input
    if (isNaN(value)) {
      target.value = ""; // Clear non-numeric input
      return;
    }

    // Move focus to the next input field if value is entered
    const nextElement = target.nextElementSibling;
    if (value && nextElement) {
      nextElement.focus(); // Focus on the next input field
    }
    validation(); // Validate the OTP based on current input
  });

  // Event listener for handling backspace key events in OTP fields
  boxes.addEventListener("keydown", (e) => {
    const target = e.target; // Get the input element that triggered the event

    // If backspace is pressed and the input field is empty, move focus to the previous field
    if (e.key === "Backspace" && !target.value) {
      const prevElement = target.previousElementSibling;
      if (prevElement) {
        prevElement.focus(); // Focus on the previous input field
      }
    }
  });
}

// Function to generate a new OTP
function generateOTP() {
  const generatedOTP = document.getElementById("generated_otp_id"); // Get the element to display the generated OTP

  // Generate a random 4-digit OTP
  OTPis = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("");
  generatedOTP.innerText = `Your OTP is:- ${OTPis}`; // Display the generated OTP
  expireOTP(); // Start the OTP expiration process
}

// Function to validate the entered OTP
function validation() {
  let typedNumber = ""; // Variable to store the entered OTP
  const boxListEle = document.getElementById("otp_box_list_id"); // Get the container element for OTP input fields

  // Concatenate the values from all input fields to form the complete OTP
  [...boxListEle.children].forEach((elm) => {
    typedNumber = typedNumber + elm.value;
  });

  const message = document.getElementById("result_id"); // Get the element to display validation results
  if (OTPis === typedNumber) { // Check if the entered OTP matches the generated OTP
    clearInterval(intervalID); // Stop the countdown timer if OTP is correct
    message.classList.add("success"); // Add success class to style the success message
    otpExpires_id.innerText = ""; // Clear the OTP expiration message
    message.innerText = `Your OTP Successfully!`; // Display success message
    message.classList.remove("fail"); // Remove fail class if previously added

    setTimeout(()=>location.reload(), 2000); //when OTP is matched then reload the page after 2 seconds.

  } else {
    message.classList.add("fail"); // Add fail class to style the failure message
    message.innerText = `Oh No, Invalid OTP!`; // Display failure message
    message.classList.remove("success"); // Remove success class if previously added
  }
}

// Function to initialize the OTP system
function init() {
  OTPBoxes(); // Set up OTP input field interactions
  setTimeout(generateOTP, 1000); // Generate the first OTP after a delay of 1 second
}

init(); // Start the OTP system