/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import f_connectMongoDB from "./connectMongoDB.config.js";

const f_configure_dotenv = () => {
    dotenv.config();
};

const f_configure_dbConnect = () => {
    process.env.V_NODE_ENV === "development"
        ? f_connectMongoDB(process.env.V_TEST_MONGODB_URI)
        : f_connectMongoDB(process.env.V_REAL_MONGODB_URI);
};

const f_configure_json = (p_server) => {
    p_server.use(express.json());
};

const f_configure_urlencoded = (p_server) => {
    p_server.use(express.urlencoded({ extended: true }));
};

const f_configure_cookieParser = (p_server) => {
    p_server.use(cookieParser());
};

export {
    f_configure_dotenv,
    f_configure_dbConnect,
    f_configure_json,
    f_configure_urlencoded,
    f_configure_cookieParser,
};
