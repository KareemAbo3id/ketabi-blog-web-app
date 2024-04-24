/**
 * ### Ketabi Web Application Server
 * @fileoverview This file contains the server configuration and setup for `Ketabi` web application.
 * It imports necessary packages and modules, configures the server, sets up routes, and starts the server.
 *
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
 * v_utl : for utilities.
 * v_doc : for documentation.
 * v_vld : for validations.
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { v_port } from "./configs/port.cnfg.js";
import f_cnfg_swagger_setup from "./configs/swagger_setup.cnfg.js";
import v_swagger_docs from "./documentation/swagger_docs.doc.js";
import f_mw_global_error_handler from "./middlewares/global_error.mw.js";
import f_mw_not_found_error from "./middlewares/not_found_error.mw.js";
import f_cnfg_server_listen from "./configs/server_listen.cnfg.js";
import f_utl_endpoint_path from "./utilities/endpoint_path.util.js";
import V_USER_ROUTER_GROUP from "./server-routes/user/user_router.routes.js";
import f_cnfg_db_connect from "./server-configs/set_db_connect.cnfg.js";

const v_app = express();
dotenv.config();
f_cnfg_db_connect();
v_app.use(cors());
v_app.use(express.json());
v_app.use(express.urlencoded({ extended: true }));
v_app.use(cookieParser());

// APP SERVER ROUTES CONFIGS:
const { UserPath, AppApiDocsPath } = f_utl_endpoint_path();

// ROUTER CONFIGS:
f_cnfg_swagger_setup(v_app, AppApiDocsPath.ROOT, v_swagger_docs);
v_app.use(UserPath.ROOT, V_USER_ROUTER_GROUP);

// MIDDLEWARES CONFIGS:
v_app.use(f_mw_global_error_handler);
v_app.use(f_mw_not_found_error);

// SERVER LISTEN CONFIGS:
f_cnfg_server_listen(v_app, v_port);
