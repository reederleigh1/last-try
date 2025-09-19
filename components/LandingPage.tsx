/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import styles from "./LandingPage.module.css";

type ListingInput = {
  slug?: string | null;
  title?: string | null;
  price?: number | null;
  city?: string | null;
  thumbnail_url?: string | null;
};

type LandingListing = {
  key: string;
  title: string;
  subtitle: string;
  image: string;
};

const FALLBACK_LISTINGS: LandingListing[] = [
  { key: "washer-dryer", title: "Washer & Dryer set", subtitle: "$250 - Midtown", image: "/landing/placeholder.jpg" },
  { key: "thunder-tickets", title: "OKC Thunder tickets", subtitle: "$60 - Bricktown", image: "/landing/placeholder.jpg" },
  { key: "honda-civic", title: "Honda Civic 2012", subtitle: "$4,900 - Edmond", image: "/landing/placeholder.jpg" },
  { key: "iphone-13", title: "iPhone 13 Pro", subtitle: "$450 - Moore", image: "/landing/placeholder.jpg" }
];

const classNames = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const formatPrice = (value: number | null | undefined) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

interface LandingPageProps {
  listings: ListingInput[];
}

export default function LandingPage({ listings }: LandingPageProps) {
  const previewListings = useMemo(() => {
    if (!listings || listings.length === 0) {
      return FALLBACK_LISTINGS;
    }

    return listings.slice(0, 4).map((listing, index) => {
      const title = listing?.title?.trim() || "New listing";
      const price = formatPrice(listing?.price);
      const city = listing?.city?.trim();
      const subtitle = [price, city].filter(Boolean).join(" - ") || "Live on OKC Listings 1";
      return {
        key: listing?.slug || `listing-${index}`,
        title,
        subtitle,
        image: listing?.thumbnail_url || "/landing/placeholder.jpg"
      };
    });
  }, [listings]);

  useEffect(() => {
    const yearEl = document.getElementById("landing-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    const headline = document.getElementById("landing-headline");
    if (headline) {
      headline.style.opacity = "0";
      headline.style.transform = "translateY(12px)";
      requestAnimationFrame(() => {
        headline.style.transition = "opacity .5s ease, transform .5s ease";
        headline.style.opacity = "1";
        headline.style.transform = "translateY(0)";
      });
    }
  }, []);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const subject = name ? `Inquiry from ${name}` : "Inquiry from OKC Listings";
    const bodyParts = [message, "", `From: ${name || "Prospect"} <${email || "no-email-provided"}>`];

    window.location.href = `mailto:owner@okclistings1.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyParts.join("\n"))}`;

    form.reset();
  };

  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <div className={styles.wrap}>
          <div className={styles.brand}>
            <img src="/landing/logo.svg" alt="OKC LISTINGS 1 logo" className={styles.logo} />
            <span className={styles.brandText}>OKC LISTINGS 1</span>
          </div>
          <nav className={styles.nav}>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#contact" className={classNames(styles.btn, styles.btnOutline)}>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={classNames(styles.grid, styles.wrap)}>
          <div className={styles.heroCopy}>
            <h1 className={styles.headline} id="landing-headline">
              <span className={styles.headlineTop}>OKC Classifieds</span>
              <span className={styles.headlineMain}>
                Less Crowded. <span className={styles.accent}>$10/mo</span>. Local.
              </span>
            </h1>
            <p className={styles.subhead}>
              Post anything for a flat fee. Keep it local. Keep it simple. Free to browse.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/create" className={classNames(styles.btn, styles.btnPrimary, styles.pulse)}>
                Start Posting - $10/mo
              </Link>
              <Link href="#features" className={classNames(styles.btn, styles.btnGhost)}>
                See how it works
              </Link>
            </div>
            <div className={styles.trust}>
              <div className={styles.pill}>Locally operated</div>
              <div className={styles.pill}>Flat pricing</div>
              <div className={styles.pill}>No clutter</div>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={classNames(styles.card, styles.glass)}>
              <div className={styles.cardHead}>Live Listings Preview</div>
              <ul className={styles.listings}>
                {previewListings.map((item) => (
                  <li key={item.key}>
                    <img src={item.image} alt="" className={styles.listingImage} />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.subtitle}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.cardFoot}>
                <Link href="/listings" className={styles.link}>
                  Browse all &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(styles.heroBg, styles.orb)} aria-hidden="true" />
      </section>

      <section id="features" className={styles.section}>
        <div className={styles.wrap}>
          <h2>Simple by design</h2>
          <p className={styles.sectionLead}>Three things matter: post fast, find fast, pay once.</p>
          <div className={styles.featuresGrid}>
            <article className={styles.feat}>
              <div className={styles.featIcon}>LC</div>
              <h3>Less crowded</h3>
              <p>Local-only feed. No national spam. Results stay relevant to OKC.</p>
            </article>
            <article className={styles.feat}>
              <div className={styles.featIcon}>10</div>
              <h3>Flat $10/month</h3>
              <p>One price to post anything. No add-ons. Cancel anytime.</p>
            </article>
            <article className={styles.feat}>
              <div className={styles.featIcon}>FX</div>
              <h3>Fast UI</h3>
              <p>Modern, lightweight, and mobile-first. Built for speed.</p>
            </article>
            <article className={styles.feat}>
              <div className={styles.featIcon}>SP</div>
              <h3>Spam controls</h3>
              <p>Human verification and moderation tools keep listings clean.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing" className={classNames(styles.section, styles.pricing)}>
        <div className={styles.wrap}>
          <h2>Pricing</h2>
          <div className={classNames(styles.pricingCard, styles.glass)}>
            <div className={styles.priceRow}>
              <div>
                <div className={styles.plan}>Flat plan</div>
                <div className={styles.price}>
                  <span className={styles.currency}>$</span>
                  10
                  <span className={styles.per}>/month</span>
                </div>
                <div className={styles.planSub}>Post anything. Free to browse.</div>
              </div>
              <Link href="/create" className={classNames(styles.btn, styles.btnPrimary)}>
                Get started
              </Link>
            </div>
            <ul className={styles.ticks}>
              <li>Unlimited active listings</li>
              <li>10 photos per listing</li>
              <li>Featured placement upgrades available later</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className={classNames(styles.section, styles.contact)}>
        <div className={styles.wrap}>
          <h2>Contact</h2>
          <p className={styles.sectionLead}>Questions or partnership ideas in OKC? Send a message.</p>
          <form className={styles.contactForm} method="post" data-action="local" onSubmit={handleContactSubmit}>
            <div className={styles.row}>
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Your email" required />
            </div>
            <textarea name="message" rows={5} placeholder="Your message" />
            <button className={classNames(styles.btn, styles.btnPrimary)} type="submit">
              Send
            </button>
            <p className={styles.formNote}>
              This demo sends to <span>owner@okclistings1.com</span>. Update in <code>LandingPage.tsx</code>.
            </p>
          </form>
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <div className={classNames(styles.wrap, styles.footerGrid)}>
          <div className={classNames(styles.brand, styles.brandTiny)}>
            <img src="/landing/logo.svg" alt="OKC LISTINGS 1 logo" className={classNames(styles.logo, styles.logoTiny)} />
            <span>OKC LISTINGS 1</span>
          </div>
          <div className={styles.footLinks}>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <a href="mailto:owner@okclistings1.com">Email</a>
          </div>
          <div className={styles.footCopy}>
            c <span id="landing-year" /> OKC LISTINGS 1. Locally operated.
          </div>
        </div>
      </footer>
    </div>
  );
}
