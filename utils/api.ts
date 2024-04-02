import type { JournalEntry } from "@prisma/client"

const createURL = (path: string) => window.location.origin + path

// export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const newEntry = async () => {
  const res = await fetch(
    new Request(createURL("/api/entry"), {
      method: "POST",
      body: JSON.stringify({ content: "new entry" }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Something went wrong on API server!")
  }
}

export const deleteEntry = async (id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: "DELETE",
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Something went wrong on API server!")
  }
}

export const updateEntry = async (
  id: string,
  updates: Partial<JournalEntry>
) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ updates }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Something went wrong on API server!")
  }
}

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: "POST",
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Something went wrong on API server!")
  }
}
