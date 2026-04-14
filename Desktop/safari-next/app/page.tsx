"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Colours ──────────────────────────────────────────────── */
const C = {
  terra: "#C4622D",
  midnight: "#0B1224",
  midnightL: "#121C38",
  gold: "#E8B86D",
  goldL: "#F5D8A8",
  cream: "#FDF6EC",
  emerald: "#1B5E4A",
} as const;

/* ─── Nav ───────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#discover", label: "Discover" },
    { href: "#sites", label: "Sites" },
    { href: "#tours", label: "Tours" },
    { href: "#culture", label: "Culture" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s ease",
        backgroundColor: scrolled ? `${C.midnight}F0` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.gold}30` : "1px solid transparent",
        padding: scrolled ? "0.75rem 2rem" : "1.25rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <div style={{ display: "flex", gap: "3px" }}>
            {[C.gold, C.terra, C.gold].map((c, i) => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: c }} />
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 600, letterSpacing: "0.25em", color: C.cream }}>
            SAFARI
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="hidden md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: C.cream,
                textDecoration: "none",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.8,
                transition: "opacity 0.2s, color 0.2s",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.color = C.gold; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "0.8"; (e.target as HTMLElement).style.color = C.cream; }}
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/signin"
            style={{
              padding: "0.5rem 1.5rem",
              border: `1px solid ${C.gold}`,
              color: C.gold,
              borderRadius: "0",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.25s ease",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = C.gold; (e.target as HTMLElement).style.color = C.midnight; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = "transparent"; (e.target as HTMLElement).style.color = C.gold; }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ height: 1, backgroundColor: C.gold, display: "block", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span style={{ height: 1, backgroundColor: C.gold, display: "block", opacity: mobileOpen ? 0 : 1, transition: "all 0.3s" }} />
            <span style={{ height: 1, backgroundColor: C.gold, display: "block", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ backgroundColor: `${C.midnight}F8`, backdropFilter: "blur(12px)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ color: C.cream, textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {l.label}
            </a>
          ))}
          <Link href="/signin" onClick={() => setMobileOpen(false)}
            style={{ color: C.gold, textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Book Now →
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function Hero() {
  const skyRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (skyRef.current) skyRef.current.style.transform = `translateY(${y * 0.08}px)`;
      if (midRef.current) midRef.current.style.transform = `translateY(${y * 0.18}px)`;
      if (nearRef.current) nearRef.current.style.transform = `translateY(${y * 0.30}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 680, overflow: "hidden", backgroundColor: C.midnight }}>
      {/* Sky layer */}
      <div ref={skyRef} style={{ position: "absolute", inset: "-10% 0 0 0", willChange: "transform" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, #1a2a4a 0%, ${C.midnight} 60%)`,
        }} />
        {/* Stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            borderRadius: "50%",
            backgroundColor: C.goldL,
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.1,
          }} />
        ))}
        {/* Horizon glow */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: `linear-gradient(to top, ${C.terra}40, transparent)`,
        }} />
      </div>

      {/* Mid layer — Baghdad silhouette */}
      <div ref={midRef} style={{ position: "absolute", bottom: "10%", left: 0, right: 0, willChange: "transform" }}>
        <svg viewBox="0 0 1440 240" preserveAspectRatio="none" style={{ width: "100%", height: 240 }}>
          {/* Minarets and domes silhouette */}
          <path d={`
            M0,240 L0,160 L60,160 L60,80 L65,80 L65,60 L67,40 L70,40 L70,60 L72,60 L72,80 L80,80 L80,160
            L120,160 L140,140 Q160,120 180,140 L200,160 L240,160 L240,100 L245,100 L245,70 L248,50 L250,30 L252,50 L255,70 L255,100 L260,100 L260,160
            L300,160 L340,160 L360,140 Q390,100 420,140 L440,160 L480,160
            L500,160 L500,90 L504,90 L504,55 L506,35 L508,15 L510,35 L512,55 L512,90 L516,90 L516,160
            L560,160 L600,160 L640,120 Q680,80 720,120 L760,160
            L800,160 L820,140 Q840,100 880,120 L900,160
            L940,160 L960,80 L963,80 L963,55 L966,35 L968,15 L970,35 L973,55 L973,80 L976,80 L976,160
            L1020,160 L1060,160 L1100,140 Q1130,100 1160,140 L1180,160
            L1220,160 L1240,100 L1243,100 L1243,70 L1246,50 L1248,30 L1250,50 L1253,70 L1253,100 L1260,100 L1260,160
            L1300,160 L1380,160 L1440,160 L1440,240 Z
          `}
            fill={`${C.midnightL}CC`}
          />
          {/* Foreground buildings darker */}
          <path d={`
            M0,240 L0,180 L80,180 L100,160 L140,180 L200,180
            L220,150 L240,150 L240,240
            L280,240 L280,170 L320,170 L320,240
            L400,240 L400,175 L420,155 L440,175 L460,240
            L520,240 L520,180 L580,180 L580,240
            L640,240 L640,170 L660,150 L680,170 L700,240
            L760,240 L760,180 L820,180 L840,160 L860,180 L900,240
            L960,240 L960,175 L1000,175 L1000,240
            L1060,240 L1060,185 L1080,165 L1100,185 L1140,240
            L1200,240 L1200,180 L1260,180 L1260,240
            L1320,240 L1320,175 L1380,175 L1440,175 L1440,240 Z
          `}
            fill={`${C.midnight}EE`}
          />
        </svg>
      </div>

      {/* Near layer — ground elements */}
      <div ref={nearRef} style={{ position: "absolute", bottom: 0, left: 0, right: 0, willChange: "transform" }}>
        <div style={{
          height: 80,
          background: `linear-gradient(to top, ${C.midnight}, transparent)`,
        }} />
      </div>

      {/* Arabic geometric overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,0 80,20 80,60 40,80 0,60 0,20" fill="none" stroke={C.gold} strokeWidth="0.5" />
              <polygon points="40,15 65,27.5 65,52.5 40,65 15,52.5 15,27.5" fill="none" stroke={C.gold} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo)" />
        </svg>
      </div>

      {/* Hero content */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "2rem",
      }}>
        <p style={{ fontFamily: "var(--font-arabic)", fontSize: "1.2rem", color: C.gold, marginBottom: "1rem", letterSpacing: "0.1em", opacity: 0.9, animation: "textReveal 1s 0.2s both" }}>
          بغداد · مهد الحضارة
        </p>
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(3.5rem, 10vw, 9rem)",
          fontWeight: 300,
          lineHeight: 0.9,
          letterSpacing: "0.05em",
          color: C.cream,
          marginBottom: "0.5rem",
          animation: "textReveal 1s 0.4s both",
        }}>
          BAGHDAD
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", margin: "1rem 0", animation: "textReveal 1s 0.6s both" }}>
          <div style={{ height: 1, width: 80, backgroundColor: C.gold, opacity: 0.6 }} />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold }}>
            The City of Peace
          </p>
          <div style={{ height: 1, width: 80, backgroundColor: C.gold, opacity: 0.6 }} />
        </div>
        <p style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
          fontWeight: 300,
          color: C.cream,
          opacity: 0.85,
          maxWidth: 560,
          lineHeight: 1.5,
          marginBottom: "2.5rem",
          animation: "textReveal 1s 0.8s both",
        }}>
          Where ancient Mesopotamia meets a living, breathing culture — curated exclusively for the discerning traveller.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", animation: "textReveal 1s 1s both" }}>
          <a href="#discover" style={{
            padding: "0.85rem 2.5rem",
            backgroundColor: C.terra,
            color: C.cream,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.gold)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.terra)}
          >
            Explore Baghdad
          </a>
          <a href="#tours" style={{
            padding: "0.85rem 2.5rem",
            border: `1px solid ${C.gold}80`,
            color: C.cream,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
            onMouseEnter={(e) => { (e.currentTarget.style.borderColor = C.gold); (e.currentTarget.style.color = C.gold); }}
            onMouseLeave={(e) => { (e.currentTarget.style.borderColor = `${C.gold}80`); (e.currentTarget.style.color = C.cream); }}
          >
            View Tours
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", animation: "textReveal 1s 1.4s both" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold, opacity: 0.6 }}>Scroll</p>
        <div style={{ width: 1, height: 48, backgroundColor: C.gold, opacity: 0.4, animation: "shimmer 2s linear infinite" }} />
      </div>
    </section>
  );
}

