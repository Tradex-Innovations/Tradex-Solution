"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAssetPath } from "@/lib/utils";

export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function BrandHeader({
  enabled,
  toggle,
  play,
  active,
}: {
  enabled: boolean;
  toggle: () => void;
  play: () => void;
  active?: "solution" | "innovation";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("tx-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <header className="tx-header">
      <svg
        width="0"
        height="0"
        className="tx-logo-filter"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="tx-logo-dark-lettering" colorInterpolationFilters="sRGB">
            {/* Turn neutral white lettering black while retaining the red brand accents and transparency. */}
            <feColorMatrix
              type="matrix"
              values="1.15 -1.15 0 0 0  0.10 -0.10 0 0 0  0.16 -0.16 0 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
      <Link href="/" aria-label="Tradex home" className="tx-logo-link">
        <Image
          src={getAssetPath(
            "/Gemini_Generated_Image_v1z8tzv1z8tzv1z8-removebg-preview.png",
          )}
          alt="Tradex Solution"
          width={786}
          height={317}
          priority
          className="tx-header-logo"
        />
      </Link>
      <nav className="tx-desktop-nav" aria-label="Main navigation">
        <Link
          aria-current={active === "solution" ? "page" : undefined}
          href="/tradex-solution"
          onClick={() => play()}
        >
          Solution
        </Link>
        <Link
          aria-current={active === "innovation" ? "page" : undefined}
          href="/tradex-innovation"
          onClick={() => play()}
        >
          Custom software
        </Link>
        <a href="#about" onClick={() => play()}>
          Our approach
        </a>
      </nav>
      <div className="tx-header-actions">
        <button
          className="tx-sound"
          onClick={toggle}
          aria-pressed={enabled}
          aria-label={enabled ? "Turn sound off" : "Turn sound on"}
        >
          <span
            className={`tx-sound-bars ${enabled ? "is-on" : ""}`}
            aria-hidden="true"
          >
            {[1, 2, 3, 4].map((i) => (
              <i key={i} />
            ))}
          </span>
          <span>Sound {enabled ? "on" : "off"}</span>
        </button>
        <a href="#contact" className="tx-header-cta" onClick={() => play()}>
          Let’s talk <Arrow diagonal />
        </a>
        <button
          className="tx-menu-toggle"
          id="tx-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="tx-mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            setMenuOpen(!menuOpen);
            play();
          }}
        >
          {menuOpen ? "Close −" : "Menu +"}
        </button>
      </div>
      {menuOpen && (
        <nav
          className="tx-mobile-nav"
          id="tx-mobile-nav"
          aria-label="Mobile navigation"
          onClick={() => setMenuOpen(false)}
        >
          <Link
            aria-current={active === "solution" ? "page" : undefined}
            href="/tradex-solution"
          >
            Solution <Arrow />
          </Link>
          <Link
            aria-current={active === "innovation" ? "page" : undefined}
            href="/tradex-innovation"
          >
            Custom software <Arrow />
          </Link>
          <a href="#about">
            Our approach <Arrow />
          </a>
          <a href="#contact">
            Let’s talk <Arrow />
          </a>
        </nav>
      )}
    </header>
  );
}
export function BrandFooter() {
  return (
    <footer className="tx-footer">
      <div className="tx-footer-main">
        <div className="tx-footer-brand">
          <Link href="/" aria-label="Tradex home">
            <Image
              src={getAssetPath(
                "/Gemini_Generated_Image_v1z8tzv1z8tzv1z8-removebg-preview.png",
              )}
              alt="Tradex Solution"
              width={786}
              height={317}
              className="tx-footer-logo"
            />
          </Link>
          <p>Apparel technology. Custom software.</p>
        </div>

        <address className="tx-footer-details">
          <div>
            <span className="tx-footer-label">Address</span>
            <p>
              No 24, Baddegana Road,
              <br />
              Kotte, Sri Lanka
            </p>
          </div>
          <div>
            <span className="tx-footer-label">Contact</span>
            <a href="mailto:info@tradexsolution.com">info@tradexsolution.com</a>
            <a href="tel:+94778745847">+94 77 874 5847</a>
          </div>
          <div>
            <span className="tx-footer-label">Hours</span>
            <p>
              Monday – Friday: 8 AM to 5 PM
              <br />
              Saturday: 8 AM to 12 PM
            </p>
          </div>
        </address>

        <div className="tx-footer-socials" aria-label="Social media links">
          <span className="tx-footer-label">Follow</span>
          <span>LinkedIn ↗</span>
          <span>Instagram ↗</span>
          <span>Facebook ↗</span>
        </div>
      </div>

      <div className="tx-footer-bottom">
        <span>© {new Date().getFullYear()} Tradex. All rights reserved.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
