import { auth, clerkClient, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { prisma } from "@/utils/db"

const createNewUser = async () => {
  const user = await currentUser()
  console.log(user)
  if (!user) {
    return
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect("/journal")
}

export default async function NewUserPage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }

  const user = await clerkClient.users.getUser(userId)

  await createNewUser()

  return <div className="px-8 py-12 sm:py-16 md:px-20">Loading...</div>
}
