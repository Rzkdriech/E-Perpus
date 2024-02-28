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
  const { Password, ConfPass } = req.body;
  const newUser = req.body;

  // Password
  if (Password != ConfPass)
    return res.status(400).json({ msg: "Pastikan password anda benar" });

  const checkUser = await prisma.user.findMany({
    where: {
      Email: newUser.Email
    }
  });

  if (checkUser.length > 0) return res.status(400).json({ msg: "User exist" });

  try {
    const user = await prisma.user.create({
      data: {
        Username: newUser.Username,
        Password: Password,
        Email: newUser.Email,
        Nama_lengkap: newUser.Nama_lengkap,
        Alamat: newUser.Alamat,
        Role: newUser.Role
      }
    });
    res.status(201).json({ msg: "data created", data: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
