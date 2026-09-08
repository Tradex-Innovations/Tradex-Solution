"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type KeyboardEvent } from "react";
import {
  Arrow,
  BrandFooter,
  BrandHeader,
} from "@/components/brand/BrandChrome";
import { useInterfaceSound } from "@/components/home/useInterfaceSound";
import { getAssetPath } from "@/lib/utils";
import "../home/homepage.css";
import "./solution.css";

const machineFeatures = [
  {
    title: "Modular tools",
    detail:
      "Circular knife, notch knife and drilling options for different garment cutting requirements.",
  },
  {
    title: "Material control",
    detail:
      "A vacuum hold-down system keeps material in place across the cutting surface.",
  },
  {
    title: "Digital input",
    detail:
      "DXF, HPGL and CUT file support, with LAN data transfer to the cutting system.",
  },
];
const softwareFeatures = [
  {
    title: "2D pattern design",
    heading: "Every detail. Deliberate.",
    detail:
      "Create and refine digital patterns, then grade your designs across sizes. Build a precise foundation for the garments you make.",
    caption: "01 / PATTERN ENGINEERING",
    mode: "pattern",
  },
  {
    title: "3D visualization",
    heading: "See the fit. Before the fabric.",
    detail:
      "Bring 2D patterns into 3D to explore garment fit and review design decisions before making a physical sample.",
    caption: "02 / VIRTUAL SAMPLING",
    mode: "garment",
  },
  {
    title: "Marker planning",
    heading: "Make more of your material.",
    detail:
      "Arrange pattern pieces into production markers with Optitex Marker. Discuss the right software modules for your cutting-room workflow.",
    caption: "03 / MATERIAL PLANNING",
    mode: "marker",
  },
];
const interests = [
  "Sinajet cutting machines",
  "Optitex software licenses",
  "Machines + software",
  "Customer support",
];
const steps = [
  {
    title: "Design",
    text: "Develop and grade your patterns with Optitex.",
    target: "#optitex",
  },
  {
    title: "Validate",
    text: "Review your garment digitally before sampling.",
    target: "#optitex",
  },
  {
    title: "Prepare",
    text: "Plan your marker and confirm the production files.",
    target: "#optitex",
  },
  {
    title: "Cut",
    text: "Bring the pattern to material with Sinajet equipment.",
    target: "#sinajet",
  },
];

