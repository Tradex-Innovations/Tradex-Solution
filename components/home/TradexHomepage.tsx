"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePerformanceMode } from "@/lib/usePerformanceMode";
import { getAssetPath } from "@/lib/utils";
import { useInterfaceSound } from "./useInterfaceSound";
import MaterialFallback from "./MaterialFallback";
import garmentLineImage from "@/assets/images/optimized/garmentline-card.jpg";
import machineServiceImage from "@/assets/images/optimized/machine-service-system-card.jpg";
import {
  Arrow,
  BrandHeader,
  BrandFooter,
} from "@/components/brand/BrandChrome";
import "./homepage.css";

const MaterialSculpture = dynamic(() => import("./MaterialSculpture"), {
  ssr: false,
  loading: () => <MaterialFallback />,
});

const stages = [
  {
    name: "Material",
    title: "Every possibility starts with a thread.",
    caption: "The physical. Reimagined.",
    detail:
      "Bring ideas to life with digital apparel design, true-to-life sampling, and precision cutting.",
  },
  {
    name: "Pattern",
    title: "Turn an idea into a precise plan.",
    caption: "From intuition to precision.",
    detail:
      "Connect design decisions to production with coordinated patterns, tools, and workflows.",
  },
  {
    name: "System",
    title: "Build software around the way you work.",
    caption: "Your business. Custom built.",
    detail:
      "Design and develop custom web, mobile, AI, data, IoT, planning, and inventory systems for real business needs.",
  },
];
const interests = [
  "Apparel production",
  "Custom software",
  "Business operations",
];

function PatternDrawing() {
  return (
    <svg
      viewBox="0 0 520 320"
      fill="none"
      aria-hidden="true"
      className="tx-pattern-drawing"
    >
      <defs>
        <pattern
          id="tx-pattern-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path d="M20 0H0V20" stroke="#b8bcb5" strokeWidth=".5" />
        </pattern>
      </defs>
      <rect width="520" height="320" fill="url(#tx-pattern-grid)" />
      <g transform="translate(65 35) rotate(-8 160 110)">
        <path
          d="M74 38 118 15Q155 55 192 15L236 38 275 120 224 145 215 252H95L86 145 35 120Z"
          fill="#d3d7cc"
          stroke="#626a5d"
        />
        <path
          d="M155 50V239M110 214H205M95 145 118 30M224 145 192 30"
          stroke="#727b6d"
          strokeDasharray="4 4"
        />
        <path
          d="M304 45 360 65 345 233 286 233Z"
          fill="#e4e6df"
          stroke="#626a5d"
        />
        <path d="M60 273H240M60 269v8M240 269v8" stroke="#df3d2c" />
        <circle cx="155" cy="146" r="5" stroke="#df3d2c" />
        <path d="M145 146h20m-10-10v20" stroke="#df3d2c" />
      </g>
      <text x="365" y="295" fill="#626a5d" fontSize="9" fontFamily="monospace">
        PATTERN / 001
      </text>
    </svg>
  );
}

