import { prisma } from "../database/db.js";

export const getKategoriRelasi = async (_, res) => {
  try {
    const response = await prisma.kategoribuku_relasi.findMany({
      include: {
        buku: true,
        kategoribuku: true
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKategoriRelasi = async (req, res) => {
  const newKategoriRel = req.body;

  const dataExist = await prisma.kategoribuku_relasi.findMany({
    where: {
      BukuID: newKategoriRel.BukuID,
      KategoriID: newKategoriRel.KategoriID,
    },
  });

  if (dataExist.length > 0) return res.status(400).json({ msg: "data exists" });

  try {
    const kategori = await prisma.kategoribuku_relasi.create({
      data: {
        BukuID: newKategoriRel.BukuID,
        KategoriID: newKategoriRel.KategoriID,
      },
    });
    res.status(201).json({ msg: "created data", data: kategori });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
