import express from "express";
import f_get_endpoint_path from "../../server-helpers/get_endpoint_path.helper.js";
import f_handle_protect_private_route from "../../server-middlewares/routes/handle_protect_private_route.mw.js";
import f_control_sign_in from "../../server-controllers/user/auth/sign_in.ctrl.js";
import f_control_sign_up from "../../server-controllers/user/auth/sign_up.ctrl.js";
import f_control_sign_out from "../../server-controllers/user/auth/sign_out.ctrl.js";
import f_control_deactivate_account from "../../server-controllers/user/checkpoint/deactivate_account.ctrl.js";
import f_control_reactivate_account from "../../server-controllers/user/checkpoint/reactivate_account.ctrl.js";
import f_control_verify_email_address from "../../server-controllers/user/checkpoint/verify_email_address.ctrl.js";
import f_control_get_profile from "../../server-controllers/user/get_profile.ctrl.js";
import f_control_update_password from "../../server-controllers/user/update_password.ctrl.js";
import f_control_update_profile from "../../server-controllers/user/update_profile.ctrl.js";
import f_control_forget_password from "../../server-controllers/user/auth/forget_password.ctrl.js";
import f_control_reset_password from "../../server-controllers/user/auth/reset_password.ctrl.js";

const V_USER_ROUTER_GROUP = express.Router(); // create express router
const { UserPath, AuthPath, CheckpointPath } = f_get_endpoint_path();

// PUBLIC ACCESS ENDPOINTS:

V_USER_ROUTER_GROUP.post(AuthPath.SignIn, f_control_sign_in);

V_USER_ROUTER_GROUP.post(AuthPath.SignUp, f_control_sign_up);

V_USER_ROUTER_GROUP.post(AuthPath.SignOut, f_control_sign_out);

V_USER_ROUTER_GROUP.post(AuthPath.ForgetPassword, f_control_forget_password);

V_USER_ROUTER_GROUP.patch(AuthPath.ResetPassword, f_control_reset_password);

// PRIVATE ACCESS ENDPOINTS:
V_USER_ROUTER_GROUP.patch(
  CheckpointPath.DeactivateAccount,
  f_handle_protect_private_route,
  f_control_deactivate_account
);

V_USER_ROUTER_GROUP.patch(
  CheckpointPath.VerifyEmailAddress,
  f_handle_protect_private_route,
  f_control_verify_email_address
);

V_USER_ROUTER_GROUP.patch(
  CheckpointPath.ReactivateAccount,
  f_handle_protect_private_route,
  f_control_reactivate_account
);

V_USER_ROUTER_GROUP.get(
  UserPath.Profile,
  f_handle_protect_private_route,
  f_control_get_profile
);

V_USER_ROUTER_GROUP.patch(
  UserPath.UpdatePassword,
  f_handle_protect_private_route,
  f_control_update_password
);

V_USER_ROUTER_GROUP.put(
  UserPath.UpdateProfile,
  f_handle_protect_private_route,
  f_control_update_profile
);

export default V_USER_ROUTER_GROUP;
