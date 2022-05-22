import prisma from "../lib/prisma"

export async function getSafes() {
  return await prisma.safe.findMany({
    select: {
      name: true,
      id: true,
    },
  })
}

export async function incrementSafe(safe_id, total) {
  let safe = await prisma.safe.findUnique({
    where: { id: safe_id },
    select: { total: true },
  })

  await prisma.safe.update({
    where: {
      id: safe_id,
    },
    data: {
      total: (safe.total) + total,
    },
  })
}

export async function decrementSafe(safe_id, total) {
  let safe = await prisma.safe.findUnique({
    where: { id: safe_id },
    select: { total: true },
  })

  await prisma.safe.update({
    where: {
      id: safe_id,
    },
    data: {
      total: (safe.total) - total,
    },
  })
}
