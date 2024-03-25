import { prisma } from "../database/db.js";

export const getUsers = async (_, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { password, confPass } = req.body;
  const newUser = req.body;

  // Password
  if (password != confPass)
    return res.status(400).json({ msg: "Pastikan password anda benar" });

  const checkUser = await prisma.user.findMany({
    where: {
      Email: newUser.email
    }
  });

  if (checkUser.length > 0) return res.status(400).json({ msg: "User exist" });

  try {
    const user = await prisma.user.create({
      data: {
        Username: newUser.username,
        Password: password,
        Email: newUser.email,
        Nama_lengkap: newUser.nama_lengkap,
        Alamat: newUser.alamat,
        Role: "Peminjam"
      }
    });
    res.status(201).json({ msg: "data created", data: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
