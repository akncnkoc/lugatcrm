import prisma from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import {
  createExpense,
  updateExpenseData,
} from "../../../server/expense.server"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      res.status(200).json(await createExpense(req.body))
      break
    case "PUT":
      const id = req.body.id
      res.status(200).json(await updateExpenseData(id, req.body))
      break
    case "GET":
      res.send("hello")
      break
  }

  //TODO: change any to a proper state
}
