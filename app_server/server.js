//HIGHLIGHT: KETABI NODE EXPRESS SERVER

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getRouterPath from "./server-configs/routerPath.config.js";
import USER_ROUTER from "./server-routes/userRouter.routes.js";

//HIGHLIGHT: APP SERVER CONFIGS
// eslint-disable-next-line no-undef
const APP_PORT = process.env.SERVER_PORT || 5555;
dotenv.config();
const { root } = getRouterPath();
///================================================

//HIGHLIGHT: APP SERVER INIT
const APP_SERVER = express();
APP_SERVER.use(cors());

//HIGHLIGHT: APP SERVER LOGIC

APP_SERVER.use(root.user_path, USER_ROUTER);

APP_SERVER.listen(APP_PORT, () =>
    console.log(`SERVER: Ketabi app listening on port ${APP_PORT}`)
);

/* API
@name: create_user()
@description: create a new user with credentials.
@endpoint: POST "/u/auth/sign-up"
@route: "/u/auth/sign-up"
@params:
*/

/* API
@name: logout_user()
@description: logout the user and delete token with cookies.
@endpoint: POST "/u/auth/log-out"
@route: "/u/auth/log-out"
@params:
*/

/* API
@name: get_user_profile()
@description: get the authenticated user credentials.
@endpoint: GET "/u/profile/<uid>"
@route: "/u/profile/<uid>"
@params:
*/

/* API
@name: update_user_profile()
@description: update the authenticated user credentials.
@endpoint: PUT "/u/update-profile"
@route: "/u/update-profile"
@params:
*/

/* API
@name: reset_user_password()
@description: reset forgotten user password.
@endpoint: PUT "/u/auth/checkpoint/reset-password"
@route: "/u/auth/checkpoint/reset-password"
@params:
*/

/* API
@name: verify_user_email()
@description: verify user email.
@endpoint: POST "/u/auth/checkpoint/verify-email"
@route: "/u/auth/checkpoint/verify-email"
@params:
*/

/* API
@name: delete_user()
@description: delete user from db.
@endpoint: DELETE "/u/auth/checkpoint/delete-account"
@route: "/u/auth/checkpoint/delete-account"
@params:
*/

/* server errors
This server uses the following error codes:
`400 Bad Request`: The request was malformed or missing required parameters.
`401 Unauthorized`: The API key provided was invalid or missing.
`404 Not Found`: The requested resource was not found.
`500 Internal Server Error`: An unexpected error occurred on the server.
*/
