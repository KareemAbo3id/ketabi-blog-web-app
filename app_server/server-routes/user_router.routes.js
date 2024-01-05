import express from "express";
import F_GET_ROUTER_ENDPOINT from "../server-configs/getRouterPath.config.js";
import F_MW_PROTECT_PRIVATE_ROUTER from "../server-middlewares/routes/protectRoute.middleware.js";
import F_API_SIGN_IN from "../server-api/user/auth/sign_in.api.js";
import F_API_SIGN_UP from "../server-api/user/auth/sign_up.api.js";
import F_API_SIGN_OUT from "../server-api/user/auth/sign_out.api.js";
import F_API_RESET_PASSWORD from "../server-api/user/auth/reset_password.api.js";
import F_API_DEACTIVATE_ACCOUNT from "../server-api/user/checkpoint/deactivate_account.api.js";
import F_API_REACTIVATE_ACCOUNT from "../server-api/user/checkpoint/reactivate_account.api.js";
import F_API_VERIFY_EMAIL_ADDRESS from "../server-api/user/checkpoint/verify_email_address.api.js";
import F_API_UPDATE_PROFILE from "../server-api/user/update_profile.api.js";
import F_API_GET_PROFILE from "../server-api/user/get_profile.api.js";
import F_API_UPDATE_PASSWORD from "../server-api/user/update_password.api.js";

const V_APP_USER_ROUTER = express.Router();
const { V_PATH_USER, V_PATH_AUTH, V_PATH_CHECKPOINT } = F_GET_ROUTER_ENDPOINT();

// PUBLIC ACCESS ENDPOINTS:
V_APP_USER_ROUTER.post(V_PATH_AUTH._sign_in, F_API_SIGN_IN);

V_APP_USER_ROUTER.post(V_PATH_AUTH._sign_up, F_API_SIGN_UP);

V_APP_USER_ROUTER.post(V_PATH_AUTH._sign_out, F_API_SIGN_OUT);

V_APP_USER_ROUTER.put(V_PATH_AUTH._reset_password, F_API_RESET_PASSWORD);

// PRIVATE ACCESS ENDPOINTS:

V_APP_USER_ROUTER.patch(
    V_PATH_CHECKPOINT._deactivate_account,
    F_MW_PROTECT_PRIVATE_ROUTER,
    F_API_DEACTIVATE_ACCOUNT
);

V_APP_USER_ROUTER.patch(
    V_PATH_CHECKPOINT._reactivate_account,
    F_MW_PROTECT_PRIVATE_ROUTER,
    F_API_REACTIVATE_ACCOUNT
);

V_APP_USER_ROUTER.post(
    V_PATH_CHECKPOINT._verify_email_address,
    F_MW_PROTECT_PRIVATE_ROUTER,
    F_API_VERIFY_EMAIL_ADDRESS
);

V_APP_USER_ROUTER.put(
    V_PATH_USER._update_profile,
    F_MW_PROTECT_PRIVATE_ROUTER,
    F_API_UPDATE_PROFILE
);

V_APP_USER_ROUTER.get(
    V_PATH_USER._profile,
    F_MW_PROTECT_PRIVATE_ROUTER,
    F_API_GET_PROFILE
);

V_APP_USER_ROUTER.patch(
    V_PATH_USER._update_password,
    F_MW_PROTECT_PRIVATE_ROUTER,
    F_API_UPDATE_PASSWORD
);

export default V_APP_USER_ROUTER;
