***OTP Verification System***

This project demonstrates an OTP (One-Time Password) verification system where an OTP is generated, validated, and expires after a specific time. The input fields are cleared and a new OTP is generated upon expiration.

***Features***

OTP Generation: A 4-digit OTP is generated.

OTP Expiration: The OTP expires after 30 seconds.

Validation: The user can input the OTP to validate it.

Input Field Clearing: If the OTP expires, the input fields are cleared, generating a new OTP.

Focus Management: After the OTP expires, the focus automatically returns to the first input field.

***Code Explanation***

OTP Expiration: The expireOTP function handles the OTP expiration process. It sets a countdown timer that updates every second. When the OTP expires, the input fields are cleared, generating a new OTP.

Clearing Input Fields: The clareInputFields function clears all the input fields and focuses on the first input field.

OTP Box Handling: The OTPBoxes function manages the behavior of the OTP input boxes. It automatically moves focus to the next box as the user types and handles backspace functionality.

OTP Validation: The validation function compares the entered OTP with the generated OTP. The timer is cleared if the OTP is correct, and a success message is displayed.
