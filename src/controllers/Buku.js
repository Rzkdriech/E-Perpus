import { prisma } from "../database/db.js";

export const getBuku = async (_, res) => {
  try {
    const response = await prisma.buku.findMany({
      include: {
        kategoribuku_relasi: {
          include: {
            kategoribuku: true,
          },
        },
      },
    });
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

  const kategori = await prisma.kategoribuku.findFirst({
    where: {
      NamaKategori: newBuku.kategoribuku
    }
  })

  if (!kategori) return res.status(404).json({ msg: "kategori not found"})

  if (dataExist.length > 0) return res.status(400).json({ msg: "data exists" }); 

  try {
    const buku = await prisma.buku.create({
      data: {
        Cover: newBuku.cover,
        Judul: newBuku.judul,
        Penulis: newBuku.penulis,
        Penerbit: newBuku.penerbit,
        TahunTerbit: newBuku.tahunTerbit,
        kategoribuku_relasi: {
          create: {
            kategoribuku: {
              connect: {
                KategoriID: kategori.KategoriID
              },
            },
          },
        },
      },
    });
    res.status(201).json({ msg: "created data", data: buku });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
