import express from "express";

const router = express.Router();

import { sendMessage } from "../controllers/messageControllers";

router.post("/send-message", sendMessage);

export default router;
