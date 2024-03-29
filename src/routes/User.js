import express from "express";
import { getUsers, createUser } from "../controllers/User.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/user", createUser);

export default router;
