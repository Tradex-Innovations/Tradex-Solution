"use client";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useInterfaceSound } from "@/components/home/useInterfaceSound";
import { getAssetPath } from "@/lib/utils";
import "./thread-intro.css";

const drawingDuration = 6000;
const fadeDuration = 600;

/** Replays on a full page load or refresh; persists through client navigation. */
export default function ThreadIntro({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<
    "checking" | "playing" | "leaving" | "done"
  >("checking");
  const [soundBlocked, setSoundBlocked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const soundPlayed = useRef(false);
  const { enabled, play, stop, setSoundEnabled } = useInterfaceSound();
  const visible = phase === "playing" || phase === "leaving";
  const finish = useCallback(
    () => setPhase((current) => (current === "playing" ? "leaving" : current)),
    [],
  );

  useEffect(() => {
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    soundPlayed.current = play("fabric", { allowResume: false, duration: 5.5 });
    setSoundBlocked(!soundPlayed.current);
    const timer = window.setTimeout(
      finish,
      reduced.matches ? 1500 : drawingDuration,
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    const onPreference = () => {
      if (reduced.matches) finish();
    };
    const onVisibility = () => {
      if (document.hidden) finish();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onPreference);
    return () => {
      clearTimeout(timer);
      stop();
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onPreference);
    };
  }, [phase, finish, play, stop]);

  useEffect(() => {
    if (!enabled) soundPlayed.current = false;
  }, [enabled]);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => {
      const focusInside = overlayRef.current?.contains(document.activeElement);
      if (contentRef.current) contentRef.current.inert = false;
      if (focusInside) contentRef.current?.focus({ preventScroll: true });
      setPhase("done");
    }, fadeDuration);
    return () => clearTimeout(timer);
  }, [phase]);

  const startSound = () => {
    if (phase !== "playing" || soundPlayed.current) return;
    soundPlayed.current = play("fabric", { duration: 5.5 });
    setSoundBlocked(!soundPlayed.current);
  };

  return (
    <>
      <div
        ref={contentRef}
        inert={visible}
        tabIndex={-1}
        className="tx-site-content"
      >
        {children}
      </div>
      {visible && (
        <div
          ref={overlayRef}
          className={`tx-thread-intro ${phase === "leaving" ? "is-leaving" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Tradex Solution loading screen"
          onPointerDown={(event) => {
            if (enabled && !(event.target as Element).closest("button"))
              startSound();
          }}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const buttons = overlayRef.current?.querySelectorAll("button");
            if (!buttons?.length) return;
            const first = buttons[0],
              last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }}
        >
          <div className="tx-thread-topline">
            <span>TRADEX SOLUTION</span>
            <span>LOADING</span>
          </div>
          <svg
            className="tx-thread-canvas"
            viewBox="0 0 1200 600"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="tx-intro-logo-ink" colorInterpolationFilters="sRGB">
                <feColorMatrix
                  type="matrix"
                  values="1.15 -1.15 0 0 0  0.10 -0.10 0 0 0  0.16 -0.16 0 0 0  0 0 0 1 0"
                />
              </filter>
            </defs>
            <path
              className="tx-thread-guide"
              d="M-100 380C100 500 220 120 420 240S740 570 790 310 640 80 550 210 770 510 1030 300 1270 80 1390 180"
            />
            <path
              className="tx-thread-shadow"
              pathLength="1"
              d="M-100 380C100 500 220 120 420 240S740 570 790 310 640 80 550 210 770 510 1030 300 1270 80 1390 180"
            />
            <path
              className="tx-thread-line"
              pathLength="1"
              d="M-100 380C100 500 220 120 420 240S740 570 790 310 640 80 550 210 770 510 1030 300 1270 80 1390 180"
            />
          </svg>
          <div className="tx-thread-brand">
            <Image
              src={getAssetPath(
                "/Gemini_Generated_Image_v1z8tzv1z8tzv1z8-removebg-preview.png",
              )}
              alt="Tradex Solution"
              width={786}
              height={317}
              priority
              className="tx-thread-logo"
            />
            <span className="tx-thread-loading" role="status">
              Loading
              <span className="tx-thread-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </span>
          </div>
          <div className="tx-thread-bottomline">
            <button
              className="tx-thread-sound"
              aria-label={
                !enabled
                  ? "Turn loading sound on"
                  : soundBlocked
                    ? "Play loading sound"
                    : "Turn loading sound off"
              }
              aria-pressed={enabled && !soundBlocked}
              onClick={() => {
                if (!enabled) {
                  setSoundEnabled(true);
                  startSound();
                } else if (soundBlocked) startSound();
                else {
                  setSoundEnabled(false);
                  soundPlayed.current = false;
                }
              }}
            >
              <span aria-hidden="true">♫</span>
              {!enabled
                ? "Sound off"
                : soundBlocked
                  ? "Tap for sound"
                  : "Sound on"}
            </button>
            <button ref={skipRef} onClick={finish}>
              Skip loading <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
