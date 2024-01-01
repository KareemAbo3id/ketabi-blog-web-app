/* eslint-disable no-undef */
import express from "express";
import f_getRouterPath from "./server-configs/getRouterPath.config.js";
import f_listenToServer from "./server-configs/listenToServer.config.js";
import f_globalErrorHandler from "./server-middlewares/error-middlewares/globalErrorHandler.middleware.js";
import f_notFoundErrorHandler from "./server-middlewares/error-middlewares/notFoundErrorHandler.middleware.js";
import {
    f_configure_dotenv,
    f_configure_json,
    f_configure_urlencoded,
    f_configure_dbConnect,
    f_configure_cookieParser,
} from "./server-configs/globalServerConfigs.config.js";
import V_APP_USER_ROUTER from "./server-routes/user_router.routes.js";

//HIGHLIGHT: APP SERVER CONFIGS:
const V_APP_PORT = process.env.V_SERVER_PORT || 5555;
const V_APP_SERVER = express();
f_configure_dotenv();
f_configure_dbConnect();
f_configure_json(V_APP_SERVER);
f_configure_urlencoded(V_APP_SERVER);
f_configure_cookieParser(V_APP_SERVER);
//****************************************************************

const { root } = f_getRouterPath();

// USER ROUTER:
V_APP_SERVER.use(root.user_path, V_APP_USER_ROUTER);

// MIDDLEWARES:
V_APP_SERVER.use(f_globalErrorHandler);
V_APP_SERVER.use(f_notFoundErrorHandler);

// SERVER LISTEN:
f_listenToServer(V_APP_SERVER, V_APP_PORT);

//****************************************************************
