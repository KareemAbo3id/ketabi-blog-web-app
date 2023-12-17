//----------------------------//
// KETABI NODE EXPRESS SERVER //
//----------------------------//

import express from "express";
import dotenv from "dotenv";

// APP SERVER CONFIGS:
const APP_DOTENV_CONFIG = dotenv.config();
// eslint-disable-next-line no-undef
const APP_PORT = process.env.SERVER_PORT || 5555;
const APP_SERVER = express();

// APP SERVER INIT:
APP_DOTENV_CONFIG;

APP_SERVER.get("/", (req, res) => {
    res.send("hello from server");
});

APP_SERVER.listen(APP_PORT, () =>
    console.log(`SERVER: Ketabi app listening on port ${APP_PORT}`)
);
