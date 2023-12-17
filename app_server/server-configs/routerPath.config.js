function getRouterPath() {
    const error = { path: "*" };

    const root = {
        root_path: "/",
        user_path: "/u",
        auth_path: "/auth",
    };

    const user = {
        profile_path: `${root.user_path}/profile`,
        profileUpdate_path: `${root.user_path}/update-profile`,
    };

    const auth = {
        signin_path: `${root.user_path}${root.auth_path}/sign-in`,
        logout_path: `${root.user_path}${root.auth_path}/log-out`,
        signup_path: `${root.user_path}${root.auth_path}/sign-up`,
        verifyEmail_path: `${root.user_path}${root.auth_path}/checkpoint/verify-email`,
        resetPassword_path: `${root.user_path}${root.auth_path}/checkpoint/reset-password`,
        deleteAccount_path: `${root.user_path}${root.auth_path}/checkpoint/delete-account`,
    };

    //
    return { auth, user, root, error };
}

export default getRouterPath;
