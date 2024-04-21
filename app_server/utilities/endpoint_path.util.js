/** ### Get Endpoint Path Function */
function f_utl_endpoint_path() {
  //
  const AppApiDocsPath = {
    /** `/api-docs` */
    ROOT: "/api-docs",
  };

  const AppPath = {
    /** `/` */
    ROOT: "/",

    /** `*` */
    ERROR: "*",

    /** `/user` */
    USER: "/user",

    /** `/checkpoint` */
    CHECKPOINT: "/checkpoint",

    /** `/auth` */
    AUTH: "/auth",
  };

  const UserPath = {
    /** `/user` */
    ROOT: AppPath.USER,

    /** `/profile/{DATA_USERNAME}` */
    Profile: "/profile/{DATA_USERNAME}",

    /** `/update-profile/{DATA_USERNAME}` */
    UpdateProfile: "/update-profile/{DATA_USERNAME}",

    /** `/update-password/{DATA_USERNAME}` */
    UpdatePassword: "/update-password/{DATA_USERNAME}",
  };

  const AuthPath = {
    /** `/auth` */
    ROOT: AppPath.AUTH,

    /** `/auth/sign-in` */
    SignIn: `${AppPath.AUTH}/sign-in`,

    /** `/auth/sign-out` */
    SignOut: `${AppPath.AUTH}/sign-out`,

    /** `/auth/sign-up` */
    SignUp: `${AppPath.AUTH}/sign-up`,

    /** `/auth/forget-password` */
    ForgetPassword: `${AppPath.AUTH}/forget-password`,

    /** `/auth/reset-password/{TEMP_RESET_PASSWORD_TOKEN}` */
    ResetPassword: `${AppPath.AUTH}/reset-password/{TEMP_RESET_PASSWORD_TOKEN}`,
  };

  const CheckpointPath = {
    /** `/checkpoint` */
    ROOT: AppPath.CHECKPOINT,

    /** `/checkpoint/verify-email-address/{DATA_USERNAME}/{_id}` */
    VerifyEmailAddress: `${AppPath.CHECKPOINT}/verify-email-address/{DATA_USERNAME}/{_id}`,

    /** `/checkpoint/deactivate-account/{DATA_USERNAME}` */
    DeactivateAccount: `${AppPath.CHECKPOINT}/deactivate-account/{DATA_USERNAME}`,

    /** `/checkpoint/reactivate-account/{DATA_USERNAME}` */
    ReactivateAccount: `${AppPath.CHECKPOINT}/reactivate-account/{DATA_USERNAME}`,
  };

  //
  return {
    /** `ROOT: "/api-docs"` */
    AppApiDocsPath,

    /** `ROOT: "/"`
     * `ERROR: "*"`
     * `USER: "/user"`
     * `CHECKPOINT: "/checkpoint"`
     * `AUTH: "/auth` */
    AppPath,

    /**  `ROOT: "/user"`
     * `Profile: "/profile/{DATA_USERNAME}"`
     * `UpdateProfile: "/update-profile/{DATA_USERNAME}"`
     * `UpdatePassword: "/update-password/{DATA_USERNAME}"`*/
    UserPath,

    /** `ROOT: "/auth"`
     * `SignIn: "/auth/sign-in"`
     * `SignOut: "/auth/sign-out"`
     * `SignUp: "/auth/sign-up"`
     * `ForgetPassword: "/auth/forget-password"`
     * `ResetPassword: "/auth/reset-password/{TEMP_RESET_PASSWORD_TOKEN}"` */
    AuthPath,

    /** `ROOT: "/checkpoint"`
     * `VerifyEmailAddress: "/checkpoint/verify-email-address/{DATA_USERNAME}/{_id}"`
     * `DeactivateAccount: "/checkpoint/deactivate-account/{DATA_USERNAME}"`
     * `ReactivateAccount: "/checkpoint/reactivate-account/{DATA_USERNAME}"` */
    CheckpointPath,
  };
}

export default f_utl_endpoint_path;
