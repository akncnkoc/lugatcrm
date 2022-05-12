import prisma from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getSuppilers(res)
      break
  }
}

const getSuppilers = async (res: NextApiResponse) => {
  try {
    const result = await prisma.supplier.findMany()
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}
