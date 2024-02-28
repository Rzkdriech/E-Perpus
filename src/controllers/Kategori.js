import { prisma } from "../database/db.js";

export const getKategori = async (_, res) => {
  try {
    const response = await prisma.kategoribuku.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKategori = async (req, res) => {
  const newKategori = req.body;

  const dataExist = await prisma.kategoribuku.findMany({
    where: {
      NamaKategori: newKategori.NamaKategori,
    },
  });

  if (dataExist.length > 0) return res.status(400).json({ msg: "data exists" });

  try {
    const kategori = await prisma.kategoribuku.create({
      data: {
        NamaKategori: newKategori.NamaKategori
      },
    });
    res.status(201).json({ msg: "created data", data: kategori });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

