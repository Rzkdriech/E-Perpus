import { prisma } from "../database/db.js";

export const getUsers = async (_, res) => {
    try {
      const response = await prisma.user.findMany();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };