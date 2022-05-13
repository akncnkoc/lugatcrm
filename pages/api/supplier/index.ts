import prisma from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req as any
  switch (req.method) {
    case "POST":
      await createSupplier(req.body, res)
      break
    case "PUT":
      await updateSupplier(id, req.body, res)
      break
    case "GET":
      if (!id) {
        await getSuppilers(res)
      } else {
        await getSuppiler(id, res)
      }

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

const createSupplier = async (body, res) => {
  try {
    const result = await prisma.supplier.create({
      data: body,
    })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const getSuppiler = async (id: string, res: NextApiResponse) => {
  try {
    const result = await prisma.supplier.findUnique({
      where: {
        id: id,
      },
    })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const updateSupplier = async (id, body, res) => {
  try {
    
    const result = await prisma.supplier.update({
      where: {
        id: id,
      },
      data: body,
    })
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
