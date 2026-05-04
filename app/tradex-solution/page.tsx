const stats = [
  { value: "20+", label: "Years across apparel technology, workflow transformation, and implementation." },
  { value: "3D", label: "Design-to-fit workflows that reduce sampling cycles and shorten time to market." },
  { value: "24-48h", label: "Typical response window for solution discovery, scoping, and support follow-up." },
];

const solutions = [
  {
    title: "Optitex Digital Product Creation",
    description:
      "Accelerate apparel design with 2D pattern engineering, 3D fit visualization, and collaborative virtual sampling.",
    points: ["Pattern design and grading", "3D sampling and fit review", "Faster approvals with fewer physical samples"],
  },
  {
    title: "Intelligent Cutting Systems",
    description:
      "Deploy precise cutting workflows for made-to-measure, sample rooms, and small-batch production with higher material efficiency.",
    points: ["MTM and sample cutting", "Low-layer precision control", "Factory-ready workflow integration"],
  },
  {
    title: "Implementation and Advisory",
    description:
      "Bridge software, production, and team adoption with rollout planning, onboarding, and process optimization support.",
    points: ["Workflow auditing", "Operational onboarding", "Change management for production teams"],
  },
];

const workflow = [
  {
    step: "01",
    title: "Design Faster",
    description:
      "Replace slow handoffs with connected 2D and 3D product development across teams, vendors, and approvals.",
  },
  {
    step: "02",
    title: "Validate Early",
    description:
      "Catch fit, accuracy, and production issues in the digital stage before the first physical cut is made.",
  },
  {
    step: "03",
    title: "Produce Smarter",
    description:
      "Send cleaner data into cutting and manufacturing workflows to reduce waste, rework, and lead time.",
  },
  {
    step: "04",
    title: "Scale Confidently",
    description:
      "Support business growth with systems that improve consistency, traceability, and team collaboration.",
  },
];

const differentiators = [
  "Deep apparel and manufacturing context, not generic software consulting.",
  "Tailored implementation paths that align with your current production reality.",
  "Modern digital workflows that improve quality, speed, and ROI together.",
  "Hands-on support for teams adopting new tools across design and production.",
];

const services = [
  "Digital fashion workflow transformation",
  "2D/3D product development enablement",
  "Cutting room optimization",
  "Vendor and team collaboration systems",
  "Implementation planning and onboarding",
  "Operational support for apparel businesses",
];

const contactDetails = [
  { label: "Address", value: "16/1 Maligawa Road, Ethul Kotte, Kotte, Sri Lanka" },
  { label: "Email", value: "info@tradexsolution.com" },
  { label: "Phone", value: "+94 77 874 5847" },
  { label: "Hours", value: "Monday - Friday: 8 AM to 5 PM | Saturday: 8 AM to 12 PM" },
];

const navItems = [
  { label: "Solutions", href: "#solutions" },
  { label: "Workflow", href: "#workflow" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ed1c24]/80">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-zinc-400 sm:text-lg">{description}</p>
    </div>
  );
}

