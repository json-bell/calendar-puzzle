import { ToastInfo, VisibleDuration } from "./types";

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));

type ToastResult = null | "eat" | "keep";
type ToastLifecycleFn = (toastParams: {
  stopped: boolean;
}) => Promise<ToastResult>;

export const createToastLifecycle = (options?: {
  visibleTime?: VisibleDuration;
  fadeMs?: number;
  updateToast?: (updates: Partial<ToastInfo>) => void;
}): ToastLifecycle => {
  const { visibleTime = 1000, fadeMs = 1000, updateToast } = options || {};

  if (visibleTime === "infinity") return new ToastLifecycle(async () => "keep");

  return new ToastLifecycle(async ({ stopped }) => {
    await delay(visibleTime);
    if (stopped) return null;
    updateToast?.({ opacity: { value: 0, fadeMs: fadeMs, ease: "linear" } });
    await delay(fadeMs);
    return "eat";
  });
};

export class ToastLifecycle {
  constructor(lifecycleFn: ToastLifecycleFn) {
    this.promise = lifecycleFn({ stopped: this.stopped }).then((result) => {
      if (this.stopped) return null;
      return result;
    });
  }

  private stopped = false;

  stop() {
    this.stopped = true;
  }

  promise: Promise<ToastResult>;
}
