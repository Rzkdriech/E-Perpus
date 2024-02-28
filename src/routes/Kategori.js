import express from "express";
import { getKategori } from "../controllers/Kategori.js";

const router = express.Router();

router.get("/categories", getKategori);
router.post("/category");

export default router;
