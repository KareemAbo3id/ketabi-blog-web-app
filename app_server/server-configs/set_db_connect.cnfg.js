/* eslint-disable no-undef */
import mongoose from "mongoose";

/**
 * ### MongoDB Set Connection Function
 * Connect to MongoDB server through Mongoose's `connect()` method
 * @param {String} p_mongodb_uri "mongoDB database secret uri"
 * @returns {Promise} Returns a promise that resolves MongoDB connection
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
 * ### Mongodb Config Connection Function Based On DB Uri
 * @returns {Promise} Returns a promise that resolves MongoDB connection
 */
const f_configer_db_connect = () => {
  process.env.V_EXPRESS_SERVER_ENV === "development"
    ? f_set_db_connect(process.env.V_MONGODB_TEST_DB_URI)
    : f_set_db_connect(process.env.V_MONGODB_REAL_DB_URI);
};

export default f_configer_db_connect;
