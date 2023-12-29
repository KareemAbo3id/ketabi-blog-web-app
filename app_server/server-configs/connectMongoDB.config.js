/* eslint-disable no-undef */
import mongoose from "mongoose";

/**
 * connect to MongoDB via Mongoose's default connection with `connect()` method
 *
 * @param {String} mongodb_uri
 * @returns {Promise} Returns a promise that resolves when connection successfully to MongoDB
 */

async function connectMongoDB(mongodb_uri) {
    try {
        const db_connect = await mongoose.connect(mongodb_uri.toString());
        const APP_DB_HOST = db_connect.connection.host;
        console.log(`✅ DB connection updated on host: ${APP_DB_HOST}`);
    } catch (error) {
        console.error(`❌ DB error: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDB;
