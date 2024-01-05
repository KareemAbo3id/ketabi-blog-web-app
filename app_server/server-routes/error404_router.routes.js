import express from "express";
import F_API_ERROR_404 from "../server-api/error/error_404.api.js";
import F_GET_ROUTER_ENDPOINT from "../server-configs/getRouterPath.config.js";

const V_APP_ERROR404_ROUTER = express.Router();
const { V_PATH_ERROR } = F_GET_ROUTER_ENDPOINT();

V_APP_ERROR404_ROUTER.all(V_PATH_ERROR, F_API_ERROR_404);

export default V_APP_ERROR404_ROUTER;
