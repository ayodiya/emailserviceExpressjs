import express from "express";

const router = express.Router();

import {
  sendMessage,
  getUserMessages,
  setMessageRead,
} from "../controllers/messageControllers";

router.post("/send-message", sendMessage);
router.get("/get-messages/:user", getUserMessages);
router.get("/message-read/:id", setMessageRead);

export default router;
