import {
  ToastInfo,
  ToastLifecycleFn,
  ToastResult,
  VisibleDuration,
} from "./types";

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));

export const delayInfinite = (): Promise<void> => new Promise(() => {});

export const createToastLifecycle = (options?: {
  visibleTime?: VisibleDuration;
  fadeMs?: number;
  updateToast?: (updates: Partial<ToastInfo>) => void;
}): ToastLifecycle => {
  const { visibleTime = 1000, fadeMs = 1000, updateToast } = options || {};

  if (visibleTime === "infinity") return new ToastLifecycle(async () => "keep");

  return new ToastLifecycle(async ({ checkStopped }) => {
    await delay(visibleTime);
    if (checkStopped()) return null;
    updateToast?.({ opacity: { value: 0, fadeMs: fadeMs, ease: "ease-in" } });
    await delay(fadeMs);
    return "eat";
  });
};

export class ToastLifecycle {
  constructor(lifecycleFn: ToastLifecycleFn) {
    this.promise = lifecycleFn({ checkStopped: this.checkStopped });
  }

  private stopped = false;

  stop = () => {
    this.stopped = true;
  };

  checkStopped = () => this.stopped;

  promise: Promise<ToastResult>;
}

export type ToastLifecycleInstance = InstanceType<typeof ToastLifecycle>;
