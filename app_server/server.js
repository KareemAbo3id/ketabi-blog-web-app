/**
 * ### ketabi blog web application server
 * major technologies: Node.js, Express.js, MongoDB, Mongoose, JWT.
 * @fileoverview This file contains the server configuration and setup for the web application.
 * It imports necessary packages and modules, configures the server, sets up routes, and starts the server.
 * @module server
 * @KareemAbo3id
 *
 * variable naming conventions:
 * V_ / v_ : constant variables
 * f_ / F_ : function
 * m_ / M_ : method
 * p_ / P_ : parameter
 * data_ / DATA_ : DB data
 * model_ / MODEL_ : DB model
 *
 * How is everything connected? explain file structure:
 * 1. server.js is the main file that runs the server.
 * 2. server-configs/ contains configurations of db connection, server port, and server listen.
 * 3. server-controllers/ contains API controllers for the server, divided by user, blog, comment, like, etc.
 * 4. server-data-models/ contains Mongoose models connected to specific schemas.
 * 5. server-data-schemas/ contains Mongoose schemas for the models.
 * 6. server-middlewares/ contains middlewares handlers for the server.
 * 7. server-routes/ contains the API routes grouped by user, blog, comment, like, etc.
 * and other helper functions and configurations.
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

// APP SERVER CONFIGS:
const V_APP = express(); // create express app
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
