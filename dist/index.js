"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// database function
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
// connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
//import routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
// Init Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// routes
app.use("/api/user", userRoutes_1.default);
app.use("/api/message", messageRoutes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
