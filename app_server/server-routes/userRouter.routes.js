//HIGHLIGHT: KETABI USER_ROUTER

import express from "express";
import getRouterPath from "../server-configs/routerPath.config.js";
import authenticate_user from "../server-apis/user-apis/authUser.api.js";

//HIGHLIGHT: CONFIGS
const USER_ROUTER = express.Router();
const { root } = getRouterPath();

/* API
@name: authenticate_user()
@description: authenticate the user and get token to save it locally.
@endpoint: POST "/u/auth/sign-in"
@route: "/u/auth/sign-in"
@params:
*/
USER_ROUTER.post(`${root.auth_path}/sign-in`, authenticate_user);

export default USER_ROUTER;
