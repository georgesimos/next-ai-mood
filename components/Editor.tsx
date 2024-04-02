"use client"
import { updateEntry, deleteEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"
import Spinner from "./Spinner"
import { useRouter } from "next/navigation"
import { EntryAnalysis, JournalEntry } from "@prisma/client"
export type JournalEntryWithAnalysis = JournalEntry & {
  analysis: EntryAnalysis
}

const Editor = ({ entry }: { entry: JournalEntryWithAnalysis }) => {
  const [text, setText] = useState(entry.content)
  const [currentEntry, setEntry] = useState(entry)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    await deleteEntry(entry.id)
    router.push("/journal")
  }
  useAutosave({
    data: text,
    onSave: async (_text) => {
      if (_text === entry.content) return
      setIsSaving(true)

      const { data } = await updateEntry(entry.id, { content: _text })

      setEntry(data)
      setIsSaving(false)
    },
  })

  const analysisData = [
    {
      name: "Subject",
      value: currentEntry.analysis.subject,
    },
    { name: "Mood", value: currentEntry.analysis.mood },
    {
      name: "Negative",
      value: currentEntry.analysis.negative ? "True" : "False",
    },
  ]

  return (
    <div className="w-full h-full grid grid-cols-3 gap-4 relative px-4">
      <div className="absolute left-4 top-0 p-2">
        {isSaving ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full text-xl p-8"
        />
      </div>
      <div className="border-l border-black/5">
        <div
          style={{ background: currentEntry.analysis.color }}
          className="h-[100px] bg-blue-600 text-white p-8"
        >
          <h2 className="text-2xl bg-white/25 text-black">Analysis</h2>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="py-4 px-8 flex items-center justify-between"
              >
                <div className="text-xl font-semibold w-1/3">{item.name}</div>
                <div className="text-xl">{item.value}</div>
              </li>
            ))}
            <li className="py-4 px-8 flex items-center justify-between">
              <button
                onClick={handleDelete}
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
