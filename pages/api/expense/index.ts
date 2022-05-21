import prisma from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import {
  createExpense,
  getAllExpenses,
  getExpenseData,
  updateExpenseData,
} from "../../../server/expense.server"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req as any
  switch (req.method) {
    case "POST":
      res.status(200).json(await createExpense(req.body))
      break
    case "PUT":
      res.status(200).json(await updateExpenseData(id, req.body))
      break
    case "GET":
      if (id) {
        res.status(200).json(await getExpenseData(id))
      } else {
        res.status(200).json(await getAllExpenses())
      }
      break
  }

  //TODO: change any to a proper state
}
