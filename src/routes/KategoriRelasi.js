import express from "express";
import { getKategoriRelasi, createKategoriRelasi } from "../controllers/KategoriRelasi.js";

const router = express.Router();

router.get("/relCategories", getKategoriRelasi);
router.post("/relCategory", createKategoriRelasi);

export default router;