/* ─── Discover ──────────────────────────────────────────────── */
function Discover() {
  return (
    <section id="discover" style={{ backgroundColor: C.midnightL, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.gold }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
            01 — Discover
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1.05, color: C.cream, marginBottom: "1.5rem" }}>
              Five thousand years<br />
              <em style={{ color: C.gold, fontStyle: "italic" }}>of wonder</em>
            </h2>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", lineHeight: 1.8, color: `${C.cream}B0`, marginBottom: "2rem" }}>
              Baghdad — Madinat al-Salam, "City of Peace" — was founded in 762 CE by the Abbasid Caliph al-Mansur on the banks of the Tigris River. Within a century it had become the largest city on earth, a beacon of art, science, and culture during the Islamic Golden Age.
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", lineHeight: 1.8, color: `${C.cream}B0`, marginBottom: "2.5rem" }}>
              Today, Safari curates the only private luxury programme that opens the doors of ancient palaces, living souqs, and sacred shrines for the world's most discerning travellers.
            </p>
            <a href="#sites" style={{
              display: "inline-flex", alignItems: "center", gap: "0.75rem",
              color: C.gold, textDecoration: "none",
              fontFamily: "var(--font-sans)", fontSize: "0.65rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              borderBottom: `1px solid ${C.gold}50`,
              paddingBottom: "0.25rem",
              transition: "gap 0.3s ease",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "1.25rem")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "0.75rem")}
            >
              Explore Historical Sites →
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
              { num: "762", unit: "CE", label: "Founded by Caliph al-Mansur" },
              { num: "8", unit: "+", label: "UNESCO-listed heritage sites" },
              { num: "5,000", unit: "yr", label: "Continuous human settlement" },
              { num: "12", unit: "pkg", label: "Exclusive private tours" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "2rem",
                border: `1px solid ${C.gold}20`,
                backgroundColor: `${C.gold}05`,
                transition: "border-color 0.3s, background-color 0.3s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${C.gold}60`; (e.currentTarget as HTMLElement).style.backgroundColor = `${C.gold}0D`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${C.gold}20`; (e.currentTarget as HTMLElement).style.backgroundColor = `${C.gold}05`; }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: 300, color: C.gold }}>{s.num}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: C.terra }}>{s.unit}</span>
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: `${C.cream}70`, letterSpacing: "0.05em" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Geometric Divider ─────────────────────────────────────── */
function GeoDivider() {
  return (
    <div style={{ position: "relative", overflow: "hidden", height: 60, backgroundColor: C.midnight, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <pattern id="divPat" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="30,2 58,16 58,44 30,58 2,44 2,16" fill="none" stroke={C.gold} strokeWidth="0.5" opacity="0.3" />
            <circle cx="30" cy="30" r="3" fill={C.terra} opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#divPat)" />
        <line x1="0" y1="30" x2="1440" y2="30" stroke={C.gold} strokeWidth="0.5" opacity="0.2" />
      </svg>
      <div style={{ position: "relative", zIndex: 1, width: 40, height: 40, border: `1px solid ${C.gold}60`, transform: "rotate(45deg)", backgroundColor: `${C.midnight}80`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, backgroundColor: C.gold, transform: "rotate(45deg)" }} />
      </div>
    </div>
  );
}

/* ─── Timeline ──────────────────────────────────────────────── */
function Timeline() {
  const events = [
    { year: "3500 BCE", title: "Mesopotamian Civilisation", desc: "The Sumer and Akkad civilisations flourish between the Tigris and Euphrates rivers, inventing writing, law, and the wheel." },
    { year: "539 BCE", title: "Persian Conquest", desc: "Cyrus the Great conquers Babylon, now modern-day Iraq, integrating it into the Achaemenid Empire and preserving its cultural heritage." },
    { year: "762 CE", title: "Baghdad Founded", desc: "Caliph al-Mansur establishes Madinat al-Salam ('City of Peace') on the west bank of the Tigris as the Abbasid capital." },
    { year: "830 CE", title: "House of Wisdom", desc: "Bayt al-Hikmah becomes the world's greatest centre of learning — translating Greek, Persian, and Indian texts into Arabic, preserving classical knowledge." },
    { year: "1258 CE", title: "Mongol Invasion", desc: "Hulagu Khan sacks Baghdad, destroying the Grand Library. The city's population falls from one million to a fraction of that number." },
    { year: "1920 CE", title: "Modern Iraq", desc: "The Kingdom of Iraq is proclaimed. Baghdad re-emerges as a modern capital, blending its ancient identity with the ambitions of a new nation." },
  ];

  return (
    <section style={{ backgroundColor: C.midnight, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.gold }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
            02 — A Brief History
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.cream, marginBottom: "4rem" }}>
          Five millennia in six chapters
        </h2>

        {/* Timeline items */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "7.5rem", top: 0, bottom: 0, width: 1, backgroundColor: `${C.gold}30` }} className="hidden md:block" />

          {events.map((ev, i) => (
            <div key={i} style={{ display: "flex", gap: "3rem", marginBottom: "3.5rem", alignItems: "flex-start" }} className="flex-col md:flex-row">
              {/* Year */}
              <div style={{ minWidth: "7rem", textAlign: "right", paddingTop: "0.15rem" }} className="hidden md:block">
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: C.terra, letterSpacing: "0.1em" }}>{ev.year}</span>
              </div>
              {/* Dot */}
              <div style={{ position: "relative", flexShrink: 0, marginTop: "0.4rem" }} className="hidden md:block">
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: C.gold, border: `2px solid ${C.midnight}`, zIndex: 1, position: "relative" }} />
              </div>
              {/* Content */}
              <div>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", color: C.terra, letterSpacing: "0.1em", display: "block", marginBottom: "0.25rem" }} className="md:hidden">{ev.year}</span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 500, color: C.cream, marginBottom: "0.5rem" }}>{ev.title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", lineHeight: 1.7, color: `${C.cream}80` }}>{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sites ─────────────────────────────────────────────────── */
const SITES = [
  { imgClass: "site-img-1", name: "Iraq Museum", arabic: "المتحف العراقي", era: "Est. 1926", desc: "One of the world's great museums — over 170,000 artefacts spanning seven millennia of Mesopotamian civilisation, from Sumerian tablets to Assyrian ivories." },
  { imgClass: "site-img-2", name: "Al-Kadhimiya Mosque", arabic: "الكاظمية", era: "16th Century", desc: "A masterpiece of Islamic architecture crowned by four golden minarets and two gilded domes. One of the holiest Shia shrines, drawing millions of pilgrims annually." },
  { imgClass: "site-img-3", name: "Arch of Ctesiphon", arabic: "طاق كسرى", era: "3rd Century CE", desc: "The largest single-span brick vault ever constructed in antiquity — the sole surviving structure of the great Sassanid capital of Ctesiphon, 35 km south of Baghdad." },
  { imgClass: "site-img-4", name: "Al-Mustansiriya University", arabic: "المستنصرية", era: "1227 CE", desc: "Founded by Caliph al-Mustansir, this medieval madrasa was once the most advanced university in the world, teaching law, medicine, grammar, and mathematics." },
  { imgClass: "site-img-5", name: "Abbasid Palace", arabic: "القصر العباسي", era: "12th Century", desc: "The last standing monument of the original Round City. Its intricate brick muqarnas vaulting and geometric stucco screens represent the apogee of Abbasid craftsmanship." },
  { imgClass: "site-img-6", name: "Al-Mutanabbi Street", arabic: "شارع المتنبي", era: "Medieval", desc: "The intellectual soul of Baghdad. Named after the great 10th-century poet, this riverside boulevard is lined with bookshops and Friday book markets — a living tradition." },
  { imgClass: "site-img-7", name: "Al-Shaheed Monument", arabic: "نصب الشهيد", era: "1983", desc: "Ismail Fattah al-Turk's iconic split turquoise dome — one of the finest examples of contemporary Arab memorial architecture — commemorates fallen soldiers of the nation." },
  { imgClass: "site-img-8", name: "Ancient Babylon", arabic: "بابل", era: "1894–539 BCE", desc: "Ninety kilometres south of Baghdad lie the ruins of Babylon — home of Hammurabi, Nebuchadnezzar, and legendary antiquity. The Ishtar Gate's glazed blue bricks dazzle still." },
];

function Sites() {
  return (
    <section id="sites" style={{ backgroundColor: C.midnightL, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.gold }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
            03 — Heritage Sites
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.cream }}>
            Eight sites that define<br /><em style={{ color: C.gold, fontStyle: "italic" }}>a civilisation</em>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: `${C.cream}70`, maxWidth: 300, lineHeight: 1.7 }}>
            Each Safari itinerary grants private after-hours access to these monuments, accompanied by the region's foremost historians.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {SITES.map((site, i) => (
            <SiteCard key={i} site={site} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteCard({ site, index }: { site: typeof SITES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`gold-corners`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: index % 3 === 0 ? "4/5" : "4/4",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${C.midnight}80, 0 0 0 1px ${C.gold}30` : `0 8px 30px ${C.midnight}60`,
      }}
    >
      {/* Image placeholder */}
      <div className={site.imgClass} style={{ position: "absolute", inset: 0, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", transform: hovered ? "scale(1.08)" : "scale(1)" }} />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to top, ${C.midnight}F0 0%, ${C.midnight}80 40%, transparent 80%)`,
        transition: "opacity 0.4s ease",
      }} />

      {/* Content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem" }}>
        <p style={{ fontFamily: "var(--font-arabic)", fontSize: "0.85rem", color: C.gold, marginBottom: "0.25rem", opacity: 0.8 }}>{site.arabic}</p>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 500, color: C.cream, marginBottom: "0.25rem" }}>{site.name}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", color: C.terra, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{site.era}</p>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "0.8rem", lineHeight: 1.6, color: `${C.cream}90`,
          maxHeight: hovered ? "6rem" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}>{site.desc}</p>
      </div>
    </div>
  );
}

/* ─── Tours ─────────────────────────────────────────────────── */
const TOURS = [
  {
    name: "The Abbasid Grand Tour",
    days: "7 Days",
    price: "From $8,200",
    tag: "Most Popular",
    highlights: ["Iraq Museum private access", "Abbasid Palace moonlit dinner", "Al-Kadhimiya exclusive visit", "Expert historian guide"],
    desc: "The definitive journey through Baghdad's golden age. Private access, Michelin-calibre dining, and stays in the finest heritage properties.",
    color: C.terra,
  },
  {
    name: "Mesopotamian Origins",
    days: "10 Days",
    price: "From $13,500",
    tag: "Signature",
    highlights: ["Ancient Babylon site visit", "Ctesiphon dawn experience", "Al-Mustansiriya seminar", "Private archaeological briefing"],
    desc: "An immersive expedition tracing humanity's earliest civilisations — from Sumerian clay tablets to the grandeur of Babylon.",
    color: C.gold,
  },
  {
    name: "Cultural Immersion",
    days: "5 Days",
    price: "From $5,400",
    tag: "New",
    highlights: ["Al-Mutanabbi Street book hunt", "Traditional craft workshop", "Riverside culinary journey", "Sunset Tigris cruise"],
    desc: "A sensory deep-dive into Baghdad's living culture — its poets, craftspeople, markets, and the eternal rhythm of the Tigris.",
    color: C.emerald,
  },
];

function Tours() {
  return (
    <section id="tours" style={{ backgroundColor: C.midnight, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.gold }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
            04 — Tour Packages
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.cream, marginBottom: "4rem" }}>
          Three ways to experience<br /><em style={{ color: C.gold, fontStyle: "italic" }}>the extraordinary</em>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
          {TOURS.map((t, i) => (
            <TourCard key={i} tour={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TourCard({ tour }: { tour: typeof TOURS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? tour.color : `${C.gold}25`}`,
        backgroundColor: hovered ? `${tour.color}0D` : `${C.gold}05`,
        padding: "2.5rem",
        transition: "all 0.35s ease",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Tag */}
      <span style={{
        display: "inline-block",
        padding: "0.25rem 0.75rem",
        backgroundColor: tour.color,
        color: C.cream,
        fontFamily: "var(--font-sans)",
        fontSize: "0.55rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        marginBottom: "1.5rem",
      }}>{tour.tag}</span>

      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 400, color: C.cream, marginBottom: "0.5rem" }}>{tour.name}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: tour.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>{tour.days}</p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", lineHeight: 1.7, color: `${C.cream}80`, marginBottom: "1.75rem" }}>{tour.desc}</p>

      {/* Highlights */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {tour.highlights.map((h, j) => (
          <li key={j} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: tour.color, flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: `${C.cream}90` }}>{h}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", color: C.gold }}>{tour.price}</span>
        <Link href="/signin" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          color: tour.color, textDecoration: "none",
          fontFamily: "var(--font-sans)", fontSize: "0.65rem",
          letterSpacing: "0.15em", textTransform: "uppercase",
          transition: "gap 0.3s ease",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = "0.75rem")}
          onMouseLeave={(e) => (e.currentTarget.style.gap = "0.5rem")}
        >
          Enquire →
        </Link>
      </div>
    </div>
  );
}

/* ─── Pull Quote ────────────────────────────────────────────── */
function PullQuote() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.terra}15 0%, ${C.midnight} 40%, ${C.midnightL} 100%)`,
      padding: "8rem 2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Large decorative quotation mark */}
      <div style={{
        position: "absolute", top: "-2rem", left: "5%",
        fontFamily: "var(--font-heading)", fontSize: "20rem",
        color: C.gold, opacity: 0.04, lineHeight: 1,
        userSelect: "none",
      }}>"</div>

      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{ width: 40, height: 1, backgroundColor: C.gold, margin: "0 auto 3rem" }} />
        <blockquote style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.4,
          color: C.cream,
          marginBottom: "2.5rem",
        }}>
          "Baghdad is not a city you visit — it is a city you are changed by. To walk the banks of the Tigris at dawn is to feel the entire weight of human civilisation settle gently upon your shoulders."
        </blockquote>
        <div style={{ width: 40, height: 1, backgroundColor: C.gold, margin: "0 auto 1.5rem" }} />
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold }}>
          Sir Peter Frankopan — Historian &amp; Author
        </p>
      </div>
    </section>
  );
}

