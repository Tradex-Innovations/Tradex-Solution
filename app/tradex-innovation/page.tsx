"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { NebulaBackground } from "@/components/NebulaBackground";
import { CinematicSection, CinematicStagger, CinematicStaggerItem, FloatingElement, CameraDrift } from "@/components/CinematicSection";
import { GlassMonolith } from "@/components/GlassMonolith";
import { CinematicHero, MonumentalText } from "@/components/CinematicHero";

const solutions = [
  {
    title: "AI & Machine Learning",
    description: "Integrate cutting-edge AI solutions to automate processes, enhance decision-making, and unlock insights from your data.",
    points: ["Custom AI model development", "Natural language processing", "Computer vision & image recognition", "Predictive analytics & forecasting"],
  },
  {
    title: "Mobile App Development",
    description: "Build native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
    points: ["Native iOS & Android apps", "React Native & Flutter", "Progressive Web Apps (PWA)", "App Store optimization & deployment"],
  },
  {
    title: "Digital Planning Systems",
    description: "Build intelligent digital planning and scheduling systems that optimize workflows, resources, and operations in real-time.",
    points: ["Resource allocation & scheduling", "Workflow automation", "Real-time collaboration tools", "Custom dashboard & reporting"],
  },
  {
    title: "Web Application Development",
    description: "Create powerful, responsive web applications using modern frameworks and best practices for performance and scalability.",
    points: ["React, Next.js & Vue.js", "Node.js & Python backends", "Real-time applications", "Responsive & accessible design"],
  },
  {
    title: "Inventory & Asset Management",
    description: "Streamline operations with intelligent inventory tracking, asset management, and automated workflow systems.",
    points: ["Real-time inventory tracking", "Barcode & RFID integration", "Automated reordering systems", "Multi-location management"],
  },
  {
    title: "Enterprise Solutions",
    description: "Build robust enterprise systems that streamline operations, improve efficiency, and scale with your business growth.",
    points: ["ERP & CRM systems", "Business process automation", "Legacy system modernization", "Enterprise API integration"],
  },
];

const services = [
  "AI Integration & Machine Learning",
  "Mobile App Development",
  "Digital Planning & Scheduling Systems",
  "Web Application Development",
  "API Development & Integration",
  "UI/UX Design & Prototyping",
  "Database Design & Optimization",
  "Business Intelligence & Reporting",
  "Inventory Management Systems",
  "Real-time Tracking Solutions",
  "Data Analytics & Visualization",
  "Microservices Architecture",
];

const differentiators = [
  "Deep technical expertise across modern software stacks and architectures.",
  "Tailored solutions that align with your business goals and constraints.",
  "Modern development practices that improve quality, speed, and maintainability.",
  "Hands-on support for teams adopting new systems and workflows.",
];

