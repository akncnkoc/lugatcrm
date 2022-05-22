import prisma from "../lib/prisma"
import { decrementSafe, incrementSafe } from "./safe.server"

export async function getAllExpenses(take = 5, skip = 0) {
  return [
    await prisma.expense.findMany({
      skip: Number(skip),
      take: Number(take),
      include: {
        safe: {
          include: {
            currency: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
        expense_type: true,
      },
    }),
    await prisma.expense.count(),
  ]
}

export async function getExpenseData(id) {
  return await prisma.expense.findUnique({
    where: {
      id: id,
    },
    include: {
      safe: {
        include: {
          currency: true,
        },
      },
      expense_type: true,
    },
  })
}

export async function createExpense(data) {
  try {
    data.price = parseFloat(data.price)
    data.date = new Date(data.date)
    await prisma.$transaction(async (prisma) => {
      let expense = await prisma.expense.create({
        data: data,
      })
      await decrementSafe(expense.safe_id, expense.price)
      return expense
    })
  } catch (err) {
    throw new Error("Not created + ", err)
  }
}

export async function updateExpenseData(id, data) {
  try {
    await prisma.$transaction(async (prisma) => {
      let expense = await prisma.expense.findUnique({
        where: {
          id: id,
        },
      })
      await incrementSafe(expense.safe_id, expense.price)
      let updatedExpense = await prisma.expense.update({
        where: {
          id: id,
        },
        data: {
          price: parseFloat(data.price),
          expense_type_id: data.expense_type_id,
          safe_id: data.safe_id,
          date: new Date(data.date).toISOString(),
        },
      })
      await decrementSafe(updatedExpense.safe_id, updatedExpense.price)
    })
  } catch (err) {}
}

export async function deleteExpenseData(id) {
  try {
    await prisma.$transaction(async (prisma) => {
      let expense = await prisma.expense.delete({
        where: {
          id: id,
        },
        select: {
          safe_id: true,
          price: true,
        },
      })
      await incrementSafe(expense.safe_id, expense.price)
      return expense
    })
  } catch (err) {
    console.log(err)
  }
}
