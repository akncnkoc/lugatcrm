import prisma from "../lib/prisma"

export async function getAllProductTypes() {
  return await prisma.productType.findMany()
}