/* ─── Culture ───────────────────────────────────────────────── */
const CULTURE_ITEMS = [
  { icon: "◈", title: "Culinary Arts", desc: "From slow-cooked masgouf river carp on the banks of the Tigris to centuries-old samoon bread baked at dawn — Baghdad's cuisine is a sensory time machine." },
  { icon: "◈", title: "Living Poetry", desc: "Al-Mutanabbi's verse still reverberates through Baghdad's streets. Every Friday, poets and scholars gather at the book market named in his honour." },
  { icon: "◈", title: "Islamic Geometry", desc: "The intricate geometric patterns adorning Baghdad's mosques and madrasas encode mathematical principles rediscovered by Europe five centuries later." },
  { icon: "◈", title: "Artisan Crafts", desc: "Copper-beating, carpet-weaving, ceramic painting — Baghdad's artisan quarters carry living techniques unchanged since the Abbasid golden age." },
  { icon: "◈", title: "Music & Maqam", desc: "Iraqi maqam — recognised by UNESCO — is among the world's most sophisticated musical traditions, rooted in millennia of Mesopotamian sound." },
  { icon: "◈", title: "Hospitality", desc: "Iraqi qahwa (cardamom coffee) and the ancient tradition of gathering — the majlis — remain the beating heart of Baghdad social life." },
];

