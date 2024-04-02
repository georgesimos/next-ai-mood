import { prisma } from "./db"
import { auth } from "@clerk/nextjs"

export const getUserFromClerkID = async (select = { id: true }) => {
  const { userId } = auth()
  if (!userId) {
    throw new Error("User not authenticated")
  }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
    select,
  })

  return user
}