function SystemDrawing() {
  return (
    <div
      className="tx-system-drawing"
      role="img"
      aria-label="Concept dashboard preview with sample planning, inventory and analytics data"
    >
      <div className="tx-system-toolbar">
        <span className="tx-system-mark">t/</span>
        <span>Workspace / Operations</span>
        <span className="tx-system-status">Demo data</span>
      </div>
      <div className="tx-system-body">
        <div className="tx-system-sidebar">
          ⌘<span>▦</span>
          <span>↗</span>
          <span>⊞</span>
        </div>
        <div className="tx-system-content">
          <div className="tx-system-topline">
            <span>A plan for every moving part.</span>
            <span>Planning ↗</span>
          </div>
          <div className="tx-system-metrics">
            <div>
              <small>Scheduled jobs</small>
              <strong>12</strong>
            </div>
            <div>
              <small>In progress</small>
              <strong>04</strong>
            </div>
            <div>
              <small>Team members</small>
              <strong>08</strong>
            </div>
          </div>
          <div className="tx-chart">
            <div className="tx-chart-title">
              Planning / Inventory / Analytics<span>↗</span>
            </div>
            <svg
              viewBox="0 0 400 110"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 28H400M0 63H400M0 98H400" stroke="#dce0d4" />
              <path
                d="M0 93C30 90 25 65 65 73S110 45 140 57 173 13 211 31 250 9 283 26 327 8 360 13 380 1 400 3"
                stroke="#dc3c2b"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TradexHomepage() {
  const [stage, setStage] = useState(0);
  const [interest, setInterest] = useState(interests[0]);
  const [sceneActive, setSceneActive] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const manualStage = useRef(false);
  const { shouldUseStaticEffects, shouldReduceMotion } = usePerformanceMode();
  const { enabled, toggle, play } = useInterfaceSound();

  useEffect(() => {
    setSceneReady(true);
  }, []);

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    let visible = true;
    const updateActive = () => setSceneActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateActive();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", updateActive);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateActive);
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || window.matchMedia("(max-width: 700px)").matches)
      return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!heroRef.current || manualStage.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / travel));
        setStage(progress < 0.32 ? 0 : progress < 0.7 ? 1 : 2);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [shouldReduceMotion]);

  const chooseStage = (index: number) => {
    manualStage.current = true;
    setStage(index);
    play(index === 0 ? "fabric" : "transition");
  };
  const emailHref = `mailto:info@tradexsolution.com?subject=${encodeURIComponent(`Let's talk: ${interest}`)}&body=${encodeURIComponent(`Hello Tradex,\n\nI'm interested in ${interest.toLowerCase()}.\n\nCompany:\nWhat I'd like to achieve:\n\n`)}`;

  return (
    <main className="tx-home" id="top">
      <a className="tx-skip" href="#divisions">
        Skip to our divisions
      </a>
      <BrandHeader enabled={enabled} toggle={toggle} play={play} />

      <section
        className="tx-hero-track"
        ref={heroRef}
        aria-labelledby="tx-hero-title"
      >
        <div className="tx-hero-sticky">
          <div className="tx-hero-topline">
            <span>
              <i className="tx-dot" /> INDEPENDENT MINDS. CONNECTED
              POSSIBILITIES.
            </span>
            <span>
              KOTTE, LK <span className="tx-plus">↗</span> BUILT FOR EVERYWHERE
            </span>
          </div>
          <div className="tx-hero-main">
            <div className="tx-hero-copy">
              <h1 id="tx-hero-title">
                From material.
                <br />
                To <span>intelligence.</span>
              </h1>
              <p>
                We connect apparel technology with custom software
                <br className="tx-desktop-break" /> development to move your
                business forward.
              </p>
              <div className="tx-hero-actions">
                <Link
                  className="tx-round-link"
                  href="/tradex-solution"
                  onClick={() => play()}
                >
                  <span className="tx-circle">
                    <Arrow />
                  </span>
                  Explore Optitex &amp; apparel technology
                </Link>
                <Link
                  className="tx-hero-software-link"
                  href="/tradex-innovation"
                  onClick={() => play()}
                >
                  Build custom software <Arrow diagonal />
                </Link>
              </div>
              <div className="tx-hero-footnote">
                <span>01 — 03</span> A new perspective on what’s possible.
              </div>
            </div>
            <div className="tx-artwork" ref={sceneRef}>
              <div className="tx-artwork-label">
                <span>TRADEX / MATERIAL STUDY</span>
                <span>NO. 00{stage + 1}</span>
              </div>
              <div
                className={`tx-sculpture tx-sculpture--${stage}`}
                onPointerDown={() => play("fabric")}
                role="img"
                aria-label={`${stages[stage].name}: ${stages[stage].caption}`}
              >
                {sceneReady && !shouldUseStaticEffects ? (
                  <MaterialSculpture stage={stage} active={sceneActive} />
                ) : (
                  <MaterialFallback stage={stage} />
                )}
              </div>
              <div className="tx-artwork-caption">
                <span className="tx-crosshair">+</span>
                <span>{stages[stage].caption}</span>
                <span className="tx-crosshair">+</span>
              </div>
            </div>
          </div>
          <div className="tx-hero-bottom">
            <a href="#approach" className="tx-scroll-cue">
              SCROLL TO TRANSFORM <span>↓</span>
            </a>
            <div
              className="tx-stage-selector"
              role="group"
              aria-label="Explore the material transformation"
            >
              {stages.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => chooseStage(index)}
                  aria-pressed={stage === index}
                >
                  <span>0{index + 1}</span>
                  {item.name}
                  <i />
                </button>
              ))}
            </div>
            <span className="tx-interaction-hint">
              MOVE TO EXPLORE <span>↔</span>
            </span>
          </div>
        </div>
      </section>

      <section
        className="tx-approach tx-section"
        id="approach"
        aria-labelledby="tx-approach-title"
      >
        <div className="tx-section-kicker">
          <span>THE CONNECTING THREAD</span>
          <span>01 / APPROACH</span>
        </div>
        <div className="tx-approach-content">
          <h2 id="tx-approach-title">
            Real-world expertise.
            <br />
            <span>Next-world thinking.</span>
          </h2>
          <div>
            <p>
              From apparel technology to custom software development, our two
              specialist teams solve operational challenges with practical
              technology built around the way you work.
            </p>
            <a href="#divisions" className="tx-text-link">
              Find your way forward <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="tx-process" aria-label="Our process">
          {stages.map((item, index) => (
            <div className="tx-process-step" key={item.name}>
              <span className="tx-process-number">0{index + 1}</span>
              <h3>
                {item.name}
                <Arrow />
              </h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="tx-divisions tx-section"
        id="divisions"
        aria-labelledby="tx-divisions-title"
      >
        <div className="tx-section-kicker">
          <span>TWO DISCIPLINES. ONE DIRECTION.</span>
          <span>02 / OUR WORLD</span>
        </div>
        <div className="tx-section-heading">
          <h2 id="tx-divisions-title">Find your next.</h2>
          <p>
            Different expertise.
            <br />
            The same drive to move you forward.
          </p>
        </div>
        <div className="tx-division-grid">
          <Link
            className="tx-division tx-division-solution"
            href="/tradex-solution"
            onClick={() => play("transition")}
          >
            <div className="tx-division-top">
              <span>
                <i className="tx-dot" /> TRADEX SOLUTION
              </span>
              <span>01</span>
            </div>
            <div className="tx-division-visual">
              <PatternDrawing />
              <span className="tx-visual-tag">FROM DESIGN TO PRODUCTION</span>
            </div>
            <div className="tx-division-copy">
              <span className="tx-division-eyebrow">
                EXCLUSIVE OPTITEX PARTNER
              </span>
              <h3>
                Design better.
                <br />
                Produce smarter.
              </h3>
              <p>
                Official Optitex software licenses from your exclusive partner,
                plus Sinajet digital cutting equipment.
              </p>
              <span className="tx-division-link">
                Explore Optitex &amp; apparel technology{" "}
                <span>
                  <Arrow diagonal />
                </span>
              </span>
            </div>
          </Link>
          <Link
            className="tx-division tx-division-innovation"
            href="/tradex-innovation"
            onClick={() => play("transition")}
          >
            <div className="tx-division-top">
              <span>
                <i className="tx-dot" /> TRADEX INNOVATION
              </span>
              <span>02</span>
            </div>
            <div className="tx-division-visual">
              <SystemDrawing />
              <span className="tx-visual-tag">
                CUSTOM SOFTWARE / PRODUCT INTERFACE
              </span>
            </div>
            <div className="tx-division-copy">
              <span className="tx-division-eyebrow">
                CUSTOM SOFTWARE DEVELOPMENT
              </span>
              <h3>
                Software built around
                <br />
                your business.
              </h3>
              <p>
                Custom web and mobile apps, AI solutions, planning and inventory
                platforms, data systems, and IoT integrations.
              </p>
              <span className="tx-division-link">
                Explore custom software development{" "}
                <span>
                  <Arrow diagonal />
                </span>
              </span>
            </div>
          </Link>
        </div>
        <div className="tx-partners">
          <p>
            Specialist expertise.
            <br />
            <span>Apparel software and equipment.</span>
          </p>
          <div>
            <Link
              className="tx-partner-item"
              href="/tradex-solution#optitex"
              onClick={() => play()}
            >
              <span className="tx-partner-logo">
                <Image
                  src={getAssetPath("/optitex.png")}
                  alt="Optitex"
                  width={500}
                  height={500}
                />
              </span>
              <span className="tx-partner-label">
                Exclusive Optitex partner
              </span>
            </Link>
            <Link
              className="tx-partner-item"
              href="/tradex-solution#sinajet"
              onClick={() => play()}
            >
              <span className="tx-partner-logo tx-partner-logo-sinajet">
                <Image
                  src={getAssetPath("/sinajet.png")}
                  alt="Sinajet"
                  width={500}
                  height={500}
                />
              </span>
              <span className="tx-partner-label">
                Digital cutting equipment
              </span>
            </Link>
          </div>
          <span className="tx-partner-note">
            APPAREL TECHNOLOGY
            <br />
            WITH TRADEX SOLUTION
          </span>
        </div>
      </section>

      <section
        className="tx-work tx-section"
        id="work"
        aria-labelledby="tx-work-title"
      >
        <div className="tx-section-kicker">
          <span>CUSTOM SOFTWARE, PUT TO WORK.</span>
          <span>03 / SELECTED PRODUCTS</span>
        </div>
        <div className="tx-section-heading">
          <h2 id="tx-work-title">Built around real operations.</h2>
          <Link href="/tradex-innovation#portfolio" className="tx-text-link">
            Explore custom software <Arrow diagonal />
          </Link>
        </div>
        <div className="tx-work-grid">
          <Link
            href="/tradex-innovation#portfolio"
            className="tx-work-card"
            onClick={() => play()}
          >
            <div className="tx-work-image">
              <Image
                src={garmentLineImage}
                alt="GarmentLine apparel production planning application"
                sizes="(max-width: 700px) 90vw, 46vw"
              />
              <span>
                <Arrow diagonal />
              </span>
            </div>
            <div className="tx-work-caption">
              <h3>GarmentLine</h3>
              <span>CUSTOM SOFTWARE / PRODUCTION PLANNING</span>
            </div>
          </Link>
          <Link
            href="/tradex-innovation#portfolio"
            className="tx-work-card"
            onClick={() => play()}
          >
            <div className="tx-work-image">
              <Image
                src={machineServiceImage}
                alt="Machine service management application"
                sizes="(max-width: 700px) 90vw, 46vw"
              />
              <span>
                <Arrow diagonal />
              </span>
            </div>
            <div className="tx-work-caption">
              <h3>Machine Service System</h3>
              <span>CUSTOM SOFTWARE / SERVICE OPERATIONS</span>
            </div>
          </Link>
        </div>
      </section>

      <section
        className="tx-about tx-section"
        id="about"
        aria-labelledby="tx-about-title"
      >
        <div className="tx-section-kicker">
          <span>A SHARED AMBITION</span>
          <span>04 / ABOUT TRADEX</span>
        </div>
        <div className="tx-about-content">
          <span className="tx-about-symbol" aria-hidden="true">
            ✳
          </span>
          <h2 id="tx-about-title">
            Progress is better
            <br />
            when it’s <span>connected.</span>
          </h2>
          <div>
            <p>
              We’re a team of apparel specialists and custom software developers
              based in Sri Lanka. We work alongside your people to turn complex
              operational challenges into practical products.
            </p>
            <Link href="/tradex-solution#about" className="tx-text-link">
              Get to know Tradex <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="tx-contact tx-section"
        id="contact"
        aria-labelledby="tx-contact-title"
      >
        <div className="tx-section-kicker">
          <span>YOUR NEXT CHAPTER STARTS HERE</span>
          <span>05 / LET’S TALK</span>
        </div>
        <div className="tx-contact-main">
          <h2 id="tx-contact-title">
            What do you want
            <br />
            to move <span>forward?</span>
          </h2>
          <a
            className="tx-contact-arrow"
            href={emailHref}
            aria-label={`Start an email about ${interest.toLowerCase()}`}
            onClick={() => play("transition")}
          >
            <Arrow diagonal />
          </a>
        </div>
        <fieldset className="tx-interests">
          <legend>I’M THINKING ABOUT</legend>
          {interests.map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="interest"
                checked={interest === item}
                onChange={() => {
                  setInterest(item);
                  play();
                }}
              />
              <span>
                {item}
                <Arrow diagonal />
              </span>
            </label>
          ))}
        </fieldset>
        <div className="tx-contact-bottom">
          <a href={emailHref} className="tx-text-link" onClick={() => play()}>
            Start a conversation <Arrow diagonal />
          </a>
          <span>
            Prefer email?{" "}
            <a href="mailto:info@tradexsolution.com">info@tradexsolution.com</a>
          </span>
        </div>
      </section>
      <BrandFooter />
    </main>
  );
}
