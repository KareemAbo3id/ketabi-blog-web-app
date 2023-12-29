/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoDB from "./connectMongoDB.config.js";

const configure_dotenv = () => {
    dotenv.config();
};

const configure_dbConnect = () => {
    connectMongoDB(process.env.MONGODB_URI);
};

const configure_json = (server) => {
    server.use(express.json());
};

const configure_urlencoded = (server) => {
    server.use(express.urlencoded({ extended: true }));
};

const configure_cookieParser = (server) => {
    server.use(cookieParser());
};

export {
    configure_dotenv,
    configure_dbConnect,
    configure_json,
    configure_urlencoded,
    configure_cookieParser,
};
