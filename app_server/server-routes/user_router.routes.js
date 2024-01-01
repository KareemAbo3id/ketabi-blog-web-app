import express from "express";
import f_getRouterPath from "../server-configs/getRouterPath.config.js";
import f_ProtectPrivateRouter from "../server-middlewares/auth-middlewares/protectRoute.middleware.js";
import api_f_authenticateUser from "../server-controllers/user-controllers/authenticate_user.controller.js";
import api_f_createUser from "../server-controllers/user-controllers/create_user.controller.js";
import api_f_deactivateUser from "../server-controllers/user-controllers/deactivate_user.controller.js";
import api_f_updateUserProfile from "../server-controllers/user-controllers/update_user_profile.controller.js";
import api_f_getUserProfile from "../server-controllers/user-controllers/get_user_profile.controller.js";
import api_f_verifyUserEmail from "../server-controllers/user-controllers/verify_user_email.controller.js";
import api_f_logoutUser from "../server-controllers/user-controllers/logout_user.controller.js";
import api_f_resetUserPassword from "../server-controllers/user-controllers/reset_user_password.controller.js";
import api_f_updateUserPassword from "../server-controllers/user-controllers/update_user_password.controller.js";
import api_f_reactivateUser from "../server-controllers/user-controllers/reactivate_user.controller.js";

const V_APP_USER_ROUTER = express.Router();
const { auth, user } = f_getRouterPath();

// PUBLIC ACCESS
V_APP_USER_ROUTER.post(auth.signin_path, api_f_authenticateUser);

V_APP_USER_ROUTER.post(auth.signup_path, api_f_createUser);

V_APP_USER_ROUTER.post(auth.logout_path, api_f_logoutUser);

V_APP_USER_ROUTER.put(auth.resetPassword_path, api_f_resetUserPassword);

// PRIVATE ACCESS:

V_APP_USER_ROUTER.patch(auth.deactivateAccount_path, f_ProtectPrivateRouter, api_f_deactivateUser);

V_APP_USER_ROUTER.put(user.profileUpdate_path, f_ProtectPrivateRouter, api_f_updateUserProfile);

V_APP_USER_ROUTER.get(user.profile_path, f_ProtectPrivateRouter, api_f_getUserProfile);

V_APP_USER_ROUTER.post(auth.verifyEmail_path, f_ProtectPrivateRouter, api_f_verifyUserEmail);

V_APP_USER_ROUTER.patch(auth.updatePassword_path, f_ProtectPrivateRouter, api_f_updateUserPassword);

V_APP_USER_ROUTER.patch(auth.reactivateAccount_path, f_ProtectPrivateRouter, api_f_reactivateUser);

export default V_APP_USER_ROUTER;
