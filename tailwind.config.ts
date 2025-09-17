import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        brand: "var(--brand)",
        accent: "var(--accent)",
        card: "var(--card)",
        muted: "var(--muted)"
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" }
    },
  },
  plugins: [],
} satisfies Config;
