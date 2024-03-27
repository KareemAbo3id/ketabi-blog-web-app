/**
 * ### Get Endpoint Path Function
 * get an endpoint router link from well organized links object.
 * ```
 * const { AuthPath } = f_get_endpoint_path();
 * AuthPath.SignIn;
 * AuthPath.ResetPassword;
 * ```
 */
function f_get_endpoint_path() {
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
     * @link /auth/reset-password
     */
    ForgetPassword: `${AppPath.AUTH}/forget-password`,

    /**
     * @link /auth/reset-password
     * @param {string} userId
     * @param {string} tokenExtension
     */
    ResetPassword: `${AppPath.AUTH}/reset-password/:V_RESET_PASSWORD_TOKEN`,
  };

  const CheckpointPath = {
    /**
     * @link /checkpoint
     */
    ROOT: AppPath.CHECKPOINT,

    /**
     * @link /checkpoint/verify-email-address
     */
    VerifyEmailAddress: `${AppPath.CHECKPOINT}/verify-email-address/:id`,

    /**
     * @link /checkpoint/deactivate-account
     */
    DeactivateAccount: `${AppPath.CHECKPOINT}/deactivate-account?id=:_id`,

    /**
     * @link /checkpoint/reactivate-account
     */
    ReactivateAccount: `${AppPath.CHECKPOINT}/reactivate-account`,
  };

  //
  return {
    /**
     * ```
     * AppPath: {
     *   ROOT: "/";
     *   ERROR: "*";
     *   USER: "/user";
     *   CHECKPOINT: "/checkpoint";
     *   AUTH: "/auth";
     * }
     * ```
     */
    AppPath,

    /**
     * ```
     * UserPath: {
     * ROOT: "/user",
     * Profile: "/profile",
     * UpdateProfile: "/update-profile",
     * UpdatePassword: "/update-password",
     * }
     * ```
     */
    UserPath,

    /**
     * ```
     * AuthPath: {
     * ROOT: "/auth",
     * SignIn: "/auth/sign-in",
     * SignOut: "/auth/sign-out",
     * SignUp: "/auth/sign-up",
     * ResetPassword: "/auth/reset-password",
     * }
     * ```
     */
    AuthPath,

    /**
     * ```
     * CheckpointPath: {
     * ROOT: "/checkpoint",
     * VerifyEmailAddress: "/checkpoint/verify-email-address",
     * DeactivateAccount: "/checkpoint/deactivate-account",
     * ReactivateAccount: "/checkpoint/reactivate-account",
     * }
     * ```
     */
    CheckpointPath,
  };
}

export default f_get_endpoint_path;
