import prisma from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await createExpenseType(req.body, res)
      break
    case "GET":
      await getProductTypes(res)
      break
  }
}

const getProductTypes = async (res: NextApiResponse) => {
  try {
    const result = await prisma.productType.findMany()
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}
const createExpenseType = async (body, res: NextApiResponse) => {
  //TODO: change any to a proper state
  const { price } = body as any
  const result = await prisma.expense
    .create({
      data: {
        price: price,
        expense_type_id: "627273ba5102e3346e6059c7",
        safe_id: "627276461e2c2749877c1c6e",
      },
    })
    .catch((err) => console.log(err))
  res.status(200).json(result)
}
