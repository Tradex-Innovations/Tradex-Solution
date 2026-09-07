"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useInterfaceSound } from "@/components/home/useInterfaceSound";
import "./thread-intro.css";

const sessionKey = "tradex-thread-intro-seen";
const drawingDuration = 1100;
const fadeDuration = 240;

/** A short brand introduction. Page rendering proceeds behind it. */
export default function ThreadIntro({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<
    "checking" | "playing" | "leaving" | "done"
  >("checking");
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const soundPlayed = useRef(false);
  const { play } = useInterfaceSound();
  const visible = phase === "playing" || phase === "leaving";
  const finish = useCallback(
    () => setPhase((current) => (current === "playing" ? "leaving" : current)),
    [],
  );

  useEffect(() => {
    // Do not interrupt deep links, browser history restoration, or reduced-motion users.
    let seen = false;
    try {
      seen = sessionStorage.getItem(sessionKey) === "yes";
    } catch {
      /* Storage is optional. */
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setPhase(
      seen || reduced || Boolean(window.location.hash) || window.scrollY > 0
        ? "done"
        : "playing",
    );
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    try {
      sessionStorage.setItem(sessionKey, "yes");
    } catch {
      /* Still runs once per mounted app. */
    }
    soundPlayed.current = play("fabric", { allowResume: false });
    const timer = window.setTimeout(finish, drawingDuration);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
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
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onPreference);
    };
  }, [phase, finish, play]);

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
      // Remove inert before moving keyboard focus to the revealed content.
      if (contentRef.current) contentRef.current.inert = false;
      if (focusInside) contentRef.current?.focus({ preventScroll: true });
      setPhase("done");
    }, fadeDuration);
    return () => clearTimeout(timer);
  }, [phase]);

  const playOnGesture = () => {
    if (phase === "playing" && !soundPlayed.current)
      soundPlayed.current = play("fabric");
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
          aria-label="Tradex introduction"
          onPointerDown={playOnGesture}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") playOnGesture();
            if (event.key === "Tab") {
              event.preventDefault();
              skipRef.current?.focus();
            }
          }}
        >
          <div className="tx-thread-topline">
            <span>TRADEX / A CONNECTING THREAD</span>
            <span>IDEAS INTO POSSIBILITY</span>
          </div>
          <svg
            className="tx-thread-canvas"
            viewBox="0 0 1200 600"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
          >
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
          <div className="tx-thread-caption">
            <span className="tx-thread-point" aria-hidden="true" />
            <p>
              Good things start
              <br />
              with a <span>thread.</span>
            </p>
          </div>
          <div className="tx-thread-bottomline">
            <span>INDEPENDENT MINDS. CONNECTED POSSIBILITIES.</span>
            <button ref={skipRef} onClick={finish}>
              Skip intro <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
