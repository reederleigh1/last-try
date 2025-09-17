import Link from "next/link";

export default function NavBar(){
  return (
    <header className="border-b border-brand/50">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-brand">okclistings1.com</Link>
        <nav className="space-x-6 text-sm">
          <Link href="/listings" className="hover:text-brand">Browse</Link>
          <Link href="/dashboard" className="hover:text-brand">Dashboard</Link>
          <Link href="/create" className="px-3 py-2 rounded-xl bg-brand text-black hover:bg-accent transition">Post an Ad $10/mo</Link>
        </nav>
      </div>
    </header>
  );
}