function Culture() {
  return (
    <section id="culture" style={{ backgroundColor: C.midnightL, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.gold }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
            05 — Living Culture
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.cream, marginBottom: "4rem" }}>
          Beyond monuments —<br /><em style={{ color: C.gold, fontStyle: "italic" }}>a living civilisation</em>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0" }}>
          {CULTURE_ITEMS.map((item, i) => (
            <CultureCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CultureCard({ item }: { item: typeof CULTURE_ITEMS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2.5rem",
        border: `1px solid ${C.gold}15`,
        backgroundColor: hovered ? `${C.terra}10` : "transparent",
        transition: "background-color 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{ width: 36, height: 36, border: `1px solid ${C.gold}50`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", color: C.gold, fontSize: "1rem", transform: "rotate(45deg)" }}>
        <span style={{ transform: "rotate(-45deg)" }}>◈</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 500, color: C.cream, marginBottom: "0.75rem" }}>{item.title}</h3>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", lineHeight: 1.7, color: `${C.cream}75` }}>{item.desc}</p>
    </div>
  );
}

/* ─── Testimonials ──────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: "Charlotte Pemberton", role: "Travel Correspondent, Condé Nast Traveller", body: "Safari's Baghdad programme is unlike anything else in luxury travel. The private dawn access to Ctesiphon — watching the arch turn from charcoal to amber in the first light — was a moment I will carry for the rest of my life." },
  { name: "Dr. Ramón Alcázar", role: "Archaeological Fellow, Harvard University", body: "As a professional archaeologist I was sceptical. Safari exceeded every expectation — the depth of historical briefings, the quality of local experts, and the sheer intelligence of the itinerary design is exceptional." },
  { name: "Amira Al-Hassan", role: "CEO, Gulf Heritage Foundation", body: "Baghdad deserves the world's finest tourism company, and Safari delivers precisely that. They tell the story of my region's history with reverence, accuracy, and magnificent production." },
];

function Testimonials() {
  return (
    <section style={{ backgroundColor: C.midnight, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.gold }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
            06 — Guest Voices
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.cream, marginBottom: "4rem" }}>
          What our guests say
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              padding: "2.5rem",
              border: `1px solid ${C.gold}20`,
              backgroundColor: `${C.gold}04`,
              position: "relative",
            }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "4rem", color: C.gold, opacity: 0.3, lineHeight: 0.8, marginBottom: "1rem" }}>"</div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", lineHeight: 1.7, color: `${C.cream}90`, marginBottom: "2rem", fontStyle: "italic" }}>{t.body}</p>
              <div style={{ borderTop: `1px solid ${C.gold}20`, paddingTop: "1.25rem" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, color: C.cream, marginBottom: "0.2rem" }}>{t.name}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: C.gold, opacity: 0.75 }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Travel Tips ───────────────────────────────────────────── */
