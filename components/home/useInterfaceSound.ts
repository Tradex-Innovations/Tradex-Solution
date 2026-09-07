"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Sound = "click" | "fabric" | "transition";
const preferenceKey = "tradex-sound";

export function useInterfaceSound() {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const contextRef = useRef<AudioContext | null>(null);
  const lastPlayed = useRef(0);

  useEffect(() => {
    try {
      enabledRef.current = localStorage.getItem(preferenceKey) !== "off";
      setEnabled(enabledRef.current);
    } catch {
      /* Audio still works when storage is unavailable. */
    }
    const pause = () => {
      if (document.hidden) void contextRef.current?.suspend();
    };
    document.addEventListener("visibilitychange", pause);
    return () => {
      document.removeEventListener("visibilitychange", pause);
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  const play = useCallback(
    (sound: Sound = "click", options: { allowResume?: boolean } = {}) => {
      if (!enabledRef.current || document.hidden || !window.AudioContext)
        return false;
      const now = performance.now();
      if (now - lastPlayed.current < 110) return false;
      try {
        const context = contextRef.current ?? new AudioContext();
        contextRef.current = context;
        // An intro may try an already-permitted context without queuing audio
        // that would unexpectedly start after a later gesture.
        if (context.state === "suspended" && options.allowResume === false)
          return false;
        lastPlayed.current = now;
        const start = () => {
          if (!enabledRef.current || context.state !== "running") return;
          const time = context.currentTime;
          const gain = context.createGain();
          gain.connect(context.destination);
          if (sound === "fabric") {
            const length = Math.floor(context.sampleRate * 0.3);
            const buffer = context.createBuffer(1, length, context.sampleRate);
            const samples = buffer.getChannelData(0);
            for (let i = 0; i < length; i++)
              samples[i] = (Math.random() * 2 - 1) * (1 - i / length);
            const source = context.createBufferSource();
            const filter = context.createBiquadFilter();
            filter.type = "bandpass";
            filter.frequency.value = 1400;
            filter.Q.value = 0.7;
            source.buffer = buffer;
            source.connect(filter);
            filter.connect(gain);
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.045, time + 0.035);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
            source.onended = () => {
              source.disconnect();
              filter.disconnect();
              gain.disconnect();
            };
            source.start();
          } else {
            const oscillator = context.createOscillator();
            const duration = sound === "transition" ? 0.32 : 0.075;
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(
              sound === "transition" ? 220 : 720,
              time,
            );
            oscillator.frequency.exponentialRampToValueAtTime(
              sound === "transition" ? 440 : 400,
              time + duration,
            );
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.035, time + 0.008);
            gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
            oscillator.connect(gain);
            oscillator.onended = () => {
              oscillator.disconnect();
              gain.disconnect();
            };
            oscillator.start(time);
            oscillator.stop(time + duration);
          }
        };
        if (context.state === "suspended")
          void context
            .resume()
            .then(start)
            .catch(() => {});
        else start();
        return true;
      } catch {
        /* Sound is an optional enhancement. */
        return false;
      }
    },
    [],
  );

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    try {
      localStorage.setItem(preferenceKey, next ? "on" : "off");
    } catch {
      /* Optional persistence. */
    }
    if (next) play("transition");
    else void contextRef.current?.suspend();
  }, [play]);

  return { enabled, toggle, play };
}
