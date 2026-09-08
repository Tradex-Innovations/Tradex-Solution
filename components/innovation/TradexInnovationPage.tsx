"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import {
  Arrow,
  BrandFooter,
  BrandHeader,
} from "@/components/brand/BrandChrome";
import { useInterfaceSound } from "@/components/home/useInterfaceSound";
import garmentImage from "@/assets/images/optimized/garmentline-card.jpg";
import machineImage from "@/assets/images/optimized/machine-service-system-card.jpg";
import carImage from "@/assets/images/optimized/car-service-center-card.jpg";
import "../home/homepage.css";
import "./innovation.css";

const services = [
  {
    name: "Web & mobile apps",
    title: "Your product. In their hands.",
    description:
      "Custom applications for the people who use your business every day. Bring customer experiences and internal tools to web and mobile.",
    points: [
      "Customer portals & web platforms",
      "Mobile applications",
      "Connected back-office tools",
    ],
    deliverable: "A product designed around your users.",
    visual: "01 / EXPERIENCES",
  },
  {
    name: "Business systems",
    title: "Make the everyday work better.",
    description:
      "Turn planning, inventory and service processes into software that fits your operation. Give teams a shared view of what needs to happen next.",
    points: [
      "Production planning & scheduling",
      "Inventory & asset management",
      "Service workflows & dashboards",
    ],
    deliverable: "Clearer operations, from one workspace.",
    visual: "02 / OPERATIONS",
  },
  {
    name: "AI & automation",
    title: "Put repetitive work on a new path.",
    description:
      "Identify useful applications for AI in your business, from working with documents to supporting decisions. Design automation around your data and the people reviewing the results.",
    points: [
      "Document & language workflows",
      "Prediction & decision support",
      "Process automation",
    ],
    deliverable: "Intelligence with a practical purpose.",
    visual: "03 / INTELLIGENCE",
  },
  {
    name: "Data engineering",
    title: "Bring your data into focus.",
    description:
      "Connect scattered business data and prepare it for reporting and analysis. Build the foundations your teams need to make informed decisions.",
    points: [
      "Data pipelines & integrations",
      "Data warehouses & transformation",
      "Reporting & analytics",
    ],
    deliverable: "A clearer view of your business.",
    visual: "04 / INFORMATION",
  },
  {
    name: "IoT & integrations",
    title: "Connect the physical to the digital.",
    description:
      "Bring machines, devices and existing systems into a connected workflow. Make operational information available to the people who need it.",
    points: [
      "Device & sensor integration",
      "Telemetry & monitoring",
      "System-to-system connections",
    ],
    deliverable: "Signals that turn into useful actions.",
    visual: "05 / CONNECTIONS",
  },
];
const projects = [
  {
    title: "Garment Line Monitoring System",
    category: "PRODUCTION / VISIBILITY",
    image: garmentImage,
    alt: "Garment line monitoring dashboard",
    summary: "A shared view of the production floor.",
    problem:
      "Production teams need to see line progress, efficiency and operator performance as work moves through the factory.",
    solution:
      "A monitoring system that brings production tracking and performance information into live dashboards and analytics.",
    points: ["Line progress", "Operator performance", "Production analytics"],
  },
  {
    title: "Machine Service Management System",
    category: "SERVICE / COORDINATION",
    image: machineImage,
    alt: "Machine service management dashboard",
    summary: "From a service request to a clearer next step.",
    problem:
      "Service work involves customers, equipment and technicians. Those handoffs need a consistent way to track each job.",
    solution:
      "A shared platform for maintenance and service operations, with QR-powered workflows, job tracking and a customer self-service portal.",
    points: ["QR workflows", "Service jobs", "Customer portal"],
  },
  {
    title: "Car Service Center Monitoring System",
    category: "WORKSHOP / OPERATIONS",
    image: carImage,
    alt: "Car service center monitoring dashboard",
    summary: "Keep the workshop moving together.",
    problem:
      "Bookings, job assignments, parts and customer updates all compete for attention in a busy service center.",
    solution:
      "A digital workspace that brings bookings, job assignments, inventory and customer communication into one dashboard.",
    points: ["Bookings & jobs", "Inventory", "Customer communication"],
  },
];
const process = [
  {
    title: "Discover",
    description:
      "Understand your business, your users and the problem worth solving.",
    output: "A clear brief",
  },
  {
    title: "Design",
    description:
      "Map the workflow and explore an interface your team can review.",
    output: "A shared direction",
  },
  {
    title: "Develop",
    description:
      "Build in stages, test the important journeys and review progress together.",
    output: "Working software",
  },
  {
    title: "Support",
    description:
      "Plan the rollout, help your team get started and discuss ongoing improvements.",
    output: "A path forward",
  },
];
const inventory = [
  { name: "Sensor module", code: "SNS-024", stock: 48, status: "In stock" },
  { name: "Drive belt", code: "BLT-012", stock: 6, status: "Reorder" },
  { name: "Control board", code: "PCB-008", stock: 24, status: "In stock" },
];
const previewNames = ["Planning", "Inventory", "Analytics"];

