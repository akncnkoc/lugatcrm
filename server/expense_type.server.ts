import prisma from "../lib/prisma"

export async function getExpenseTypes() {
  return await prisma.expenseType.findMany({
    select: {
      name: true,
      id: true,
    },
  })
}
