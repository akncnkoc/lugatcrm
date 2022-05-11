import prisma from "../lib/prisma"
import moment from "moment"

export async function getExpenseData(id) {
  return await prisma.expense.findUnique({
    where: {
      id: id,
    },
  })
}

export async function updateExpenseData(id, data) {
  return await prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      price: parseFloat(data.price),
      expense_type_id: data.expense_type,
      safe_id: data.safe,
      date: moment(data.date).toDate(),
    },
  })
}

export async function createExpense(data) {
  data.price = parseFloat(data.price)
  return await prisma.expense
    .create({
      data: data,
    })
    .catch((err) => console.log(err))
}

export async function getAllExpenses() {
  return await prisma.expense.findMany({
    select: {
      id: true,
      price: true,
      updated_at: true,
      safe: {
        select: {
          name: true,
        },
      },
      expense_type: {
        select: {
          name: true,
        },
      },
      date: true,
    },
  })
}
