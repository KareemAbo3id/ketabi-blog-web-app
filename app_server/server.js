/**
 * @fileoverview This file contains the server configuration and setup for the web application.
 * It imports necessary packages and modules, configures the server, sets up routes, and starts the server.
 * @module server
 * @KareemAbo3id
 */

/**
 * ketabi blog web application server
 * @typedef {Object} Server
 * @property {function} use - Express middleware function
 * @property {function} listen - Starts the server and listens for incoming requests
 */

/**
 * Express.js - Fast, unopinionated, minimalist web framework for Node.js
 * @external express
 * @see {@link https://expressjs.com/}
 */

/**
 * dotenv - Loads environment variables from a .env file into process.env
 * @external dotenv
 * @see {@link https://www.npmjs.com/package/dotenv}
 */

/**
 * cors - Middleware that can be used to enable CORS with various options
 * @external cors
 * @see {@link https://www.npmjs.com/package/cors}
 */

/**
 * cookie-parser - Parse Cookie header and populate req.cookies with an object keyed by the cookie names
 * @external cookie-parser
 * @see {@link https://www.npmjs.com/package/cookie-parser}
 */

/**
 * server-configs/set_server_port.cnfg.js - File containing the server port configuration
 * @external set_server_port
 * @see {@link /c:/Users/credit.aa/Documents/ketabi-blog-web-app/app_server/server-configs/set_server_port.cnfg.js}
 */

/**
 * server-middlewares/errors/handle_global_error.mw.js - File containing the global error handling middleware
 * @external handle_global_error
 * @see {@link /c:/Users/credit.aa/Documents/ketabi-blog-web-app/app_server/server-middlewares/errors/handle_global_error.mw.js}
 */

/**
 * server-middlewares/errors/handle_not_found_error.mw.js - File containing the not found error handling middleware
 * @external handle_not_found_error
 * @see {@link /c:/Users/credit.aa/Documents/ketabi-blog-web-app/app_server/server-middlewares/errors/handle_not_found_error.mw.js}
 */

/**
 * server-configs/set_server_listen.cnfg.js - File containing the server listen configuration
 * @external set_server_listen
 * @see {@link /c:/Users/credit.aa/Documents/ketabi-blog-web-app/app_server/server-configs/set_server_listen.cnfg.js}
 */

/**
 * server-helpers/get_endpoint_path.helper.js - File containing the helper function to get endpoint paths
 * @external get_endpoint_path
 * @see {@link /c:/Users/credit.aa/Documents/ketabi-blog-web-app/app_server/server-helpers/get_endpoint_path.helper.js}
 */

/**
 * server-routes/user/user_router.routes.js - File containing the user router configuration
 * @external user_router_routes
 * @see {@link /c:/Users/credit.aa/Documents/ketabi-blog-web-app/app_server/server-routes/user/user_router.routes.js}
 */

/**
 * server-routes/error404/error404_router.routes.js - File containing the error404 router configuration
 * @external error404_router_routes
 * @see {@link /c:/Users/credit.aa/Documents/ketabi-blog-web-app/app_server/server-routes/error404/error404_router.routes.js}
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { V_PORT } from "./server-configs/set_server_port.cnfg.js";
import f_handle_global_error from "./server-middlewares/errors/handle_global_error.mw.js";
import f_handle_not_found_error from "./server-middlewares/errors/handle_not_found_error.mw.js";
import f_set_server_listen from "./server-configs/set_server_listen.cnfg.js";
import f_get_endpoint_path from "./server-helpers/get_endpoint_path.helper.js";
import V_USER_ROUTER_GROUP from "./server-routes/user/user_router.routes.js";
import V_ERROR404_ROUTER from "./server-routes/error404/error404_router.routes.js";
import f_configer_db_connect from "./server-configs/set_db_connect.cnfg.js";

/**
 * ### Express application instance
 * @type {Server}
 */
const V_APP = express();
dotenv.config();
f_configer_db_connect();
V_APP.use(cors());
V_APP.use(express.json());
V_APP.use(express.urlencoded({ extended: true }));
V_APP.use(cookieParser());
//*************************************

// APP SERVER ROUTES CONFIGS:
const { UserPath } = f_get_endpoint_path();
//*************************************

// ROUTER CONFIGS:
V_APP.use(UserPath.ROOT, V_USER_ROUTER_GROUP);
V_APP.use(V_ERROR404_ROUTER);
//*************************************

// MIDDLEWARES CONFIGS:
V_APP.use(f_handle_global_error);
V_APP.use(f_handle_not_found_error);
//*************************************

// SERVER LISTEN CONFIGS:
f_set_server_listen(V_APP, V_PORT);
//*************************************
