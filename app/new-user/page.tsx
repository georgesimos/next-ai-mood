import { auth, clerkClient } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function NewUser() {
  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }

  const user = await clerkClient.users.getUser(userId)

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      {user && (
        <>
          <h1 className="text-3xl font-semibold text-black">
            👋 Hi, {user.firstName || `Stranger`}
          </h1>
          <h2 className="mt-16 mb-4 text-3xl font-semibold text-black">
            What&apos;s next?
          </h2>
          Read the{" "}
          <Link
            className="font-medium text-primary-600 hover:underline"
            href="https://clerk.com/docs?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
            target="_blank"
          >
            Clerk Docs -&gt;
          </Link>
        </>
      )}
    </div>
  )
}
