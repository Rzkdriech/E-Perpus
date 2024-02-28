import express from "express";
import { getBuku } from "../controllers/Buku.js";

const router = express.Router();

router.get("/books", getBuku);
router.post("/book");

export default router;
