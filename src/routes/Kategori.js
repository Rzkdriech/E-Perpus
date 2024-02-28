import express from "express";
import { getKategori, createKategori } from "../controllers/Kategori.js";

const router = express.Router();

router.get("/categories", getKategori);
router.post("/category", createKategori);

export default router;
