
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function BrowserRouterProvider(props) {
    const { id, path, layoutElement, children } = props;
    return (
        <BrowserRouter>
            <Routes>
                <Route id={id} path={path} element={layoutElement}>
                    {/* PASS ROUTERS */}
                    {children}
                    {/* PASS ROUTERS */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

BrowserRouterProvider.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    layoutElement: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};

export default BrowserRouterProvider;
