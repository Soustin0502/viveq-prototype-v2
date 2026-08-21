import { useEffect, useState } from "react";

/**
 * Session-persisted state for the simulated interaction, so screens stay
 * consistent when navigating between Warning / Report / Details.
 */
export type CallStage = "active" | "ended";

const KEY = "viveq.call-stage";
const SHARED_KEY = "viveq.incident-shared";
const listeners = new Set<() => void>();

function read(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* session storage unavailable */
  }
  listeners.forEach((l) => l());
}

export function setCallStage(stage: CallStage) {
  write(KEY, stage);
}

export function setIncidentShared(shared: boolean) {
  write(SHARED_KEY, shared ? "1" : "0");
}

export function resetSimulation() {
  write(KEY, "active");
  write(SHARED_KEY, "0");
}

function useSessionFlag<T>(parse: () => T, initial: T): T {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const sync = () => setValue(parse());
    sync();
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
}

/** Current stage of the simulated call. "active" during SSR/first paint. */
export function useCallStage(): CallStage {
  return useSessionFlag<CallStage>(() => (read(KEY) === "ended" ? "ended" : "active"), "active");
}

/** Whether the simulated incident has already been shared this session. */
export function useIncidentShared(): boolean {
  return useSessionFlag<boolean>(() => read(SHARED_KEY) === "1", false);
}
