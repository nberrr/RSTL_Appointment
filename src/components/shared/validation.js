// Shared validation utilities for appointment forms

// Philippine mobile number validation
export function isValidPhilippineMobileNumber(phone) {
  // Accepts 09XXXXXXXXX or +639XXXXXXXXX
  return /^(09\d{9}|\+639\d{9})$/.test(phone);
}

// Email format validation
export function isValidEmailFormat(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

// Simulate async email existence check (mock)
const MOCK_EXISTING_EMAILS = [
  'test@example.com',
  'user@domain.com',
  'sample@rstl.com',
];

export function checkEmailExists(email) {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EXISTING_EMAILS.includes(email.toLowerCase()));
    }, 500);
  });
} 