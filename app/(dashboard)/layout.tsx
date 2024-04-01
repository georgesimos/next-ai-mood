import { UserButton, auth, clerkClient } from "@clerk/nextjs"
import Link from "next/link"
import { redirect } from "next/navigation"

const links = [
  { name: "Journals", href: "/journal" },
  { name: "History", href: "/history" },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }

  const user = await clerkClient.users.getUser(userId)
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">MOOD</span>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
        <header className="h-[60px] border-b border-black/10">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)]">
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
          {children}
        </div>
      </div>
    </div>
  )
}
