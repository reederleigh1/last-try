import "./styles/globals.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OKC Listings | Local Live Listings",
  description: "OKC local classifieds. Post any ad for $10/month.",
  openGraph: { title: "OKC Listings", description: "Local Live Listings", type: "website" },
  metadataBase: new URL("https://okclistings1.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex min-h-screen flex-col bg-bg text-fg`}>
        <NavBar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
