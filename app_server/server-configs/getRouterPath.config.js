function f_getRouterPath() {
    const error = { path: "*" };

    const root = {
        root_path: "/",
        user_path: "/u",
        auth_path: "/auth",
    };

    const user = {
        profile_path: "/profile",
        profileUpdate_path: "/update-profile",
    };

    const auth = {
        signin_path: `${root.auth_path}/sign-in`,
        logout_path: `${root.auth_path}/log-out`,
        signup_path: `${root.auth_path}/sign-up`,
        verifyEmail_path: `${root.auth_path}/checkpoint/verify-email`,
        resetPassword_path: `${root.auth_path}/checkpoint/reset-password`,
        updatePassword_path: `${root.auth_path}/checkpoint/update-password`,
        deactivateAccount_path: `${root.auth_path}/checkpoint/deactivate-account`,
        reactivateAccount_path: `${root.auth_path}/checkpoint/reactivate-account`,
    };

    //
    return { auth, user, root, error };
}

export default f_getRouterPath;
