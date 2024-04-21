import express from "express";
import f_control_error_404 from "../../server-controllers/error404/error_404.ctrl.js";
import f_get_endpoint_path from "../../server-helpers/get_endpoint_path.helper.js";

const V_ERROR404_ROUTER = express.Router();
const { AppPath } = f_get_endpoint_path();

// PUBLIC ACCESS ENDPOINTS:
V_ERROR404_ROUTER.all(AppPath.ERROR, f_control_error_404);

export default V_ERROR404_ROUTER;
