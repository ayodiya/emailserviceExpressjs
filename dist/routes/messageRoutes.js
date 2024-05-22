"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const messageControllers_1 = require("../controllers/messageControllers");
router.post("/send-message", messageControllers_1.sendMessage);
router.get("/get-messages/:user", messageControllers_1.getUserMessages);
router.get("/message-read/:id", messageControllers_1.setMessageRead);
exports.default = router;
