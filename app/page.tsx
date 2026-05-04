import EnergyOrb from "../components/EnergyOrb";
import FabricMesh from "../components/FabricMesh";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.14),_transparent_26%),linear-gradient(135deg,_#030303_0%,_#09090b_55%,_#040404_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-grid bg-[size:72px_72px] opacity-[0.06]" />

      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <a
          href="/tradex-solution"
          className="group relative isolate flex min-h-[50vh] items-end overflow-hidden border-b border-white/10 px-6 py-10 transition duration-500 hover:bg-[#ed1c24]/10 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-10 lg:py-12"
        >
          <FabricMesh />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(237,28,36,0.2),_transparent_35%)] opacity-70 transition duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/80" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(237,28,36,0.16),transparent_40%,rgba(0,0,0,0.5))]" />
          <div className="relative z-10 w-full max-w-[40rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-400/85">
              Tradex Solution
            </p>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-[0.94] tracking-tight text-white sm:text-5xl lg:min-h-[5.1em] lg:text-6xl">
              Digital apparel systems and production-focused technology.
            </h1>
            <p className="mt-5 max-w-[36rem] text-base leading-8 text-zinc-300 sm:text-lg">
              Enter the full Tradex Solution experience for design workflows, cutting systems, and
              implementation-led business transformation.
            </p>
          </div>
        </a>

        <a
          href="/tradex-innovation"
          className="group relative isolate flex min-h-[50vh] items-end overflow-hidden px-6 py-10 transition duration-500 hover:bg-pink-400/10 lg:min-h-screen lg:px-10 lg:py-12"
        >
          <EnergyOrb />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,114,182,0.18),_transparent_35%)] opacity-70 transition duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/80" />
          <div className="absolute inset-0 bg-[linear-gradient(225deg,rgba(244,114,182,0.1),transparent_38%,rgba(0,0,0,0.48))]" />
          <div className="relative z-10 w-full max-w-[40rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-pink-300/85">
              Tradex Innovation
            </p>
            <h2 className="mt-5 font-heading text-4xl font-semibold leading-[0.94] tracking-tight text-white sm:text-5xl lg:min-h-[5.1em] lg:text-6xl">
              A separate gateway for future products, ideas, and experimental ventures.
            </h2>
            <p className="mt-5 max-w-[36rem] text-base leading-8 text-zinc-300 sm:text-lg">
              Open the new empty Innovation area as a dedicated space for a second brand direction
              with its own identity and upcoming content.
            </p>
          </div>
        </a>
      </section>
    </main>
  );
}
