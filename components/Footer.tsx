export default function Footer(){
  return (
    <footer className="mt-16 border-t border-brand/40">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted flex items-center justify-between">
        <p>© {new Date().getFullYear()} okclistings1.com</p>
        <p>Local · Live · Listings</p>
      </div>
    </footer>
  );
}