function navigateTabs(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  count: number,
  prefix: string,
  choose: (index: number) => void,
) {
  const next =
    event.key === "ArrowRight"
      ? (index + 1) % count
      : event.key === "ArrowLeft"
        ? (index + count - 1) % count
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? count - 1
            : null;
  if (next === null) return;
  event.preventDefault();
  choose(next);
  document.getElementById(`${prefix}-${next}`)?.focus();
}

function Dashboard({ play }: { play: () => void }) {
  const [view, setView] = useState(0);
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<"Week" | "Month">("Week");
  const [taskStarted, setTaskStarted] = useState(false);
  const choose = (index: number) => {
    setView(index);
    play();
  };
  const filtered = inventory.filter((item) =>
    `${item.name} ${item.code}`.toLowerCase().includes(query.toLowerCase()),
  );
  const chartValues =
    period === "Week" ? [42, 65, 53, 80, 72, 92, 84] : [56, 71, 63, 88];
  const chartLabels =
    period === "Week"
      ? ["M", "T", "W", "T", "F", "S", "S"]
      : ["W1", "W2", "W3", "W4"];
  return (
    <div className="ti-demo">
      <div className="ti-demo-meta ti-mono">
        <span>BUILT AROUND YOUR WORK</span>
        <span>INTERACTIVE PREVIEW ↙</span>
      </div>
      <div className="ti-dashboard">
        <div className="ti-dashboard-header">
          <span className="ti-app-mark" aria-hidden="true">
            t<span> /</span>
          </span>
          <span>
            Workspace<span className="ti-workspace-path"> / Operations</span>
          </span>
          <span className="ti-demo-badge">Demo data</span>
        </div>
        <div
          className="ti-dashboard-tabs"
          role="tablist"
          aria-label="Dashboard preview"
        >
          {previewNames.map((name, index) => (
            <button
              role="tab"
              id={`preview-tab-${index}`}
              aria-selected={view === index}
              aria-controls="preview-panel"
              tabIndex={view === index ? 0 : -1}
              key={name}
              onClick={() => choose(index)}
              onKeyDown={(event) =>
                navigateTabs(
                  event,
                  index,
                  previewNames.length,
                  "preview-tab",
                  choose,
                )
              }
            >
              <span className="ti-tab-index">0{index + 1}</span>
              {name}
            </button>
          ))}
        </div>
        <div
          className="ti-dashboard-body"
          id="preview-panel"
          role="tabpanel"
          aria-labelledby={`preview-tab-${view}`}
          tabIndex={0}
        >
          <div key={view} className="ti-panel-enter">
            <div className="ti-dashboard-title">
              <div>
                <span className="ti-mono">YOUR OPERATIONS, CONNECTED</span>
                <h3>
                  {
                    [
                      "A plan for every moving part.",
                      "Everything in its place.",
                      "See the bigger picture.",
                    ][view]
                  }
                </h3>
              </div>
              <span className="ti-dashboard-dot" aria-hidden="true" />
            </div>
            {view === 0 ? (
              <>
                <div className="ti-demo-metrics">
                  <div>
                    <span>Scheduled</span>
                    <strong>
                      12 <small>jobs</small>
                    </strong>
                  </div>
                  <div>
                    <span>In progress</span>
                    <strong>{taskStarted ? "05" : "04"}</strong>
                  </div>
                  <div>
                    <span>Team members</span>
                    <strong>08</strong>
                  </div>
                </div>
                <div className="ti-board">
                  {["Planned", "In progress", "Complete"].map(
                    (column, index) => (
                      <div key={column}>
                        <span className="ti-board-label">
                          <i />
                          {column}
                        </span>
                        <div className="ti-task">
                          <span className="ti-task-code">
                            {
                              (taskStarted
                                ? ["JOB / 025", "JOB / 024", "JOB / 018"]
                                : ["JOB / 024", "JOB / 021", "JOB / 018"])[
                                index
                              ]
                            }
                          </span>
                          <h4>
                            {
                              [
                                taskStarted
                                  ? "Material check"
                                  : "Production review",
                                taskStarted
                                  ? "Production review"
                                  : "System installation",
                                "Quality check",
                              ][index]
                            }
                          </h4>
                          <p>
                            {
                              [
                                "Planning team",
                                taskStarted
                                  ? "Planning team"
                                  : "Technical team",
                                "Operations team",
                              ][index]
                            }
                          </p>
                          <span className="ti-task-footer">
                            {
                              [
                                "Today",
                                taskStarted ? "Started" : "In review",
                                "Completed",
                              ][index]
                            }
                            <b>
                              {["PL", taskStarted ? "PL" : "TE", "OP"][index]}
                            </b>
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <button
                  className="ti-demo-action"
                  onClick={() => {
                    setTaskStarted(!taskStarted);
                    play();
                  }}
                >
                  {taskStarted ? "Reset demo task" : "Start next demo task"}{" "}
                  <Arrow />
                </button>
                <p className="ti-demo-feedback" aria-live="polite">
                  {taskStarted
                    ? "Demo task started. In-progress jobs updated to 5."
                    : "Try an action to see the workspace respond."}
                </p>
              </>
            ) : view === 1 ? (
              <>
                <label
                  className="ti-search-label"
                  htmlFor="ti-inventory-search"
                >
                  Find an item
                </label>
                <input
                  className="ti-inventory-search"
                  id="ti-inventory-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search demo inventory…"
                  type="search"
                />
                <table className="ti-inventory-table">
                  <caption className="ti-sr-only">Sample inventory</caption>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <tr key={item.code}>
                        <td>
                          {item.name}
                          <span>{item.code}</span>
                        </td>
                        <td>{item.stock}</td>
                        <td>
                          <span
                            className={
                              item.status === "Reorder"
                                ? "ti-stock-low"
                                : "ti-stock"
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="ti-demo-feedback" aria-live="polite">
                  {filtered.length
                    ? `${filtered.length} demo items shown.`
                    : "No items match. Try “sensor” or “belt”."}
                </p>
              </>
            ) : (
              <>
                <div className="ti-chart-top">
                  <div>
                    <span>Completed jobs</span>
                    <strong>{period === "Week" ? "48" : "192"}</strong>
                  </div>
                  <div
                    className="ti-period"
                    role="group"
                    aria-label="Analytics period"
                  >
                    {(["Week", "Month"] as const).map((value) => (
                      <button
                        key={value}
                        aria-pressed={period === value}
                        onClick={() => {
                          setPeriod(value);
                          play();
                        }}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  className="ti-chart"
                  role="img"
                  aria-label={
                    period === "Week"
                      ? "Demo weekly activity chart. 48 completed jobs."
                      : "Demo monthly activity chart. 192 completed jobs."
                  }
                >
                  {chartValues.map((value, index) => (
                    <div key={`${period}-${index}`}>
                      <div className="ti-bar-track">
                        <span style={{ height: `${value}%` }} />
                      </div>
                      <span>{chartLabels[index]}</span>
                    </div>
                  ))}
                </div>
                <p className="ti-demo-feedback">
                  Sample activity, shown for illustration.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="ti-dashboard-footer">
          <span>
            <i /> CUSTOM SOFTWARE / TRADEX INNOVATION
          </span>
          <span>CONCEPT 001</span>
        </div>
      </div>
      <div className="ti-demo-bottom">
        <span className="ti-mono">YOUR WORKFLOW. YOUR RULES.</span>
        <span>
          Explore the tabs above <Arrow />
        </span>
      </div>
    </div>
  );
}

export default function TradexInnovationPage() {
  const { enabled, toggle, play } = useInterfaceSound();
  const [service, setService] = useState(0);
  const [interest, setInterest] = useState(services[0].name);
  const [brief, setBrief] = useState("");
  const [project, setProject] = useState("");
  const selectedService = services[service];
  const chooseService = (index: number) => {
    setService(index);
    play("transition");
  };
  const inquire = (name: string, reference = "") => {
    setInterest(name);
    setProject(reference);
    play();
  };
  const emailHref = `mailto:info@tradexsolution.com?subject=${encodeURIComponent(`Tradex Innovation: ${interest}`)}&body=${encodeURIComponent(`Hello Tradex Innovation,\n\nI'm interested in ${interest.toLowerCase()}.\n${project ? `Project reference: ${project}\n` : ""}\n${brief.trim() || "What I'd like to build:"}\n\nCompany:\nContact number:\n`)}`;
  return (
    <main className="tx-home ti-page" id="top">
      <a className="tx-skip" href="#solutions">
        Skip to software services
      </a>
      <BrandHeader
        enabled={enabled}
        toggle={toggle}
        play={play}
        active="innovation"
      />
      <section className="ti-hero" aria-labelledby="ti-title">
        <div className="ti-topline ti-mono">
          <span>
            <i className="tx-dot" /> TRADEX INNOVATION / CUSTOM SOFTWARE
          </span>
          <span>
            KOTTE, LK <b>↗</b> BUILT FOR THE WAY YOU WORK
          </span>
        </div>
        <div className="ti-hero-layout">
          <div className="ti-hero-copy">
            <span className="ti-mono ti-hero-kicker">
              IDEAS INTO INTERFACES. AMBITION INTO ACTION.
            </span>
            <h1 id="ti-title">
              Your business.
              <br />
              <em>Custom built.</em>
            </h1>
            <p>
              Web apps, mobile experiences and business systems. We design and
              develop software around your people, your processes and your next
              step.
            </p>
            <div className="ti-actions">
              <a href="#contact" className="ti-button" onClick={() => play()}>
                Discuss your project <Arrow diagonal />
              </a>
              <a href="#portfolio" className="ti-link" onClick={() => play()}>
                Explore our work <Arrow />
              </a>
            </div>
            <span className="ti-hero-footnote">
              <i /> DESIGNED WITH YOU. DEVELOPED FOR YOU.
            </span>
          </div>
          <Dashboard play={() => play()} />
        </div>
      </section>
      <div className="ti-capability-strip">
        <span className="ti-mono">
          FROM THE FIRST IDEA
          <br />
          TO THE EVERYDAY ESSENTIAL.
        </span>
        <span>Web & mobile</span>
        <span>Business systems</span>
        <span>AI & data</span>
        <span>IoT & integrations</span>
      </div>
      <section
        className="ti-section"
        id="portfolio"
        aria-labelledby="ti-projects-title"
      >
        <div className="ti-section-heading">
          <span className="ti-mono">01 / SELECTED WORK</span>
          <h2 id="ti-projects-title">
            Real work.
            <br />
            <em>Thoughtfully built.</em>
          </h2>
          <p>
            A closer look at the systems we build to make production, service
            and daily operations easier to manage.
          </p>
        </div>
        <div className="ti-project-grid">
          {projects.map((item, index) => (
            <article key={item.title} className="ti-project">
              <div className="ti-project-image">
                <span className="ti-project-number ti-mono">
                  0{index + 1} / TRADEX INNOVATION
                </span>
                <Image
                  src={item.image}
                  alt={item.alt}
                  sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 30vw"
                />
              </div>
              <div className="ti-project-copy">
                <span className="ti-mono">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <details
                  onToggle={(event) => {
                    if (event.currentTarget.open) play();
                  }}
                >
                  <summary>
                    Explore this project <span aria-hidden="true">+</span>
                  </summary>
                  <div className="ti-project-expanded">
                    <h4>The challenge</h4>
                    <p>{item.problem}</p>
                    <h4>The system</h4>
                    <p>{item.solution}</p>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="ti-link"
                      onClick={() => inquire("Business systems", item.title)}
                    >
                      Discuss a similar project <Arrow diagonal />
                    </a>
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        className="ti-services ti-section"
        id="solutions"
        aria-labelledby="ti-services-title"
      >
        <div className="ti-section-heading">
          <span className="ti-mono">02 / WHAT WE BUILD</span>
          <h2 id="ti-services-title">
            Start with your need.
            <br />
            <em>Build the right thing.</em>
          </h2>
          <p>
            Explore where we can help, from a customer-facing app to the systems
            that keep your business running.
          </p>
        </div>
        <div className="ti-services-layout">
          <div
            className="ti-service-tabs"
            role="tablist"
            aria-label="Software services"
            aria-orientation="vertical"
          >
            {services.map((item, index) => (
              <button
                key={item.name}
                role="tab"
                id={`service-tab-${index}`}
                aria-selected={service === index}
                aria-controls="service-panel"
                tabIndex={service === index ? 0 : -1}
                onClick={() => chooseService(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    const next =
                      (index +
                        (event.key === "ArrowDown" ? 1 : services.length - 1)) %
                      services.length;
                    chooseService(next);
                    document.getElementById(`service-tab-${next}`)?.focus();
                  } else
                    navigateTabs(
                      event,
                      index,
                      services.length,
                      "service-tab",
                      chooseService,
                    );
                }}
              >
                <span className="ti-mono">0{index + 1}</span>
                {item.name}
                <Arrow diagonal />
              </button>
            ))}
          </div>
          <div
            className="ti-service-panel"
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${service}`}
            tabIndex={0}
          >
            <div className="ti-panel-enter" key={service}>
              <span className="ti-mono">{selectedService.visual}</span>
              <h3>{selectedService.title}</h3>
              <p>{selectedService.description}</p>
              <ul>
                {selectedService.points.map((point) => (
                  <li key={point}>
                    <span aria-hidden="true">↗</span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="ti-service-bottom">
                <span>{selectedService.deliverable}</span>
                <a
                  className="ti-button"
                  href="#contact"
                  onClick={() => inquire(selectedService.name)}
                >
                  Let’s build it <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="ti-section ti-process"
        id="about"
        aria-labelledby="ti-process-title"
      >
        <div className="ti-section-heading">
          <span className="ti-mono">03 / HOW WE WORK</span>
          <h2 id="ti-process-title">
            A shared process.
            <br />
            <em>A clear next step.</em>
          </h2>
          <p>
            Good software starts with understanding your business. We keep the
            conversation going as the product takes shape.
          </p>
        </div>
        <div className="ti-process-grid">
          {process.map((item, index) => (
            <div key={item.title}>
              <span className="ti-mono">
                0{index + 1} <Arrow />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="ti-process-output">{item.output}</span>
            </div>
          ))}
        </div>
        <div className="ti-division-note">
          <p>Looking for apparel design software or cutting equipment?</p>
          <Link href="/tradex-solution">
            Explore Tradex Solution <Arrow diagonal />
          </Link>
        </div>
      </section>
      <section
        className="ti-contact ti-section"
        id="contact"
        aria-labelledby="ti-contact-title"
      >
        <div>
          <span className="ti-mono">04 / START A CONVERSATION</span>
          <h2 id="ti-contact-title">
            What could work
            <br />
            <em>better for you?</em>
          </h2>
          <p>
            Tell us about the idea you want to build or the process you want to
            improve. We’ll start from there.
          </p>
          <a className="ti-phone" href="tel:+94778745847">
            +94 77 874 5847 <Arrow diagonal />
          </a>
        </div>
        <div className="ti-inquiry">
          <fieldset>
            <legend>What are you looking to build?</legend>
            <div className="ti-interest-grid">
              {[...services.map((item) => item.name), "Help me define it"].map(
                (name) => (
                  <label
                    key={name}
                    className={interest === name ? "is-selected" : ""}
                  >
                    <input
                      type="radio"
                      name="innovation-interest"
                      value={name}
                      checked={interest === name}
                      onChange={() => inquire(name)}
                    />
                    <span>{name}</span>
                    <span aria-hidden="true">
                      {interest === name ? "↗" : "+"}
                    </span>
                  </label>
                ),
              )}
            </div>
          </fieldset>
          {project && (
            <div className="ti-project-reference">
              <span>Project reference: {project}</span>
              <button
                aria-label="Remove project reference"
                onClick={() => setProject("")}
              >
                ×
              </button>
            </div>
          )}
          <label className="ti-brief-label" htmlFor="ti-brief">
            A little about your idea <span>(optional)</span>
          </label>
          <textarea
            id="ti-brief"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            rows={4}
            maxLength={1500}
            placeholder="Who will use it? What should it help them do?"
          />
          <a href={emailHref} className="ti-button" onClick={() => play()}>
            Open email draft <Arrow diagonal />
          </a>
          <p className="ti-email-note">
            Opens your email app with your project brief. You can also reach us
            at{" "}
            <a href="mailto:info@tradexsolution.com">info@tradexsolution.com</a>
            .
          </p>
        </div>
      </section>
      <BrandFooter />
    </main>
  );
}