const navItems = [
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const contactDetails = [
  { label: "Address", value: "16/1 Maligawa Road, Ethul Kotte, Kotte, Sri Lanka" },
  { label: "Email", value: "info@tradexinnovation.com" },
  { label: "Phone", value: "+94 77 874 5847" },
  { label: "Hours", value: "Monday - Friday: 8 AM to 5 PM | Saturday: 8 AM to 12 PM" },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-6">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400/70"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
        className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
      >
        {title.split(" ").map((word, i) => {
          const highlights = ["innovative", "scalable", "modern", "intelligent", "performance", "systems"];
          const isHighlight = highlights.some(h => word.toLowerCase().includes(h));
          return (
            <span key={i}>
              {isHighlight ? <span className="text-cyan-400">{word}</span> : word}{" "}
            </span>
          );
        })}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg leading-8 text-zinc-400"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export default function TradexInnovationPage() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.3, 1]);

  return (
    <main className="relative isolate overflow-hidden bg-[#000308]">
      {/* 3D Immersive Photorealistic Nebula Background */}
      <NebulaBackground />

      {/* Cinematic header with glass morphism */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="sticky top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-2xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              <img
                src="/Gemini_Generated_Image_v1z8tzv1z8tzv1z8-removebg-preview.png"
                alt="Tradex Innovation"
                className="h-11 w-auto sm:h-12"
              />
            </motion.div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.05, color: "#67e8f9" }}
                transition={{ duration: 0.2 }}
                className="text-sm text-zinc-400 transition"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl transition"
          >
            Start a Project
          </motion.a>
        </div>
      </motion.header>

      {/* HERO SECTION - Monumental cinematic opening */}
      <CinematicHero className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-32 lg:px-8">
        <CameraDrift>
          <div className="max-w-5xl space-y-10">
              <FloatingElement intensity="subtle">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-xs uppercase tracking-[0.3em] text-cyan-300/80 backdrop-blur-xl"
                >
                  Building innovative systems
                </motion.div>
              </FloatingElement>

              <div className="space-y-8">
                <MonumentalText className="max-w-4xl font-heading text-6xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Innovative systems
                  </span>{" "}
                  and digital products built for real-world performance.
                </MonumentalText>
                
                <motion.p
                  initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl text-xl leading-9 text-zinc-400"
                >
                  We design and develop scalable systems, platforms, and automation tools that help businesses operate smarter.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <motion.a
                  href="#solutions"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(34, 211, 238, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] transition"
                >
                  Explore Solutions
                </motion.a>
                <motion.a
                  href="#about"
                  whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition"
                >
                  Why Tradex
                </motion.a>
              </motion.div>
            </div>
        </CameraDrift>
      </CinematicHero>

      {/* SOLUTIONS SECTION */}
      <section id="solutions" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <CinematicSection>
          <SectionHeading
            eyebrow="Core solutions"
            title="Built to power modern digital operations with scalable and intelligent systems"
          />
        </CinematicSection>

        <CinematicStagger className="mt-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-3" staggerDelay={0.2}>
          {solutions.map((solution, index) => (
            <CinematicStaggerItem key={solution.title}>
              <GlassMonolith 
                variant="premium" 
                glowColor={
                  index === 0 ? "blue" : 
                  index === 1 ? "cyan" : 
                  index === 2 ? "indigo" :
                  index === 3 ? "blue" :
                  index === 4 ? "cyan" : "indigo"
                }
              >
                <FloatingElement intensity="subtle">
                  <div className="space-y-6">
                    <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-400/80 backdrop-blur-sm">
                      Solution
                    </div>
                    <h3 className="font-heading text-3xl font-semibold text-white">
                      {solution.title}
                    </h3>
                    <p className="text-base leading-7 text-zinc-400">{solution.description}</p>
                    <ul className="space-y-4 pt-4 text-sm text-zinc-300">
                      {solution.points.map((point) => (
                        <motion.li 
                          key={point} 
                          className="flex items-start gap-3"
                          whileHover={{ x: 4 }}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </FloatingElement>
              </GlassMonolith>
            </CinematicStaggerItem>
          ))}
        </CinematicStagger>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <CinematicSection>
            <GlassMonolith variant="premium" glowColor="indigo">
              <SectionHeading
                eyebrow="About Tradex"
                title="Built to deliver scalable high-performance systems for modern businesses"
                description="Tradex Innovation combines technical expertise with business understanding. The goal is not just software delivery, but a measurable upgrade in speed, reliability, and operational efficiency."
              />

              <CinematicStagger className="mt-12 grid gap-4 md:grid-cols-2" staggerDelay={0.1}>
                {differentiators.map((item) => (
                  <CinematicStaggerItem key={item}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-500"
                    >
                      <p className="text-sm leading-7 text-zinc-300">{item}</p>
                    </motion.div>
                  </CinematicStaggerItem>
                ))}
              </CinematicStagger>
            </GlassMonolith>
          </CinematicSection>

          <CinematicSection delay={0.3}>
            <div className="space-y-6">
              <GlassMonolith variant="premium" glowColor="cyan">
                <FloatingElement intensity="medium">
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">Vision</p>
                    <h3 className="font-heading text-3xl font-semibold text-white">
                      Technology that helps businesses{" "}
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        innovate
                      </span>{" "}
                      and scale.
                    </h3>
                    <p className="text-sm leading-7 text-zinc-300">
                      Reduce technical debt, enable better collaboration, and create the conditions for sustainable growth.
                    </p>
                  </div>
                </FloatingElement>
              </GlassMonolith>

              <GlassMonolith variant="default" glowColor="blue">
                <div className="space-y-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Services</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((service, index) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        whileHover={{ x: 6, backgroundColor: "rgba(0,0,0,0.5)" }}
                        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-zinc-300 backdrop-blur-sm transition-all duration-300"
                      >
                        {service}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassMonolith>
            </div>
          </CinematicSection>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <CinematicSection>
            <GlassMonolith variant="premium" glowColor="cyan">
              <SectionHeading
                eyebrow="Contact"
                title="Let's build a faster more intelligent system together"
              />

              <div className="mt-12 space-y-6">
                {contactDetails.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="border-b border-white/10 pb-6 last:border-b-0"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">{item.label}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </GlassMonolith>
          </CinematicSection>

          <CinematicSection delay={0.3}>
            <GlassMonolith variant="premium" glowColor="blue">
              <div className="space-y-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Get in touch</p>
                    <h3 className="mt-3 font-heading text-3xl font-semibold text-white">
                      Tell us what you need to{" "}
                      <span className="text-cyan-400">build</span>.
                    </h3>
                  </div>
                  <div className="hidden rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200 md:block">
                    Reply in 24-48h
                  </div>
                </div>

                <form className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-3 text-sm text-zinc-300">
                      Name
                      <input
                        type="text"
                        placeholder="Your name"
                        className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 text-white outline-none backdrop-blur-sm transition placeholder:text-zinc-600 focus:border-cyan-500/40 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                      />
                    </label>
                    <label className="grid gap-3 text-sm text-zinc-300">
                      Email
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 text-white outline-none backdrop-blur-sm transition placeholder:text-zinc-600 focus:border-cyan-500/40 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                      />
                    </label>
                  </div>

                  <label className="grid gap-3 text-sm text-zinc-300">
                    Company
                    <input
                      type="text"
                      placeholder="Company or brand"
                      className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 text-white outline-none backdrop-blur-sm transition placeholder:text-zinc-600 focus:border-cyan-500/40 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    />
                  </label>

                  <label className="grid gap-3 text-sm text-zinc-300">
                    Project brief
                    <textarea
                      rows={5}
                      placeholder="What system or product are you looking to build or improve?"
                      className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 text-white outline-none backdrop-blur-sm transition placeholder:text-zinc-600 focus:border-cyan-500/40 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    />
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-100"
                  >
                    Send inquiry
                  </motion.button>
                </form>
              </div>
            </GlassMonolith>
          </CinematicSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-12 text-sm text-zinc-600 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Developed by Tradex Innovation Team</p>
          <p>Copyright (c) 2026 Tradex Innovation. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
