import {  Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/header-layout/Header.layout";

function RouteLayout() {
    return (
        <Fragment>
            <Header userAuth={false} />
            <Outlet />
        </Fragment>
    );
}

export default RouteLayout;
