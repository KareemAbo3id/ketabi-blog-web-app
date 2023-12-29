import express from "express";
import getRouterPath from "../server-configs/getRouterPath.config.js";
import authenticate_user from "../server-controllers/user-controllers/authenticate_user.controller.js";
import create_user from "../server-controllers/user-controllers/create_user.controller.js";
import delete_user from "../server-controllers/user-controllers/delete_user.controller.js";
import update_user_profile from "../server-controllers/user-controllers/update_user_profile.controller.js";
import get_user_profile from "../server-controllers/user-controllers/get_user_profile.controller.js";
import verify_user_email from "../server-controllers/user-controllers/verify_user_email.controller.js";
import logout_user from "../server-controllers/user-controllers/logout_user.controller.js";
import reset_user_password from "../server-controllers/user-controllers/reset_user_password.controller.js";
import ProtectPrivateRouter from "../server-middlewares/auth-middlewares/protectRoute.middleware.js";

const APP_USER_ROUTER = express.Router();
const { auth, user } = getRouterPath();

// PUBLIC ACCESS
APP_USER_ROUTER.post(auth.signin_path, authenticate_user);

APP_USER_ROUTER.post(auth.signup_path, create_user);

APP_USER_ROUTER.post(auth.logout_path, logout_user);

APP_USER_ROUTER.put(auth.resetPassword_path, reset_user_password);

// PRIVATE ACCESS:

APP_USER_ROUTER.delete(auth.deleteAccount_path, ProtectPrivateRouter, delete_user);

APP_USER_ROUTER.put(user.profileUpdate_path, ProtectPrivateRouter, update_user_profile);

APP_USER_ROUTER.get(user.profile_path, ProtectPrivateRouter, get_user_profile);

APP_USER_ROUTER.post(auth.verifyEmail_path, ProtectPrivateRouter, verify_user_email);

export default APP_USER_ROUTER;
