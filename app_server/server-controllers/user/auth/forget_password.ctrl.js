// when user forgets password, he/she can request to reset it by providing his/her email address.
// that will happen through 2 endpoints:

// A. **Forget Password Endpoint**:
//   - **URL**: `/user/auth/forget-password`
//  - **METHOD**: `POST`
// - **Request Body**: `{ DATA_EMAIL_ADDRESS }`
// steps:
// 1. check if the email address exists in the database, if not, return an error message.
// 2. if the email address exists, create a random string token (20 characters) in a variable `TEMP_RESET_PASSWORD_TOKEN`.
// 3. hash the token using bcrypt to defferant variable `TEMP_RESET_PASSWORD_TOKEN_HASH` using crypto and randomBytes.
// 4. now we have 2 variables: `TEMP_RESET_PASSWORD_TOKEN` and `TEMP_RESET_PASSWORD_TOKEN_HASH`.
// 5. save the `TEMP_RESET_PASSWORD_TOKEN_HASH` in the database under the user's email address.
// 6. set expiry time for the token `TEMP_RESET_PASSWORD_TOKEN_HASH` to 1 hour.
// 7. generate a link with the token `TEMP_RESET_PASSWORD_TOKEN` in the URL: `http://localhost:5555/user/auth/reset-password/${TEMP_RESET_PASSWORD_TOKEN}`.
// 8. send an email to the user with the link.
// 9. the user will click the link and will be redirected to the reset password page (B endpoint).
// END of Forget Password Endpoint

// B. **Reset Password Endpoint**:
// - **URL**: `/user/auth/reset-password/:TEMP_RESET_PASSWORD_TOKEN`
// - **METHOD**: `PATCH`
// - **Request Body**: `{ DATA_NEW_PASSWORD, DATA_CONFIRM_NEW_PASSWORD }`
// steps:
// 1. get the `TEMP_RESET_PASSWORD_TOKEN` from the URL.
// 2. hash the `TEMP_RESET_PASSWORD_TOKEN` using bcrypt to defferant variable called: `URL_RESET_PASSWORD_TOKEN_HASH`.
// 3. get `TEMP_RESET_PASSWORD_TOKEN_HASH` from the database and sign it to a variable called: `DB_RESET_PASSWORD_TOKEN_HASH`.
// 4. compare `URL_RESET_PASSWORD_TOKEN_HASH` with `DB_RESET_PASSWORD_TOKEN_HASH`.
// 5. if they are not the same, return an error message.
// 6. if they are the same, check if the token has expired or not.
// 7. if the token has expired, return an error message.
// 8. compare `DATA_NEW_PASSWORD` with `DATA_CONFIRM_NEW_PASSWORD`.
// 9. if they are not the same, return an error message.
// 10. if they are the same, hash the `DATA_NEW_PASSWORD` and save it in the database to replace the old password.
// 11. return a success message.
// END of Reset Password Endpoint
