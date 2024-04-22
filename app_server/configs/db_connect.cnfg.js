import f_cnfg_db_connection_setup from "./db_connection_setup.cnfg";

/**
 * ### Configures the database connection based on the server environment.
 * @moduletype Configration
 */
function f_cnfg_db_connect() {
  process.env.V_ENV_SERVER_ENV === "development"
    ? f_cnfg_db_connection_setup(process.env.V_ENV_MONGODB_TEST_DB_URI)
    : f_cnfg_db_connection_setup(process.env.V_ENV_MONGODB_REAL_DB_URI);
}

export default f_cnfg_db_connect;
