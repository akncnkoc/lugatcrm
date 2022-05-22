import { NextApiRequest, NextApiResponse } from "next"
import {
  createExpense, deleteExpenseData,
  getAllExpenses,
  getExpenseData,
  updateExpenseData,
} from "../../../server/expense.server"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, page, size },
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
        if (!size && !page){
          res.status(200).json(await getAllExpenses())
        }else{
          res.status(200).json(await getAllExpenses(size, page * size))
        }
      }
      break
    case "DELETE":
      res.status(200).json(await deleteExpenseData(id))
      break
  }
}
