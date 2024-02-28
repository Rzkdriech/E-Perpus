import express from "express";
import { getBuku, createBuku } from "../controllers/Buku.js";

const router = express.Router();

router.get("/books", getBuku);
router.post("/book", createBuku);

export default router;
