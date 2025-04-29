"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config/config");
const connect_1 = __importDefault(require("./config/connect"));
const port = config_1.config.port;
const mongoUri = process.env.MONGO_URI || "";
dotenv_1.default.config();
(0, connect_1.default)(mongoUri);
app_1.default.listen(port, () => {
    console.log(`Server is running on environment ${port}`);
    console.log(`Environment: ${config_1.config.nodeEnv}`);
});
