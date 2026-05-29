"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { CountUpAnimation } from "@/components/CountUpAnimation";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { getAssetPath } from "@/lib/utils";

const stats = [
  { value: "20+", label: "Years across apparel technology, workflow transformation, and implementation.", numericValue: 20 },
  { value: "3D", label: "Design-to-fit workflows that reduce sampling cycles and shorten time to market.", numericValue: null },
  { value: "24-48h", label: "Typical response window for solution discovery, scoping, and support follow-up.", numericValue: null },
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
  { label: "Address", value: "No 24, Baddegana Road, Kotte, Sri Lanka" },
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

/**
 * Hero image with animation
 */
function HeroCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0,
        y: [0, -20, 0]
      } : { 
        opacity: 0, 
        x: 100 
      }}
      transition={{ 
        duration: 1.2, 
        delay: 0.5, 
        ease: [0.21, 0.47, 0.32, 0.98],
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="relative"
    >
      <motion.div
        animate={{
          rotate: [0, 1, 0, -1, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src={getAssetPath("/hero image.png")}
          alt="Tradex Solution Hero"
          width={669}
          height={373}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full object-contain drop-shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

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
        {/* Highlight key phrases with brand color */}
        {title.split(" ").map((word, i) => {
          const highlights = ["speed", "precision", "modern", "coordinated", "modernize", "intelligent"];
          const isHighlight = highlights.some(h => word.toLowerCase().includes(h));
          return (
            <span key={i}>
              {isHighlight ? <span className="text-[#ed1c24]">{word}</span> : word}{" "}
            </span>
          );
        })}
      </h2>
      <p className="text-base leading-7 text-zinc-400 sm:text-lg">{description}</p>
    </div>
  );
}

export default function TradexSolutionPage() {
  return (
    <main className="relative isolate overflow-hidden">
      {/* Static background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(237,28,36,0.2),_transparent_28%),radial-gradient(circle_at_80%_0%,_rgba(127,29,29,0.18),_transparent_24%),linear-gradient(180deg,_#030303_0%,_#09090b_48%,_#030303_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-grid bg-[size:72px_72px] opacity-[0.08]" />
      
      {/* Parallax animated blobs */}
      <ParallaxBackground />

      {/* Signature scanning light effect - subtle premium touch */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute h-full w-[200px] bg-gradient-to-r from-transparent via-[#ed1c24] to-transparent blur-xl animate-scan" />
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur">
              <Image
                src={getAssetPath("/Gemini_Generated_Image_v1z8tzv1z8tzv1z8-removebg-preview.png")}
                alt="Tradex Solution"
                width={786}
                height={317}
                priority
                className="h-11 w-auto sm:h-12"
              />
            </div>
          </Link>

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

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center w-full">
          {/* Hero text with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-zinc-300"
            >
              Partnering for productive solutions
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-4xl font-heading text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                <span className="text-[#ed1c24]">Digital product creation</span> and production systems for a sharper apparel business.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl"
              >
                As the exclusive partner of Sinajet and Optitex, Tradex connects design, fit validation, and intelligent cutting into one modern
                workflow so teams can move faster, waste less, and launch with confidence.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#solutions"
                className="group inline-flex items-center justify-center rounded-full bg-[#ed1c24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff2a33] hover:shadow-glow-hover"
              >
                Explore Solutions
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Why Tradex
              </a>
            </motion.div>
          </motion.div>

          {/* Hero image with animation */}
          <HeroCard />
        </div>

        {/* Stats with stagger animation */}
        <StaggerContainer className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <StaggerItem key={stat.value}>
              <div className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#ed1c24]/30 hover:bg-white/[0.06] hover:shadow-glow-sm">
                <p className="font-heading text-3xl font-semibold text-white">
                  {stat.numericValue ? (
                    <>
                      <CountUpAnimation end={stat.numericValue} duration={2} />+
                    </>
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Partner Brands Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <AnimatedSection>
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 lg:p-12">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ed1c24]/80">
                Powered by industry leaders
              </p>
              <h2 className="mt-4 font-heading text-2xl font-semibold text-white sm:text-3xl">
                Partnering with world-class technology providers
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.a
                href="https://optitex.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:border-[#ed1c24]/30 hover:bg-white/[0.06] hover:shadow-glow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ed1c24]/0 via-[#ed1c24]/0 to-[#ed1c24]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#ed1c24]/5 group-hover:via-transparent group-hover:to-transparent group-hover:opacity-100" />
                
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="rounded-xl bg-white px-6 py-4 shadow-lg">
                      <Image
                        src={getAssetPath("/optitex.png")}
                        alt="Optitex"
                        width={500}
                        height={500}
                        sizes="128px"
                        className="h-16 w-auto transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    <svg
                      className="h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ed1c24]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    Fashion Design Software | 2D/3D CAD CAM
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    Interoperable 2D/3D portfolio with precision patternmaking, functional grading, and seamless collaboration tools across the entire supply chain.
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#ed1c24]" />
                      <span>Perfect fit from great art</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#ed1c24]" />
                      <span>Production-ready digital patterns</span>
                    </li>
                  </ul>
                </div>
              </motion.a>

              <motion.a
                href="https://www.sinajet.net/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:border-[#ed1c24]/30 hover:bg-white/[0.06] hover:shadow-glow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ed1c24]/0 via-[#ed1c24]/0 to-[#ed1c24]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#ed1c24]/5 group-hover:via-transparent group-hover:to-transparent group-hover:opacity-100" />
                
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="rounded-xl bg-white px-6 py-4 shadow-lg">
                      <Image
                        src={getAssetPath("/sinajet.png")}
                        alt="Sinajet"
                        width={500}
                        height={500}
                        sizes="128px"
                        className="h-16 w-auto transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    <svg
                      className="h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ed1c24]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    Digital Cutter Manufacturer
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    Professional intelligent cutting solutions for MTM, small layers, and sample clothing cutting in garment and textile industry with powerful active circular knife technology.
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#ed1c24]" />
                      <span>Precision cutting at 1500mm/s</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#ed1c24]" />
                      <span>Low energy, no overcut technology</span>
                    </li>
                  </ul>
                </div>
              </motion.a>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section id="solutions" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Core solutions"
            title="Designed for apparel teams that need speed, precision, and cleaner production flow."
            description=""
          />
        </AnimatedSection>

        <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-3">
          {solutions.map((solution) => (
            <StaggerItem key={solution.title}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:border-[#ed1c24]/30 hover:bg-white/[0.06] hover:shadow-glow-sm"
              >
                {/* Gradient overlay that fades in on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ed1c24]/0 via-[#ed1c24]/0 to-[#ed1c24]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#ed1c24]/5 group-hover:via-transparent group-hover:to-transparent group-hover:opacity-100" />
                
                <div className="relative">
                  <div className="inline-flex rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400 transition-colors group-hover:border-[#ed1c24]/30 group-hover:text-[#ed1c24]/80">
                    Solution
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-semibold text-white">
                    {solution.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">{solution.description}</p>
                  <ul className="mt-8 space-y-3 text-sm text-zinc-300">
                    {solution.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#ed1c24] transition-transform group-hover:scale-125" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Connected workflow"
              title="A modern production journey that feels coordinated from the very first design file."
              description=""
            />
          </AnimatedSection>

          {/* Workflow pipeline with connecting lines */}
          <div className="relative">
            {/* Connecting line - vertical on mobile, grid on desktop */}
            <div className="absolute left-8 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-[#ed1c24]/40 via-[#ed1c24]/20 to-[#ed1c24]/40 sm:block" />
            
            <StaggerContainer className="relative grid gap-4 sm:grid-cols-2">
              {workflow.map((item, index) => (
                <StaggerItem key={item.step}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-300 hover:border-[#ed1c24]/40 hover:shadow-glow-sm"
                  >
                    {/* Animated gradient border effect on hover */}
                    <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-[#ed1c24]/0 via-[#ed1c24]/0 to-[#ed1c24]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#ed1c24]/10 group-hover:via-transparent group-hover:to-transparent group-hover:opacity-100" />
                    
                    <div className="relative">
                      <motion.p
                        whileHover={{ scale: 1.1 }}
                        className="text-sm font-semibold tracking-[0.24em] text-[#ed1c24]/80 transition-colors group-hover:text-[#ed1c24]"
                      >
                        {item.step}
                      </motion.p>
                      <h3 className="mt-6 font-heading text-2xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
                    </div>

                    {/* Flowing indicator line */}
                    {index < workflow.length - 1 && (
                      <div className="absolute -bottom-2 right-6 h-px w-12 bg-gradient-to-r from-[#ed1c24]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-10"
            >
              <SectionHeading
                eyebrow="About Tradex"
                title="Built for businesses ready to modernize how apparel products are designed and produced."
                description="Tradex Solution combines technology expertise with apparel-industry understanding. The goal is not just software adoption, but a measurable upgrade in speed, fit confidence, communication, and production quality."
              />

              <StaggerContainer className="mt-10 grid gap-4 md:grid-cols-2">
                {differentiators.map((item) => (
                  <StaggerItem key={item}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group rounded-3xl border border-white/10 bg-black/30 p-5 transition-all duration-300 hover:border-[#ed1c24]/20 hover:bg-black/40 hover:shadow-glow-sm"
                    >
                      <p className="text-sm leading-7 text-zinc-300">{item}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#ed1c24]/12 via-white/[0.04] to-white/[0.03] p-8"
              >
                {/* Subtle animated gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ed1c24]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
                
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#ed1c24]/80">Vision</p>
                  <h3 className="mt-4 font-heading text-3xl font-semibold text-white">
                    Technology that helps apparel businesses <span className="text-[#ed1c24]">lead</span> instead of react.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    Reduce manual drag, enable better collaboration, and create the conditions for higher-quality output at pace.
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Services</p>
                <StaggerContainer className="mt-6 grid gap-3">
                  {services.map((service) => (
                    <StaggerItem key={service}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-300 transition-all duration-300 hover:border-[#ed1c24]/20 hover:bg-black/40"
                      >
                        {service}
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-10"
            >
              <SectionHeading
                eyebrow="Contact"
                title="Let's design a faster, more intelligent production pipeline."
                description=""
              />

              <div className="mt-10 space-y-5">
                {contactDetails.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-white/10 pb-5 last:border-b-0"
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">{item.label}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
              className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 lg:p-10"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Get in touch</p>
                  <h3 className="mt-3 font-heading text-3xl font-semibold text-white">
                    Tell us what you need to <span className="text-[#ed1c24]">improve</span>.
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
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ed1c24]/40 focus:shadow-glow-sm"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-zinc-300">
                    Email
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ed1c24]/40 focus:shadow-glow-sm"
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm text-zinc-300">
                  Company
                  <input
                    type="text"
                    placeholder="Company or brand"
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ed1c24]/40 focus:shadow-glow-sm"
                  />
                </label>

                <label className="grid gap-2 text-sm text-zinc-300">
                  Project brief
                  <textarea
                    rows={5}
                    placeholder="What are you trying to improve across design, fit, development, or production?"
                    className="rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ed1c24]/40 focus:shadow-glow-sm"
                  />
                </label>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 hover:shadow-lg"
                >
                  Send inquiry
                </motion.button>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Developed by Tradex Innovation Team</p>
          <p>Copyright (c) 2026 Tradex Solution. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
