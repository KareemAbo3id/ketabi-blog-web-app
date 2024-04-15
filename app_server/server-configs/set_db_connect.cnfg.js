import mongoose from "mongoose";

/**
 * ### Establishes a connection to the MongoDB database.
 * @param {string} p_mongodb_uri - The MongoDB connection URI.
 * @returns {Promise<void>} A promise that resolves when the connection is established successfully.
 */
async function f_set_db_connect(p_mongodb_uri) {
  try {
    const v_db_connect = await mongoose.connect(p_mongodb_uri.toString());
    const v_app_db_host = v_db_connect.connection.host;
    console.log(`SUCCESS: DB connection updated on host: ${v_app_db_host}\n`);
  } catch (error) {
    console.error(`FAIL: DB error: ${error.message}\n`);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}

/**
 * ### Configures the database connection based on the environment.
 * @returns {Promise<void>} A promise that resolves when the database connection is established.
 */
const f_configer_db_connect = () => {
  // eslint-disable-next-line no-undef
  process.env.V_EXPRESS_SERVER_ENV === "development"
    ? // eslint-disable-next-line no-undef
      f_set_db_connect(process.env.V_MONGODB_TEST_DB_URI)
    : // eslint-disable-next-line no-undef
      f_set_db_connect(process.env.V_MONGODB_REAL_DB_URI);
};

export default f_configer_db_connect;
