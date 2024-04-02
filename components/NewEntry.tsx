"use client"

import { newEntry } from "@/utils/api"
// import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"

export default function NewEntry() {
  const router = useRouter()

  const handleOnClick = async () => {
    const { data } = await newEntry()
    // router.push(`/journal/${data.id}`)
    // revalidatePath("/journal")
  }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}
