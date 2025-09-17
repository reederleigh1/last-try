# OKC Listings — Next.js + Supabase + Stripe

Flat pricing: **$10/month per listing**.

## 1) Setup

```bash
npm install
cp .env.local.example .env.local
# fill Supabase + Stripe keys
```

## 2) Supabase schema + seed

Run these SQL files in Supabase SQL Editor in order:

1. `supabase/00_schema.sql`
2. `supabase/01_policies.sql`
3. `supabase/02_seed.sql`

## 3) Dev

```bash
npm run dev
# http://localhost:3000
```

## 4) Stripe webhook

Create a webhook endpoint pointing to:
`https://okclistings1.com/api/stripe/webhook` (prod) or `http://localhost:3000/api/stripe/webhook` (dev via Stripe CLI).

## 5) Deploy on Vercel

```bash
vercel --prod
```

Add env vars in Vercel project:
- NEXT_PUBLIC_SITE_URL=https://okclistings1.com
- NEXT_PUBLIC_SUPABASE_URL=...
- NEXT_PUBLIC_SUPABASE_ANON_KEY=...
- SUPABASE_SERVICE_ROLE_KEY=...
- STRIPE_SECRET_KEY=...
- STRIPE_WEBHOOK_SECRET=...

## 6) Namecheap DNS

- A record: `@ -> 76.76.21.21`
- CNAME: `www -> cname.vercel-dns.com`

Add both domains in Vercel: `okclistings1.com` and `www.okclistings1.com`.

## GitHub (repo: 12176)

```bash
git init
git remote add origin https://github.com/<your-username>/12176.git
git add -A
git commit -m "Initial classifieds app"
git push -u origin main
```
