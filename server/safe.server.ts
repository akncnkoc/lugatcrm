import prisma from "../lib/prisma"

export async function getSafes() {
  return await prisma.safe.findMany({
    select: {
      name: true,
      id: true,
    },
  })
}
