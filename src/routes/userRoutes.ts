import express from "express";

const router = express.Router();

import { addUser } from "../controllers/userControllers";

router.post("/", addUser);

export default router;