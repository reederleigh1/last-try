"use client";

import { useEffect } from "react";
import Link from "next/link";

const categories = [
  {
    name: "Vehicles",
    description: "Cars, trucks, motorcycles, boats, and more from trusted sellers.",
    count: "2,345 listings",
    href: "/listings?category=vehicles",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="5" y="18" width="38" height="14" rx="4" ry="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="16" cy="36" r="4" fill="currentColor" />
        <circle cx="32" cy="36" r="4" fill="currentColor" />
        <path d="M10 18l6-8h16l6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  },
  {
    name: "Real Estate",
    description: "Apartments, single-family homes, and land across the metro.",
    count: "1,892 listings",
    href: "/listings?category=real-estate",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 22l16-12 16 12v18H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M20 40V28h8v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M14 22h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "Jobs",
    description: "Full-time, part-time, and gig work opportunities.",
    count: "3,567 listings",
    href: "/listings?category=jobs",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="10" y="14" width="28" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M16 14V10h16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M10 26l14 6 14-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  },
  {
    name: "Electronics",
    description: "Phones, laptops, gaming gear, and smart home tech.",
    count: "987 listings",
    href: "/listings?category=electronics",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="8" y="12" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M20 34h8l-2 6h-4l-2-6z" fill="currentColor" />
        <rect x="16" y="16" width="16" height="10" rx="1" fill="currentColor" opacity="0.12" />
      </svg>
    )
  },
  {
    name: "Furniture",
    description: "Living room, bedroom, office sets, and vintage finds.",
    count: "654 listings",
    href: "/listings?category=furniture",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="8" y="20" width="32" height="12" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 20v-3a6 6 0 016-6h12a6 6 0 016 6v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M12 32v4m24-4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "Services",
    description: "Home repair, tutoring, events, and professional services.",
    count: "1,234 listings",
    href: "/listings?category=services",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 16l8 4 8-8 8 8 8-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M16 20l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M12 36l8-8 4 4 4-4 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  }
];

const featuredListings = [
  {
    title: "2019 Honda Civic LX",
    price: "$18,500",
    location: "Edmond, OK",
    posted: "2 hours ago",
    category: "Vehicles",
    badge: "Featured",
    href: "/listings/2019-honda-civic-lx",
    description: "Clean title, 36k miles, excellent condition with full service history.",
    highlights: ["One owner", "Apple CarPlay", "New tires"]
  },
  {
    title: "Bricktown Loft Apartment",
    price: "$1,200/mo",
    location: "Oklahoma City, OK",
    posted: "5 hours ago",
    category: "Real Estate",
    badge: "Hot Deal",
    href: "/listings/bricktown-loft-apartment",
    description: "Modern one-bedroom with skyline views, parking included, pets welcome.",
    highlights: ["Downtown views", "Washer & dryer", "Walkable area"]
  },
  {
    title: "MacBook Pro 14\" M3",
    price: "$1,850",
    location: "Norman, OK",
    posted: "1 day ago",
    category: "Electronics",
    badge: "New Arrival",
    href: "/listings/macbook-pro-14-m3",
    description: "Latest model with 24GB unified memory and 1TB SSD. Original packaging.",
    highlights: ["Factory warranty", "Lightly used", "Local pickup"]
  }
];

