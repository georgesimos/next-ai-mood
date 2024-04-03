import { qa } from "@/utils/ai"
import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { JournalEntry } from "@prisma/client"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  const { question } = await request.json()
  const user = await getUserFromClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries as JournalEntry[])
  return NextResponse.json({ data: answer })
}
