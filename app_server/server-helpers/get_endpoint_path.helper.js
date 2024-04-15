/**
 * ### Get Endpoint Path Function
 * get an endpoint router link from well organized links object.
 */
function f_get_endpoint_path() {
  const AppApiDocsPath = {
    /**
     * @link /development/api-documentation
     */
    ROOT: "/development/api-documentation",
  };

  const AppPath = {
    /**
     * @link /
     */
    ROOT: "/",

    /**
     * @link *
     */
    ERROR: "*",

    /**
     * @link /user
     */
    USER: "/user",

    /**
     * @link /checkpoint
     */
    CHECKPOINT: "/checkpoint",

    /**
     * @link /auth
     */
    AUTH: "/auth",
  };

  const UserPath = {
    /**
     * @link /user
     */
    ROOT: AppPath.USER,

    /**
     * @link /profile
     */
    Profile: "/profile",

    /**
     * @link /update-profile
     */
    UpdateProfile: "/update-profile",

    /**
     * @link /update-password
     */
    UpdatePassword: "/update-password",
  };

  const AuthPath = {
    /**
     * @link /auth
     */
    ROOT: AppPath.AUTH,

    /**
     * @link /auth/sign-in
     */
    SignIn: `${AppPath.AUTH}/sign-in`,

    /**
     * @link /auth/sign-out
     */
    SignOut: `${AppPath.AUTH}/sign-out`,

    /**
     * @link /auth/sign-up
     */
    SignUp: `${AppPath.AUTH}/sign-up`,

    /**
     * @link /auth/forget-password
     */
    ForgetPassword: `${AppPath.AUTH}/forget-password`,

    /**
     * @link /auth/reset-password/:TEMP_RESET_PASSWORD_TOKEN
     */
    ResetPassword: `${AppPath.AUTH}/reset-password/:TEMP_RESET_PASSWORD_TOKEN`,
  };

  const CheckpointPath = {
    /**
     * @link /checkpoint
     */
    ROOT: AppPath.CHECKPOINT,

    /**
     * @link /checkpoint/verify-email-address/:id
     */
    VerifyEmailAddress: `${AppPath.CHECKPOINT}/verify-email-address/:id`,

    /**
     * @link /checkpoint/deactivate-account/:id
     */
    DeactivateAccount: `${AppPath.CHECKPOINT}/deactivate-account/:id`,

    /**
     * @link /checkpoint/reactivate-account
     */
    ReactivateAccount: `${AppPath.CHECKPOINT}/reactivate-account`,
  };

  //
  return {
    /**
     * ```
     * { ROOT: "/development/api-documentation" }
     * ```
     */
    AppApiDocsPath,
    /**
     * ```
     * { ROOT: "/",
     * ERROR: "*",
     * USER: "/user",
     * CHECKPOINT: "/checkpoint",
     * AUTH: "/auth" }
     * ```
     */
    AppPath,
    /**
     * ```
     * { ROOT: "/user",
     * Profile: "/profile",
     * UpdateProfile: "/update-profile",
     * UpdatePassword: "/update-password" }
     * ```
     */
    UserPath,
    /**
     * ```
     * { ROOT: "/auth",
     * SignIn: "/auth/sign-in",
     * SignOut: "/auth/sign-out",
     * SignUp: "/auth/sign-up",
     * ForgetPassword: "/auth/forget-password",
     * ResetPassword: "/auth/reset-password/:TEMP_RESET_PASSWORD_TOKEN" }
     * ```
     */
    AuthPath,
    /**
     * ```
     * { ROOT: "/checkpoint",
     * VerifyEmailAddress: "/checkpoint/verify-email-address/:id",
     * DeactivateAccount: "/checkpoint/deactivate-account/:id",
     * ReactivateAccount: "/checkpoint/reactivate-account" }
     * ```
     */
    CheckpointPath,
  };
}

export default f_get_endpoint_path;
