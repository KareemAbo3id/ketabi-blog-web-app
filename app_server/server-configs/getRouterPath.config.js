// import fs from "fs";

function F_GET_ROUTER_ENDPOINT() {
    const V_PATH_ROOT_APP = { _path: "/" };
    const V_PATH_ROOT_ERROR = { _path: "*" };
    const V_PATH_ROOT_USER = { _path: "/user" };
    const V_PATH_ROOT_CHECKPOINT = { _path: "/checkpoint" };
    const V_PATH_ROOT_AUTH = { _path: "/auth" };

    const V_PATH_ROOT = V_PATH_ROOT_APP._path;

    const V_PATH_ERROR = V_PATH_ROOT_ERROR._path;

    const V_PATH_USER = {
        _root: V_PATH_ROOT_USER._path,
        _profile: `profile`,
        _update_profile: `/update-profile`,
        _update_password: `/update-password`,
    };

    const V_PATH_AUTH = {
        _sign_in: `${V_PATH_ROOT_AUTH._path}/sign-in`,
        _sign_out: `${V_PATH_ROOT_AUTH._path}/sign-out`,
        _sign_up: `${V_PATH_ROOT_AUTH._path}/sign-up`,
        _reset_password: `${V_PATH_ROOT_AUTH._path}/reset-password`,
    };

    const V_PATH_CHECKPOINT = {
        _verify_email_address: `${V_PATH_ROOT_CHECKPOINT._path}/verify-email-address`,
        _deactivate_account: `${V_PATH_ROOT_CHECKPOINT._path}/deactivate-account`,
        _reactivate_account: `${V_PATH_ROOT_CHECKPOINT._path}/reactivate-account`,
    };

    //
    return {
        V_PATH_ROOT,
        V_PATH_ERROR,
        V_PATH_USER,
        V_PATH_AUTH,
        V_PATH_CHECKPOINT,
    };
}

// fs.writeFile(
//     "PATH.txt",
//     [
//         `file                       fun                         path`,
//         `get_profile.api            F_API_GET_PROFILE           ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_USER._profile
//         }`,
//         `update_profile.api         F_API_UPDATE_PROFILE        ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_USER._update_profile
//         }`,
//         `update_password.api        F_API_UPDATE_PASSWORD       ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_USER._update_password
//         }`,
//         `sign_in.api                F_API_SIGN_IN               ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_AUTH._sign_in
//         }`,
//         `sign_out.api               F_API_SIGN_OUT              ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_AUTH._sign_out
//         }`,
//         `sign_up.api                F_API_SIGN_UP               ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_AUTH._sign_up
//         }`,
//         `reset_password.api         F_API_RESET_PASSWORD        ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_AUTH._reset_password
//         }`,
//         `verify_email_address.api   F_API_VERIFY_EMAIL_ADDRESS  ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_CHECKPOINT._verify_email_address
//         }`,
//         `deactivate_account.api     F_API_DEACTIVATE_ACCOUNT    ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_CHECKPOINT._deactivate_account
//         }`,
//         `reactivate_account.api     F_API_REACTIVATE_ACCOUNT    ${
//             F_GET_ROUTER_ENDPOINT().V_PATH_CHECKPOINT._reactivate_account
//         }`,
//     ]
//         .join("\n")
//         .toString(),
//     "utf-8",
//     () => {
//         console.log("done");
//     }
// );

export default F_GET_ROUTER_ENDPOINT;
