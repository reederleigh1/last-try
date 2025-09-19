"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const year = useMemo(() => new Date().getFullYear(), []);

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="mt-16 border-t border-brand/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-10 text-sm text-muted">
        <p>c {year} okclistings1.com</p>
        <p>Local • Live • Listings</p>
      </div>
    </footer>
  );
}
