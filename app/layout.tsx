import "./styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OKC Listings | Local Live Listings",
  description: "OKC local classifieds. Post any ad for $10/month.",
  openGraph: { title: "OKC Listings", description: "Local Live Listings", type: "website" },
  metadataBase: new URL("https://okclistings1.com")
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-fg">
        <NavBar/>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
