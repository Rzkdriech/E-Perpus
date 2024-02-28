import { prisma } from "../database/db.js";

export const getBuku = async (_, res) => {
  try {
    const response = await prisma.buku.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBuku = async (req, res) => {
  const newBuku = req.body;

  const dataExist = await prisma.buku.findMany({
    where: {
      Judul: newBuku.Judul,
    },
  });

  if (dataExist.length > 0) return res.status(400).json({ msg: "data exists" });

  try {
    const buku = await prisma.buku.create({
      data: {
        Cover: newBuku.Cover,
        Judul: newBuku.Judul,
        Penulis: newBuku.Penulis,
        Penerbit: newBuku.Penerbit,
        TahunTerbit: newBuku.TahunTerbit,
      },
    });
    res.status(201).json({ msg: "created data", data: buku });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
