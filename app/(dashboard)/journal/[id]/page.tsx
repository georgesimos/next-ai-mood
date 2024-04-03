import Editor, { JournalEntryWithAnalysis } from "@/components/Editor"
import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id: string) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

export default async function JournalEditorPage({
  params,
}: {
  params: { id: string }
}) {
  const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      <Editor entry={entry as JournalEntryWithAnalysis} />
    </div>
  )
}
