import EntryCard from "@/components/EntryCard"
import NewEntry from "@/components/NewEntry"
import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { analysis: true },
  })

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h1 className="text-4xl mb-12">Journals</h1>
      <div className="my-8">TODO: Questions</div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntry />
        {entries.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
