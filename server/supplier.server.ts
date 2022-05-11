import prisma from "../lib/prisma"

export async function getAllSuppliers() {
  return await prisma.supplier.findMany()
}
