"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="border-b border-brand/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-brand">
          okclistings1.com
        </Link>
        <nav className="space-x-6 text-sm">
          <Link href="/listings" className="hover:text-brand">
            Browse
          </Link>
          <Link href="/dashboard" className="hover:text-brand">
            Dashboard
          </Link>
          <Link
            href="/create"
            className="rounded-xl bg-brand px-3 py-2 text-black transition hover:bg-accent"
          >
            Post an Ad $10/mo
          </Link>
        </nav>
      </div>
    </header>
  );
}
