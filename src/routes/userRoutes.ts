import express from "express";

const router = express.Router();

import { addUser, getUser } from "../controllers/userControllers";

router.post("/", addUser);
router.get("/:name", getUser);

export default router;
