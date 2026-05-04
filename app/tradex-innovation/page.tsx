export default function TradexInnovationPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(127,29,29,0.25),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(237,28,36,0.12),_transparent_30%),linear-gradient(180deg,_#050505_0%,_#09090b_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-grid bg-[size:72px_72px] opacity-[0.07]" />

      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-300/80">
          Tradex Innovation
        </p>
        <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Innovation page coming next.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
          This route is ready as an empty starting point for the Tradex Innovation brand. We can
          design this section separately with its own story, services, and visual identity.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Back to gateway
          </a>
          <a
            href="/tradex-solution"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Open Tradex Solution
          </a>
        </div>
      </div>
    </main>
  );
}