function PatternStudy({ mode }: { mode: string }) {
  const studyId = useId();
  return (
    <svg
      viewBox="0 0 600 380"
      fill="none"
      className={`ts-pattern ts-pattern-${mode}`}
      role="img"
      aria-label={
        mode === "marker"
          ? "Illustration of nested garment pattern pieces"
          : mode === "garment"
            ? "Illustration of a garment with construction lines"
            : "Illustration of a graded garment pattern"
      }
    >
      <defs>
        <pattern
          id={`${studyId}-grid`}
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <path d="M25 0H0V25" stroke="#b8bdb2" strokeWidth=".5" />
        </pattern>
        <linearGradient
          id={`${studyId}-fabric`}
          x1="190"
          y1="70"
          x2="380"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8a9384" />
          <stop offset=".5" stopColor="#424d44" />
          <stop offset="1" stopColor="#6b7867" />
        </linearGradient>
      </defs>
      <rect
        x="25"
        y="20"
        width="550"
        height="340"
        fill={`url(#${studyId}-grid)`}
      />
      {mode === "garment" ? (
        <g>
          <path
            d="M229 65 266 49Q300 90 334 49L371 65 425 164 377 192 360 327H240L223 192 175 164Z"
            fill={`url(#${studyId}-fabric)`}
            stroke="#3b483e"
          />
          <path
            d="M266 49Q300 115 334 49M235 75 223 192M365 75 377 192M300 88V325M247 317H353M240 130Q295 168 360 130M239 181Q295 205 363 181M240 231Q300 250 361 231M239 280Q301 299 361 280"
            stroke="#aab7a3"
            opacity=".7"
          />
          <path
            d="M220 45H175V328H221M172 46H178M172 328H178"
            stroke="#dc3c2b"
          />
          <circle cx="300" cy="189" r="5" fill="#dc3c2b" />
        </g>
      ) : mode === "marker" ? (
        <g stroke="#626e5c">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${54 + i * 125} 55)`}>
              <path
                d="M8 12 38 0Q52 27 72 0L98 12 109 67 84 76 80 165H22L19 76 0 67Z"
                fill={i % 2 ? "#c4cebd" : "#d3dacb"}
              />
              <path
                d="M10 187H47L51 282H4ZM62 187H99L106 282H59Z"
                fill="#c4cebd"
              />
              <path
                d="M53 36V147M24 202V267M79 202V267"
                strokeDasharray="4 5"
              />
            </g>
          ))}
          <path d="M42 40H560V344H42Z" stroke="#dc3c2b" strokeDasharray="5 6" />
        </g>
      ) : (
        <g transform="translate(142 27)">
          {[1.12, 1.06, 1].map((scale, i) => (
            <path
              key={scale}
              transform={`translate(${150 * (1 - scale)} ${150 * (1 - scale)}) scale(${scale})`}
              d="M81 47 116 22Q150 58 184 22L219 47 259 125 213 151 207 292H93L87 151 41 125Z"
              fill={i === 2 ? "#ced6c6" : "none"}
              stroke={i === 2 ? "#56644e" : "#97a38d"}
            />
          ))}
          <path
            d="M150 60V274M105 253H195M87 151 116 22M213 151 184 22"
            stroke="#66775c"
            strokeDasharray="5 5"
          />
          <path
            d="M150 106V220M144 113 150 106 156 113M144 213 150 220 156 213"
            stroke="#dc3c2b"
          />
          {[
            [81, 47],
            [219, 47],
            [207, 292],
            [93, 292],
            [41, 125],
            [259, 125],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              fill="#dc3c2b"
            />
          ))}
        </g>
      )}
      <text x="42" y="372" fill="#66705f" fontSize="9" letterSpacing="2">
        TRADEX / DIGITAL MATERIAL STUDY
      </text>
    </svg>
  );
}

function moveTab(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  length: number,
  choose: (index: number) => void,
  prefix: string,
) {
  let next = index;
  if (event.key === "ArrowRight") next = (index + 1) % length;
  else if (event.key === "ArrowLeft") next = (index + length - 1) % length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = length - 1;
  else return;
  event.preventDefault();
  choose(next);
  document.getElementById(`${prefix}-${next}`)?.focus();
}

export default function TradexSolutionPage() {
  const { enabled, toggle, play } = useInterfaceSound();
  const [feature, setFeature] = useState(0);
  const [software, setSoftware] = useState(0);
  const [heroPreview, setHeroPreview] = useState(1);
  const [interest, setInterest] = useState(interests[1]);
  const [brief, setBrief] = useState("");
  const chooseFeature = (index: number) => {
    setFeature(index);
    play();
  };
  const chooseSoftware = (index: number) => {
    setSoftware(index);
    play("transition");
  };
  const inquire = (value: string) => {
    setInterest(value);
    play();
  };
  const emailHref = `mailto:info@tradexsolution.com?subject=${encodeURIComponent(`Tradex Solution inquiry: ${interest}`)}&body=${encodeURIComponent(`Hello Tradex,\n\nI'm interested in ${interest}.\n\n${brief.trim() || "My requirements:"}\n\nCompany:\nContact number:\n`)}`;
  const currentSoftware = softwareFeatures[software];

  return (
    <main className="tx-home ts-page" id="top">
      <a className="tx-skip" href="#solutions">
        Skip to solutions
      </a>
      <BrandHeader
        enabled={enabled}
        toggle={toggle}
        play={play}
        active="solution"
      />
      <section className="ts-hero" aria-labelledby="ts-title">
        <div className="ts-eyebrow ts-hero-meta">
          <span>
            <i className="tx-dot" /> TRADEX SOLUTION / APPAREL TECHNOLOGY
          </span>
          <span>
            KOTTE, LK <b>↗</b> PRECISION IN PRACTICE
          </span>
        </div>
        <div className="ts-hero-layout">
          <div className="ts-hero-copy">
            <h1 id="ts-title">
              Design it.
              <br />
              Perfect it.
              <br />
              With <em>Optitex.</em>
            </h1>
            <p>
              Official Optitex software licenses from your exclusive partner.
              Bring your ideas to life with 2D pattern design, 3D visualization
              and production planning.
            </p>
            <div className="ts-actions">
              <a
                className="ts-button"
                href="#contact"
                onClick={() => inquire(interests[1])}
              >
                Find your Optitex license <Arrow diagonal />
              </a>
              <a className="ts-link" href="#optitex" onClick={() => play()}>
                Explore Optitex <Arrow />
              </a>
            </div>
            <span className="ts-hero-note">
              <i /> YOUR EXCLUSIVE OPTITEX PARTNER
            </span>
          </div>
          <div className="ts-optitex-stage">
            <div className="ts-eyebrow ts-stage-top">
              <span>OPTITEX / DIGITAL PRODUCT CREATION</span>
              <span>0{heroPreview + 1} / 03</span>
            </div>
            <div className="ts-hero-study">
              <div key={heroPreview} className="ts-study-enter">
                <PatternStudy mode={softwareFeatures[heroPreview].mode} />
              </div>
            </div>
            <div
              className="ts-preview-controls"
              role="group"
              aria-label="Explore the Optitex workflow"
            >
              {softwareFeatures.map((item, index) => (
                <button
                  key={item.mode}
                  aria-label={`Preview ${item.title}`}
                  aria-pressed={heroPreview === index}
                  onClick={() => {
                    setHeroPreview(index);
                    play("transition");
                  }}
                >
                  <span className="ts-eyebrow">0{index + 1}</span>
                  {item.title}
                </button>
              ))}
            </div>
            <div className="ts-stage-bottom">
              <div aria-live="polite">
                <span className="ts-eyebrow">
                  {softwareFeatures[heroPreview].heading}
                </span>
                <p>Conceptual workflow illustration</p>
              </div>
              <a href="#optitex" aria-label="Explore Optitex software">
                <Arrow diagonal />
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="ts-partner-band">
        <span className="ts-eyebrow">
          THE TECHNOLOGY BEHIND YOUR NEXT CHAPTER
        </span>
        <div>
          <span className="ts-partner-name">
            Optitex<span className="ts-red">.</span>
          </span>
          <p>
            Exclusive Optitex partner
            <br />
            <span>Official software licenses</span>
          </p>
        </div>
        <div>
          <span className="ts-partner-name ts-sinajet-name">SINAJET</span>
          <p>
            Digital cutting machines
            <br />
            <span>Equipment sales & solution advice</span>
          </p>
        </div>
      </div>
      <section
        className="ts-section"
        id="solutions"
        aria-labelledby="ts-solutions-title"
      >
        <div className="ts-section-intro">
          <span className="ts-eyebrow">01 / OUR SOLUTIONS</span>
          <h2 id="ts-solutions-title">
            Two technologies.
            <br />
            <em>One production journey.</em>
          </h2>
          <p>
            From the first pattern to the final cut, choose the equipment and
            software that fit the way you make.
          </p>
        </div>
        <section
          className="ts-product ts-software"
          id="optitex"
          aria-labelledby="ts-software-title"
        >
          <div className="ts-software-study">
            <div className="ts-eyebrow ts-stage-top">
              <span>{currentSoftware.caption}</span>
              <span>OPTITEX / CAPABILITIES</span>
            </div>
            <div key={currentSoftware.mode} className="ts-study-enter">
              <PatternStudy mode={currentSoftware.mode} />
            </div>
            <div className="ts-study-caption">
              <span>Conceptual workflow illustration</span>
              <span>2D → 3D → CUT</span>
            </div>
          </div>
          <div className="ts-product-copy">
            <span className="ts-eyebrow">
              <i className="tx-dot" /> EXCLUSIVE OPTITEX PARTNER
            </span>
            <h3 id="ts-software-title">
              Your ideas.
              <br />
              <em>Digitally realized.</em>
            </h3>
            <p>
              Official Optitex software licenses through Tradex Solution. Find
              the right tools for your design team and production workflow.
            </p>
            <div
              className="ts-tabs"
              role="tablist"
              aria-label="Optitex capabilities"
            >
              {softwareFeatures.map((item, index) => (
                <button
                  key={item.title}
                  role="tab"
                  id={`software-tab-${index}`}
                  aria-selected={software === index}
                  aria-controls="software-panel"
                  tabIndex={software === index ? 0 : -1}
                  onClick={() => chooseSoftware(index)}
                  onKeyDown={(event) =>
                    moveTab(
                      event,
                      index,
                      softwareFeatures.length,
                      chooseSoftware,
                      "software-tab",
                    )
                  }
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div
              className="ts-software-description"
              id="software-panel"
              role="tabpanel"
              aria-labelledby={`software-tab-${software}`}
              tabIndex={0}
            >
              <h4>{currentSoftware.heading}</h4>
              <p>{currentSoftware.detail}</p>
            </div>
            <a
              className="ts-button"
              href="#contact"
              onClick={() => inquire(interests[1])}
            >
              Discuss your Optitex license <Arrow diagonal />
            </a>
            <a
              className="ts-source"
              href="https://optitex.com/products/"
              target="_blank"
              rel="noreferrer"
            >
              Explore the official Optitex product range ↗
            </a>
          </div>
        </section>
        <section
          className="ts-product ts-hardware"
          id="sinajet"
          aria-labelledby="ts-hardware-title"
        >
          <div className="ts-product-copy">
            <span className="ts-eyebrow">01.2 / CUTTING EQUIPMENT</span>
            <h3 id="ts-hardware-title">
              Meet your next
              <br />
              <em>cutting edge.</em>
            </h3>
            <p>
              Sinajet digital cutting machines for garment and textile
              production. Let’s find a setup around your materials, cutting
              volume and available space.
            </p>
            <a
              className="ts-button"
              href="#contact"
              onClick={() => inquire(interests[0])}
            >
              Request a machine quotation <Arrow diagonal />
            </a>
            <a
              className="ts-source"
              href="https://www.sinajet.net/DG-Series.html"
              target="_blank"
              rel="noreferrer"
            >
              DG Series manufacturer specifications ↗
            </a>
          </div>
          <div className="ts-machine-details">
            <div className="ts-eyebrow ts-stage-top">
              <span>DG SERIES / EXPLORE THE SYSTEM</span>
              <span>0{feature + 1}</span>
            </div>
            <Image
              src={getAssetPath("/products/sinajet-dg-series.jpg")}
              width={456}
              height={300}
              alt="Sinajet DG Series machine"
              className="ts-detail-image"
              sizes="(max-width: 800px) 90vw, 42vw"
            />
            <div
              className="ts-tabs"
              role="tablist"
              aria-label="Machine features"
            >
              {machineFeatures.map((item, index) => (
                <button
                  key={item.title}
                  role="tab"
                  id={`machine-tab-${index}`}
                  aria-selected={feature === index}
                  aria-controls="machine-panel"
                  tabIndex={feature === index ? 0 : -1}
                  onKeyDown={(event) =>
                    moveTab(
                      event,
                      index,
                      machineFeatures.length,
                      chooseFeature,
                      "machine-tab",
                    )
                  }
                  onClick={() => chooseFeature(index)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div
              className="ts-feature-detail"
              id="machine-panel"
              role="tabpanel"
              aria-labelledby={`machine-tab-${feature}`}
              tabIndex={0}
            >
              <p>{machineFeatures[feature].detail}</p>
            </div>
            <span className="ts-small">
              Model, tooling and configuration confirmed with your quotation.
            </span>
          </div>
        </section>
      </section>
      <section
        className="ts-workflow ts-section"
        id="workflow"
        aria-labelledby="ts-workflow-title"
      >
        <div className="ts-section-intro">
          <span className="ts-eyebrow">02 / FROM IDEA TO OUTPUT</span>
          <h2 id="ts-workflow-title">
            A clearer path
            <br />
            <em>to the cutting floor.</em>
          </h2>
          <p>
            Explore each stage. We’ll help you plan the software, equipment and
            file requirements for your workflow.
          </p>
        </div>
        <div className="ts-workflow-steps">
          {steps.map((step, index) => (
            <a
              key={step.title}
              href={step.target}
              onClick={() => {
                if (index < 3) chooseSoftware(index);
                else play();
              }}
            >
              <div>
                <span className="ts-eyebrow">0{index + 1}</span>
                <Arrow />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="ts-workflow-explore">
                Explore {index === 3 ? "Sinajet" : "Optitex"} ↗
              </span>
            </a>
          ))}
        </div>
      </section>
      <section
        className="ts-about ts-section"
        id="about"
        aria-labelledby="ts-about-title"
      >
        <div>
          <span className="ts-eyebrow">03 / YOUR PEOPLE ON THE GROUND</span>
          <h2 id="ts-about-title">
            Technology is only
            <br />
            the <em>beginning.</em>
          </h2>
          <p>
            Based in Kotte, Sri Lanka, Tradex Solution brings apparel software
            and cutting equipment into one conversation. From choosing a license
            to planning a machine purchase, start with the people who understand
            what you need to make.
          </p>
          <a
            className="ts-link"
            href="#contact"
            onClick={() => inquire(interests[3])}
          >
            Talk about customer support <Arrow diagonal />
          </a>
        </div>
        <div className="ts-support-list">
          {[
            {
              title: "Choosing your solution",
              text: "Tell us about your materials, design process and production needs. We’ll discuss suitable machine configurations and software options.",
            },
            {
              title: "Licensing & getting started",
              text: "As your exclusive Optitex partner, we help you discuss official licensing requirements and the next steps for your team.",
            },
            {
              title: "Help with an existing system",
              text: "Contact us with your machine model or Optitex version and a description of the issue so we can discuss the appropriate support.",
            },
          ].map((item, index) => (
            <details
              key={item.title}
              onToggle={(event) => {
                if (event.currentTarget.open) play();
              }}
            >
              <summary>
                <span className="ts-eyebrow">0{index + 1}</span>
                {item.title}
                <span className="ts-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{item.text}</p>
            </details>
          ))}
          <Link href="/tradex-innovation" className="ts-innovation-link">
            Need custom software?
            <span>
              Meet Tradex Innovation <Arrow diagonal />
            </span>
          </Link>
        </div>
      </section>
      <section
        className="ts-contact ts-section"
        id="contact"
        aria-labelledby="ts-contact-title"
      >
        <div>
          <span className="ts-eyebrow">04 / LET’S MAKE IT HAPPEN</span>
          <h2 id="ts-contact-title">
            What’s your
            <br />
            <em>next move?</em>
          </h2>
          <p>
            A new cutting machine, the right software license, or help with your
            existing setup. Tell us where you want to go.
          </p>
          <a className="ts-contact-phone" href="tel:+94778745847">
            +94 77 874 5847 <Arrow diagonal />
          </a>
        </div>
        <div className="ts-inquiry">
          <fieldset>
            <legend>I’m interested in</legend>
            <div className="ts-interest-options">
              {interests.map((item) => (
                <label
                  key={item}
                  className={interest === item ? "is-selected" : ""}
                >
                  <input
                    type="radio"
                    name="solution-interest"
                    value={item}
                    checked={interest === item}
                    onChange={() => inquire(item)}
                  />
                  <span>{item}</span>
                  <span aria-hidden="true">
                    {interest === item ? "↗" : "+"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="ts-brief-label" htmlFor="ts-brief">
            A little about your requirements <span>(optional)</span>
          </label>
          <textarea
            id="ts-brief"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            rows={3}
            maxLength={1500}
            placeholder="Your materials, team size, machine requirements or software needs…"
          />
          <a href={emailHref} className="ts-button" onClick={() => play()}>
            Open email draft <Arrow diagonal />
          </a>
          <p className="ts-small">
            Opens your email app with your inquiry. Or email{" "}
            <a href="mailto:info@tradexsolution.com">info@tradexsolution.com</a>
            .
          </p>
        </div>
      </section>
      <BrandFooter />
    </main>
  );
}
