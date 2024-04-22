import mongoose from "mongoose";

/**
 * ### Sets up the database connection using the provided MongoDB URI.
 * @moduletype Configration
 *
 * @param {string} p_mongodb_uri The MongoDB URI to connect to.
 * @returns {Promise<void>} A Promise that resolves when the database connection is established.
 */
async function f_cnfg_db_connection_setup(p_mongodb_uri) {
  try {
    const v_db_connection = await mongoose.connect(p_mongodb_uri.toString());
    const v_db_host = v_db_connection.connection.host;
    console.log(`SUCCESS: DB connection updated on host: ${v_db_host}\n`);
  } catch (error) {
    console.error(`FAIL: DB error: ${error.message}\n`);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}

export default f_cnfg_db_connection_setup;
