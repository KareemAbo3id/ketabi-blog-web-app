/* eslint-disable no-undef */
import express from "express";
import getRouterPath from "./server-configs/getRouterPath.config.js";
import listenToServer from "./server-configs/listenToServer.config.js";
import globalErrorHandler from "./server-middlewares/error-middlewares/globalErrorHandler.middleware.js";
import notFoundErrorHandler from "./server-middlewares/error-middlewares/notFoundErrorHandler.middleware.js";
import {
    configure_dotenv,
    configure_json,
    configure_urlencoded,
    configure_dbConnect,
    configure_cookieParser,
} from "./server-configs/globalServerConfigs.config.js";
import APP_USER_ROUTER from "./server-routes/user_router.routes.js";

//HIGHLIGHT: APP SERVER CONFIGS:
const APP_PORT = process.env.SERVER_PORT || 5555;
const APP_SERVER = express();
configure_dotenv();
configure_dbConnect();
configure_json(APP_SERVER);
configure_urlencoded(APP_SERVER);
configure_cookieParser(APP_SERVER);
//****************************************************************

const { root } = getRouterPath();

// USER ROUTER:
APP_SERVER.use(root.user_path, APP_USER_ROUTER);

// MIDDLEWARES:
APP_SERVER.use(globalErrorHandler);
APP_SERVER.use(notFoundErrorHandler);

// SERVER LISTEN:
listenToServer(APP_SERVER, APP_PORT);

//****************************************************************
