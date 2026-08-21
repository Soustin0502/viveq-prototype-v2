import { useEffect, useState } from "react";

const KEY = "viveq.reduced-motion";
const listeners = new Set<(v: boolean) => void>();
let current = false;

function apply(v: boolean) {
  current = v;
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("reduce-motion", v);
  }
}

export function setReducedMotion(v: boolean) {
  apply(v);
  try {
    sessionStorage.setItem(KEY, v ? "1" : "0");
  } catch {
    /* session storage unavailable */
  }
  listeners.forEach((l) => l(v));
}

/** Session-persisted reduced-motion preference. Always false during SSR/first paint. */
export function useReducedMotion() {
  const [value, setValue] = useState(false);

  useEffect(() => {
    let stored = current;
    try {
      stored = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (stored !== current) apply(stored);
    setValue(stored);
    listeners.add(setValue);
    return () => {
      listeners.delete(setValue);
    };
  }, []);

  return value;
}
