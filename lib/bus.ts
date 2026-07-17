/** Tiny typed event bus over window CustomEvents for cross-component signals. */

export type BusEvent =
  | "open-palette"
  | "toast"
  | "toggle-recruiter"
  | "replay-boot"
  | "hero-conversion";

export function emit(event: BusEvent, detail?: unknown): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(`pm:${event}`, { detail }));
}

export function on(event: BusEvent, handler: (detail: unknown) => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const listener = (e: Event) => handler((e as CustomEvent).detail);
  window.addEventListener(`pm:${event}`, listener);
  return () => window.removeEventListener(`pm:${event}`, listener);
}

export function toast(message: string): void {
  emit("toast", message);
}
