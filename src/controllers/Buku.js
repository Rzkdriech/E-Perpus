import { prisma } from "../database/db.js";

export const getBuku = async(_, res) => {
  try {
    const response = await prisma.buku.findMany() 
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}