const highlights = [
  {
    title: "Verified community",
    description: "Every listing is screened and sellers can earn badges as they build a trusted reputation.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6l16 6v10c0 10.5-7 19-16 22-9-3-16-11.5-16-22V12l16-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M18 24l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  },
  {
    title: "Smart matching",
    description: "Save searches, set alerts, and let our matching engine surface the best new deals first.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M24 24l10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="34" cy="14" r="3" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Local support",
    description: "Our OKC-based concierge team can help schedule meetups, verify paperwork, and answer questions.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 32v-6a12 12 0 0124 0v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="8" y="26" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="32" y="26" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M24 32v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 40h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Create your listing",
    description: "Add photos, pricing, and location in minutes. Choose free or boosted placement to reach more buyers."
  },
  {
    step: "02",
    title: "Connect instantly",
    description: "Chat in real time, receive smart match alerts, and schedule meetups with calendar reminders."
  },
  {
    step: "03",
    title: "Close with confidence",
    description: "Use secure payments, digital receipts, and post-sale reviews to protect every transaction."
  }
];

const testimonials = [
  {
    name: "Maya Thompson",
    role: "OKC small business owner",
    quote: "We sold out of our weekend pop-up inventory within hours thanks to the featured boosts."
  },
  {
    name: "Alex Martinez",
    role: "Yukon homeowner",
    quote: "Found reliable contractors and sold our spare furniture without ever leaving the neighborhood."
  },
  {
    name: "Jordan Lee",
    role: "Recent college grad",
    quote: "Landed a remote marketing role after setting job alerts. The built-in messaging kept everything organized."
  }
];

const heroMetrics = [
  { label: "Listings added today", value: "126" },
  { label: "Average match time", value: "18 hrs" },
  { label: "Verified sellers", value: "3,200+" }
];

const statCards = [
  { label: "Active Listings", display: "50K+", target: 50000, suffix: "+" },
  { label: "Registered Members", display: "125K+", target: 125000, suffix: "+" },
  { label: "Monthly Visitors", display: "15K+", target: 15000, suffix: "+" },
  { label: "Listing Success Rate", display: "98%", target: 98, suffix: "%" }
];

export default function LandingContent() {
  useEffect(() => {
    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );

    const handleAnchorClick = (event: Event) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".category-card, .listing-card, .highlight-card, .how-card, .testimonial-card"
      )
    );

    animatedElements.forEach((element) => {
      element.classList.add("animate-on-scroll");
      intersectionObserver.observe(element);
    });

    const hoverElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".category-card, .listing-card, .highlight-card"
      )
    );

    const handleMouseEnter: EventListener = (event) => {
      const target = event.currentTarget as HTMLElement | null;
      if (target) {
        target.style.transform = "translateY(-10px) scale(1.02)";
        target.style.boxShadow = "0 24px 40px rgba(15, 23, 42, 0.14)";
      }
    };

    const handleMouseLeave: EventListener = (event) => {
      const target = event.currentTarget as HTMLElement | null;
      if (target) {
        target.style.transform = "translateY(0) scale(1)";
        target.style.boxShadow = "";
      }
    };

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    const timers: number[] = [];

    const animateCounter = (element: HTMLElement) => {
      const targetValue = Number(element.dataset.target ?? 0);
      if (!targetValue) {
        return;
      }

      const suffix = element.dataset.suffix ?? "";
      const prefix = element.dataset.prefix ?? "";
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = window.setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          window.clearInterval(timer);
        }

        const precise = suffix === "%" ? Math.round(current) : Math.floor(current);
        const formatted = suffix === "%" ? precise.toString() : precise.toLocaleString();

        element.textContent = `${prefix}${formatted}${suffix}`;
      }, 30);

      timers.push(timer);
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statNumbers = Array.from(
              entry.target.querySelectorAll<HTMLElement>(".stat-number")
            );
            statNumbers.forEach((stat) => animateCounter(stat));
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector<HTMLElement>(".stats");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    const searchButton = document.querySelector<HTMLButtonElement>(".search-btn");
    const handleSearchClick = () => {
      const searchInput =
        document.querySelector<HTMLInputElement>(".search-input")?.value.trim() ?? "";
      const category =
        document.querySelector<HTMLSelectElement>(".search-select")?.value ?? "All Categories";
      if (searchInput.length > 0) {
        window.alert(`Searching for "${searchInput}" in ${category}...`);
      }
    };

    if (searchButton) {
      searchButton.addEventListener("click", handleSearchClick);
    }

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
      animatedElements.forEach((element) => intersectionObserver.unobserve(element));
      hoverElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
        element.style.transform = "";
        element.style.boxShadow = "";
      });
      intersectionObserver.disconnect();
      if (statsSection) {
        statsObserver.unobserve(statsSection);
      }
      statsObserver.disconnect();
      if (searchButton) {
        searchButton.removeEventListener("click", handleSearchClick);
      }
      timers.forEach((timer) => window.clearInterval(timer));
    };
  }, []);

  return (
    <>
      <header>
        <nav>
          <Link href="/" className="logo">
            OKC<span>Listings1</span>
          </Link>
          <div className="nav-links">
            <a href="#categories">Browse</a>
            <a href="#featured">Featured</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <Link href="/create" className="btn-post">
              + Post Ad
            </Link>
          </div>
        </nav>
      </header>
      <main className="landing-main">
        <section className="hero" id="top">
          <div className="hero-inner">
            <div className="hero-content">
              <span className="hero-pill">Oklahoma City&amp;apos;s trusted marketplace</span>
              <h1>Discover local deals, faster matches, and safer transactions.</h1>
              <p className="hero-subtitle">
                OKCListings1 connects buyers and sellers across the metro with verified profiles, built-in messaging, and secure payments backed by Stripe.
              </p>
              <div className="hero-actions">
                <Link href="/create" className="btn-primary">
                  Post Your Listing
                </Link>
                <a href="#featured" className="btn-secondary">
                  Browse Featured Deals
                </a>
              </div>
              <div className="hero-metrics">
                {heroMetrics.map((metric) => (
                  <div className="hero-metric" key={metric.label}>
                    <span className="metric-value">{metric.value}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-showcase">
              <div className="hero-card">
                <h3>Built for busy Oklahomans</h3>
                <p>We screen every paid listing, highlight top matches, and promote local sellers first.</p>
                <ul>
                  <li>Instant chat with verified profiles</li>
                  <li>Secure payments with Stripe escrow</li>
                  <li>AI-powered alerts for new matches</li>
                </ul>
              </div>
              <div className="hero-badge">
                <span className="badge-label">Since 2024</span>
                <strong>Local &amp; Secure</strong>
                <p>Serving the entire Oklahoma City metro area.</p>
              </div>
            </div>
          </div>
          <div className="search-panel">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="What are you looking for today?"
                aria-label="Search listings"
              />
              <select className="search-select" aria-label="Select a category">
                <option>All Categories</option>
                <option>Vehicles</option>
                <option>Real Estate</option>
                <option>Jobs</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Services</option>
              </select>
              <button className="search-btn" type="button">
                Search
              </button>
            </div>
            <div className="search-hints">
              Popular: <button type="button">Trucks</button>
              <button type="button">Apartments</button>
              <button type="button">Remote jobs</button>
              <button type="button">Yard sales</button>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stats-container">
            {statCards.map((stat) => (
              <div className="stat-item" key={stat.label}>
                <div
                  className="stat-number"
                  data-target={stat.target}
                  data-suffix={stat.suffix}
                >
                  {stat.display}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="categories" id="categories">
          <div className="section-header">
            <h2 className="section-title">Popular categories</h2>
            <p>Browse thousands of listings added by neighbors across the metro every week.</p>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.name}>
                <div className="category-icon">{category.icon}</div>
                <div className="category-body">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <div className="category-footer">
                  <span className="category-count">{category.count}</span>
                  <Link href={category.href}>Browse</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="featured" id="featured">
          <div className="section-header">
            <h2 className="section-title">Featured listings</h2>
            <p>Hand-picked offers with price drops, premium visibility, and verified sellers.</p>
          </div>
          <div className="listings-grid">
            {featuredListings.map((listing) => (
              <article className="listing-card" key={listing.title}>
                <div className="listing-image" aria-hidden="true">
                  <span className="listing-badge">{listing.badge}</span>
                  <span className="listing-category">{listing.category}</span>
                </div>
                <div className="listing-content">
                  <h3 className="listing-title">{listing.title}</h3>
                  <p className="listing-description">{listing.description}</p>
                  <div className="listing-price">{listing.price}</div>
                  <div className="listing-meta">
                    <span>{listing.location}</span>
                    <span>{listing.posted}</span>
                  </div>
                  <ul className="listing-highlights">
                    {listing.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <Link href={listing.href} className="listing-link">
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="highlights" id="about">
          <div className="section-header">
            <h2 className="section-title">Why OKCListings1?</h2>
            <p>Everything you need to buy or sell with confidence, all in one modern experience.</p>
          </div>
          <div className="highlight-grid">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.title}>
                <div className="highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="how-it-works">
          <div className="section-header">
            <h2 className="section-title">How it works</h2>
            <p>List in minutes, connect instantly, and close with peace of mind.</p>
          </div>
          <div className="how-grid">
            {howItWorks.map((step) => (
              <article className="how-card" key={step.title}>
                <span className="how-step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials">
          <div className="section-header">
            <h2 className="section-title">Loved by the OKC community</h2>
            <p>Real stories from neighbors who found their perfect match on OKCListings1.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <p className="testimonial-quote">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta" id="contact">
          <h2>Ready to start buying or selling?</h2>
          <p>Join over 125,000 locals using OKCListings1 every month.</p>
          <div className="cta-buttons">
            <Link href="/create" className="btn-primary">
              Post Your First Ad Free
            </Link>
            <a href="#categories" className="btn-secondary">
              Browse Categories
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>About OKCListings1</h3>
            <p>
              Your trusted classifieds marketplace built in Oklahoma City. We combine local expertise with modern tools to help you buy and sell faster.
            </p>
          </div>
          <div className="footer-section">
            <h3>Quick links</h3>
            <Link href="/login">Sign in</Link>
            <Link href="/create">Create a listing</Link>
            <Link href="/dashboard">Seller dashboard</Link>
            <a href="#featured">Featured listings</a>
          </div>
          <div className="footer-section">
            <h3>Get help</h3>
            <a href="mailto:support@okclistings1.com">support@okclistings1.com</a>
            <a href="tel:14055550123">(405) 555-0123</a>
            <a href="#contact">Contact support</a>
            <Link href="/terms">Terms &amp; policies</Link>
          </div>
          <div className="footer-section">
            <h3>Stay connected</h3>
            <p>Follow market trends, safety tips, and weekly highlights straight to your inbox.</p>
            <button type="button" className="footer-button">
              Subscribe to newsletter
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} OKCListings1.com — All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