export default function TradexSolutionPage() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(237,28,36,0.2),_transparent_28%),radial-gradient(circle_at_80%_0%,_rgba(127,29,29,0.18),_transparent_24%),linear-gradient(180deg,_#030303_0%,_#09090b_48%,_#030303_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-grid bg-[size:72px_72px] opacity-[0.08]" />
      <div className="pointer-events-none absolute left-[-12rem] top-20 -z-10 h-80 w-80 rounded-full bg-[#ed1c24]/14 blur-3xl animate-float" />
      <div className="pointer-events-none absolute right-[-10rem] top-[32rem] -z-10 h-96 w-96 rounded-full bg-red-950/35 blur-3xl animate-float-delayed" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur">
              <img
                src="/tradex-logo-dark.svg"
                alt="Tradex Solution"
                className="h-11 w-auto sm:h-12"
              />
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-zinc-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-[#ed1c24]/40 hover:bg-[#ed1c24]/10"
          >
            Start a Project
          </a>
        </div>
      </header>

      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-zinc-300">
              Partnering for productive solutions
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl font-heading text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Digital product creation and production systems for a sharper apparel business.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
                Tradex connects design, fit validation, and intelligent cutting into one modern
                workflow so teams can move faster, waste less, and launch with confidence.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#solutions"
                className="inline-flex items-center justify-center rounded-full bg-[#ed1c24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff2a33]"
              >
                Explore Solutions
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Why Tradex
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#ed1c24]/20 via-white/5 to-red-950/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Operational view</p>
                  <p className="mt-2 font-heading text-2xl font-semibold text-white">From sketch to cutting room</p>
                </div>
                <div className="rounded-full border border-[#ed1c24]/30 bg-[#ed1c24]/10 px-3 py-1 text-xs font-medium text-red-200">
                  Live workflow
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Virtual sample approvals",
                  "Pattern accuracy and grading",
                  "Connected production handoff",
                  "Material-conscious cutting",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-black/30 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                      0{index + 1}
                    </p>
                    <p className="mt-8 font-heading text-xl text-white">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-r from-[#ed1c24]/12 to-transparent p-5">
                <p className="text-sm uppercase tracking-[0.26em] text-red-300/80">
                  Time to market
                </p>
                <div className="mt-3 flex items-end justify-between gap-6">
                  <p className="max-w-sm text-sm leading-6 text-zinc-300">
                    Shorten approvals and reduce physical sampling by moving more decisions into
                    a digitally connected workflow.
                  </p>
                  <p className="font-heading text-4xl font-semibold text-white">-35%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <p className="font-heading text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Core solutions"
          title="Designed for apparel teams that need speed, precision, and cleaner production flow."
          description="The original site talks about digital design, quality output, and cutting efficiency. This redesign reframes those same strengths into a more premium, modern product story."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {solutions.map((solution) => (
            <article
              key={solution.title}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#ed1c24]/30 hover:bg-white/[0.06]"
            >
              <div className="inline-flex rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
                Solution
              </div>
              <h3 className="mt-6 font-heading text-2xl font-semibold text-white">
                {solution.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{solution.description}</p>
              <ul className="mt-8 space-y-3 text-sm text-zinc-300">
                {solution.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#ed1c24]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <SectionHeading
            eyebrow="Connected workflow"
            title="A modern production journey that feels coordinated from the very first design file."
            description="Instead of a generic corporate page, this section gives the brand a product-led narrative. It shows how Tradex helps teams move from creative concept to physical output with less friction."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6"
              >
                <p className="text-sm font-semibold tracking-[0.24em] text-[#ed1c24]/80">
                  {item.step}
                </p>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-10">
            <SectionHeading
              eyebrow="About Tradex"
              title="Built for businesses ready to modernize how apparel products are designed and produced."
              description="Tradex Solution combines technology expertise with apparel-industry understanding. The goal is not just software adoption, but a measurable upgrade in speed, fit confidence, communication, and production quality."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {differentiators.map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm leading-7 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#ed1c24]/12 via-white/[0.04] to-white/[0.03] p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#ed1c24]/80">Vision</p>
              <h3 className="mt-4 font-heading text-3xl font-semibold text-white">
                Technology that helps apparel businesses lead instead of react.
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                The brand message from the current site becomes more confident here: reduce manual
                drag, enable better collaboration, and create the conditions for higher-quality
                output at pace.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Services</p>
              <div className="mt-6 grid gap-3">
                {services.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-300"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-10">
            <SectionHeading
              eyebrow="Contact"
              title="Let's design a faster, more intelligent production pipeline."
              description="This keeps the company's real contact information but presents it in a more polished, conversion-friendly layout."
            />

            <div className="mt-10 space-y-5">
              {contactDetails.map((item) => (
                <div key={item.label} className="border-b border-white/10 pb-5 last:border-b-0">
                  <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Get in touch</p>
                <h3 className="mt-3 font-heading text-3xl font-semibold text-white">
                  Tell us what you need to improve.
                </h3>
              </div>
              <div className="hidden rounded-full border border-[#ed1c24]/30 bg-[#ed1c24]/10 px-3 py-1 text-xs font-medium text-red-200 md:block">
                Reply in 24-48 hours
              </div>
            </div>

            <form className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-zinc-300">
                  Name
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ed1c24]/40"
                  />
                </label>
                <label className="grid gap-2 text-sm text-zinc-300">
                  Email
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ed1c24]/40"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-zinc-300">
                Company
                <input
                  type="text"
                  placeholder="Company or brand"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ed1c24]/40"
                />
              </label>

              <label className="grid gap-2 text-sm text-zinc-300">
                Project brief
                <textarea
                  rows={5}
                  placeholder="What are you trying to improve across design, fit, development, or production?"
                  className="rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ed1c24]/40"
                />
              </label>

              <button
                type="button"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Send inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Tradex Solution redesign concept built with Next.js and Tailwind CSS.</p>
          <p>Copyright (c) 2026 Tradex Solution. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
