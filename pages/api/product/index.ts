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
      await createProduct(req.body, res)
      break
    case "PUT":
      await updateSupplier(id, req.body, res)
      break
    case "GET":
      if (!id) {
        await getProducts(req, res)
      } else {
        await getSuppiler(id, res)
      }

      break
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      query: { page, size, all },
    } = req as any
    if (!page) page = 0
    if (!size) size = 5
    let result
    if (all) {
      result = await prisma.product.findMany({
        include: {
          buy_price_safe: true,
          sale_price_safe: true
        }
      })
    } else {
      result = await prisma.product.findMany({
        include: {
          buy_price_safe: true,
          sale_price_safe: true
        },
        skip: Number(page) * Number(size),
        take: Number(size),
      })
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(err);
    
    res.status(500).json(err)
  }
}

const createProduct = async (body, res) => {
  try {
    const result = await prisma.product.create({
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
