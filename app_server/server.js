/**
 * ### Ketabi Web Application Server
 * @fileoverview This file contains the server configuration and setup for `Ketabi` web application.
 * It imports necessary packages and modules, configures the server, sets up routes, and starts the server.
 * @KareemAbo3id
 *
 * #### General Naming:
 * v_ | V_ : for variables.
 * f_ | F_ : for functions.
 * p_ | P_ : for parameters.
 * m_ | M_ : for methods.
 *
 * #### Specific Naming:
 * v_ctrl : for controllers.
 * v_mw : for middlewares.
 * v_cnfg : for configurations.
 * v_rtr : for routers.
 * v_mdl : for models.
 * v_sche : for schemas.
 * v_utl : for utilities.
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { V_PORT } from "./server-configs/set_server_port.cnfg.js";
import f_set_swagger_setup from "./server-api-docs/swagger_setup.js";
import v_swagger_documentation from "./server-api-docs/swagger_documentation.js";
import f_handle_global_error from "./server-middlewares/errors/handle_global_error.mw.js";
import f_middleware_not_found_error from "./server-middlewares/errors/handle_not_found_error.mw.js";
import f_set_server_listen from "./server-configs/set_server_listen.cnfg.js";
import f_get_endpoint_path from "./server-helpers/get_endpoint_path.helper.js";
import V_USER_ROUTER_GROUP from "./server-routes/user/user_router.routes.js";
import V_ERROR404_ROUTER from "./server-routes/error404/error404_router.routes.js";
import f_configer_db_connect from "./server-configs/set_db_connect.cnfg.js";

const V_APP = express();
dotenv.config();
f_configer_db_connect();
V_APP.use(cors());
V_APP.use(express.json());
V_APP.use(express.urlencoded({ extended: true }));
V_APP.use(cookieParser());
//*************************************

// APP SERVER ROUTES CONFIGS:
const { UserPath, AppApiDocsPath } = f_get_endpoint_path();
//*************************************

// ROUTER CONFIGS:
f_set_swagger_setup(V_APP, AppApiDocsPath.ROOT, v_swagger_documentation);
V_APP.use(UserPath.ROOT, V_USER_ROUTER_GROUP);
V_APP.use(V_ERROR404_ROUTER);
//*************************************

// MIDDLEWARES CONFIGS:
V_APP.use(f_handle_global_error);
V_APP.use(f_middleware_not_found_error);
//*************************************

// SERVER LISTEN CONFIGS:
f_set_server_listen(V_APP, V_PORT);
//*************************************
