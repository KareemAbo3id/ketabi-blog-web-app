/* eslint-disable no-undef */
import mongoose from "mongoose";

/**
 * connect to MongoDB via Mongoose's default connection with `connect()` method
 *
 * @param {String} p_mongodb_uri
 * @returns {Promise} Returns a promise that resolves when connection successfully to MongoDB
 */

async function f_connectMongoDB(p_mongodb_uri) {
    try {
        const v_db_connect = await mongoose.connect(p_mongodb_uri.toString());
        const v_APP_DB_HOST = v_db_connect.connection.host;
        console.log(`✅ DB connection updated on host: ${v_APP_DB_HOST}\n`);
    } catch (error) {
        console.error(`❌ DB error: ${error.message}\n`);
        process.exit(1);
    }
}

export default f_connectMongoDB;