const TIPS = [
  { title: "Best Time to Visit", tip: "October through April, when temperatures range from a pleasant 15–25°C. Avoid June–August when Baghdad can exceed 50°C." },
  { title: "Dress Code", tip: "Conservative dress is respectful and required at religious sites. Safari provides tailored local dress for all guests for authentic experiences." },
  { title: "Currency", tip: "Iraqi Dinar (IQD). Safari arranges pre-loaded safari cards and all payments at partner properties are handled seamlessly." },
  { title: "Photography", tip: "Always request permission before photographing people. Our guides navigate local customs to ensure you capture extraordinary images respectfully." },
  { title: "Health & Safety", tip: "Safari travels with dedicated security advisors and medical support. All itineraries are live-monitored 24/7 by our Baghdad operations centre." },
  { title: "Connectivity", tip: "Safari provides a private VSAT internet satellite device for each group — reliable connectivity anywhere in Iraq, including remote sites." },
];

function TravelTips() {
  return (
    <section style={{ backgroundColor: C.midnightL, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.gold }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
            07 — Travel Intelligence
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.cream, marginBottom: "4rem" }}>
          Essential knowledge<br /><em style={{ color: C.gold, fontStyle: "italic" }}>before you arrive</em>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {TIPS.map((tip, i) => (
            <div key={i} style={{ padding: "2rem", borderLeft: `2px solid ${C.terra}`, paddingLeft: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 500, color: C.gold, marginBottom: "0.75rem" }}>{tip.title}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", lineHeight: 1.7, color: `${C.cream}80` }}>{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact / Booking ─────────────────────────────────────── */
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", tour: "", dates: "", guests: "", message: "" });

  const inputStyle = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: `1px solid ${C.gold}40`,
    padding: "1.5rem 0 0.75rem",
    color: C.cream,
    fontFamily: "var(--font-sans)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  return (
    <section id="contact" style={{ backgroundColor: C.midnight, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ height: 1, width: 40, backgroundColor: C.gold }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold }}>
            08 — Private Enquiry
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }} className="grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.cream, marginBottom: "1.5rem" }}>
              Begin your<br /><em style={{ color: C.gold, fontStyle: "italic" }}>Baghdad journey</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", lineHeight: 1.8, color: `${C.cream}80`, marginBottom: "3rem" }}>
              Each Safari programme is entirely bespoke. Our Baghdad specialists — available seven days a week — will design an itinerary around your interests, dates, and group.
            </p>

            {[
              { label: "Private Line", val: "+44 20 7946 0000" },
              { label: "Enquiries", val: "baghdad@safaritravel.com" },
              { label: "Hours", val: "24 hours · 7 days" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, minWidth: 90 }}>{item.label}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: C.cream }}>{item.val}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {/* Name */}
            <div className="floating-label-group" style={{ position: "relative", marginBottom: "1rem" }}>
              <input
                type="text"
                id="name"
                placeholder=" "
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ ...inputStyle }}
                onFocus={(e) => (e.target.style.borderBottomColor = C.gold)}
                onBlur={(e) => (e.target.style.borderBottomColor = `${C.gold}40`)}
              />
              <label htmlFor="name" style={{ position: "absolute", top: "1rem", left: 0, fontSize: "0.8rem", color: `${C.gold}90`, transition: "all 0.2s ease", pointerEvents: "none" }}>
                Full Name
              </label>
            </div>

            {/* Email */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <input
                type="email"
                id="email"
                placeholder=" "
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ ...inputStyle }}
                onFocus={(e) => (e.target.style.borderBottomColor = C.gold)}
                onBlur={(e) => (e.target.style.borderBottomColor = `${C.gold}40`)}
              />
              <label htmlFor="email" style={{ position: "absolute", top: "1rem", left: 0, fontSize: "0.8rem", color: `${C.gold}90`, transition: "all 0.2s ease", pointerEvents: "none" }}>
                Email Address
              </label>
            </div>

            {/* Tour selection */}
            <div style={{ marginBottom: "1rem" }}>
              <select
                value={formData.tour}
                onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                style={{
                  ...inputStyle,
                  appearance: "none",
                  cursor: "pointer",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = C.gold)}
                onBlur={(e) => (e.target.style.borderBottomColor = `${C.gold}40`)}
              >
                <option value="" style={{ backgroundColor: C.midnight }}>Select Tour Package</option>
                <option value="abbasid" style={{ backgroundColor: C.midnight }}>The Abbasid Grand Tour — 7 Days</option>
                <option value="mesopotamian" style={{ backgroundColor: C.midnight }}>Mesopotamian Origins — 10 Days</option>
                <option value="cultural" style={{ backgroundColor: C.midnight }}>Cultural Immersion — 5 Days</option>
                <option value="bespoke" style={{ backgroundColor: C.midnight }}>Fully Bespoke</option>
              </select>
            </div>

            {/* Dates & Guests */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1rem" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Preferred Dates"
                  value={formData.dates}
                  onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                  style={{ ...inputStyle }}
                  onFocus={(e) => (e.target.style.borderBottomColor = C.gold)}
                  onBlur={(e) => (e.target.style.borderBottomColor = `${C.gold}40`)}
                />
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="No. of Guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  style={{ ...inputStyle }}
                  onFocus={(e) => (e.target.style.borderBottomColor = C.gold)}
                  onBlur={(e) => (e.target.style.borderBottomColor = `${C.gold}40`)}
                />
              </div>
            </div>

            {/* Message */}
            <div style={{ position: "relative", marginBottom: "2rem" }}>
              <textarea
                placeholder="Tell us about your ideal journey…"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderBottomColor = C.gold)}
                onBlur={(e) => (e.target.style.borderBottomColor = `${C.gold}40`)}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "1rem 2.5rem",
                backgroundColor: C.terra,
                color: C.cream,
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = C.gold)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = C.terra)}
            >
              Send Private Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      position: "relative",
      backgroundColor: "#060B17",
      padding: "6rem 2rem 2rem",
      overflow: "hidden",
    }}>
      {/* Background pattern */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="footerPat" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <polygon points="60,5 115,32.5 115,87.5 60,115 5,87.5 5,32.5" fill="none" stroke={C.gold} strokeWidth="1" />
              <polygon points="60,25 95,42.5 95,77.5 60,95 25,77.5 25,42.5" fill="none" stroke={C.gold} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerPat)" />
        </svg>
      </div>

      {/* Atmospheric glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "300px",
        background: `radial-gradient(ellipse at top, ${C.terra}15, transparent 70%)`,
      }} />

      <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto" }}>
        {/* Large SAFARI text */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "var(--font-arabic)", fontSize: "1rem", color: C.gold, marginBottom: "1rem", opacity: 0.7 }}>سفاري · بغداد</p>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(4rem, 12vw, 10rem)",
            fontWeight: 300,
            letterSpacing: "0.3em",
            color: `${C.cream}10`,
            lineHeight: 0.9,
          }}>SAFARI</h2>
        </div>

        {/* Footer grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem", borderTop: `1px solid ${C.gold}20`, paddingTop: "3rem" }} className="grid-cols-2 md:grid-cols-4">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "3px" }}>
                {[C.gold, C.terra, C.gold].map((c, i) => (
                  <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: c }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 600, letterSpacing: "0.25em", color: C.cream }}>SAFARI</span>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", lineHeight: 1.8, color: `${C.cream}60`, maxWidth: 260 }}>
              The world's most prestigious private travel company. Curating extraordinary journeys through history's greatest civilisations since 1987.
            </p>
          </div>

          {[
            { title: "Destinations", links: ["Baghdad", "Babylon", "Ctesiphon", "Mosul", "Basra"] },
            { title: "Company", links: ["About Safari", "Our Guides", "Press", "Careers", "Partnerships"] },
            { title: "Support", links: ["Contact Us", "FAQ", "Booking Terms", "Privacy Policy", "Cookie Policy"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.gold, marginBottom: "1.25rem" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: `${C.cream}60`, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.gold)}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = `${C.cream}60`)}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${C.gold}15`, paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: `${C.cream}40`, letterSpacing: "0.1em" }}>
            © 2026 Safari Travel. All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", color: `${C.cream}40`, letterSpacing: "0.05em" }}>
            Crafted with reverence for Baghdad and its people
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <GeoDivider />
      <Discover />
      <GeoDivider />
      <Timeline />
      <GeoDivider />
      <Sites />
      <GeoDivider />
      <Tours />
      <PullQuote />
      <Culture />
      <GeoDivider />
      <Testimonials />
      <TravelTips />
      <GeoDivider />
      <Contact />
      <Footer />
    </>
  );
}
