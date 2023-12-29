import { Route } from "react-router-dom";
import RouteLayout from "./routes/RouteLayout.route";
import HomePage from "./pages/home-page/HomePage.page";
import SigninPage from "./pages/auth-pages/SigninPage.auth";
import SignupPage from "./pages/auth-pages/SignupPage.auth";
import ErrorPage from "./pages/error-page/ErrorPage.page";
import VerifyEmailPage from "./pages/auth-pages/VerifyEmailPage.auth";
import BrowserRouterProvider from "./providers/BrowserRouterProvider.provider";
import ResetPasswordPage from "./pages/auth-pages/ResetPasswordPage.auth";
import getRouterPath from "./hooks/getRouterPath.hook";
import DeleteAccountPage from "./pages/auth-pages/DeleteAccountPage.auth";

function App() {
    const ROUTER_PATH = getRouterPath();

    return (
        <BrowserRouterProvider
            id={ROUTER_PATH.root.root_path}
            path={ROUTER_PATH.root.root_path}
            layoutElement={<RouteLayout />}
        >
            {/* index route ===================================== */}
            <Route index element={<HomePage />} />

            {/* auth routes ===================================== */}
            <Route
                id={ROUTER_PATH.auth.signin_path}
                path={ROUTER_PATH.auth.signin_path}
                element={<SigninPage />}
            />
            <Route
                id={ROUTER_PATH.auth.signup_path}
                path={ROUTER_PATH.auth.signup_path}
                element={<SignupPage />}
            />
            <Route
                id={ROUTER_PATH.auth.verifyEmail_path}
                path={ROUTER_PATH.auth.verifyEmail_path}
                element={<VerifyEmailPage />}
            />
            <Route
                id={ROUTER_PATH.auth.resetPassword_path}
                path={ROUTER_PATH.auth.resetPassword_path}
                element={<ResetPasswordPage />}
            />
            <Route
                id={ROUTER_PATH.auth.deleteAccount_path}
                path={ROUTER_PATH.auth.deleteAccount_path}
                element={<DeleteAccountPage />}
            />

            {/* error route ===================================== */}
            <Route
                id={ROUTER_PATH.error.path}
                path={ROUTER_PATH.error.path}
                element={<ErrorPage />}
            />
        </BrowserRouterProvider>
    );
}

export default App;
