import { ReactNode } from "react";
import type { ToastLifecycle } from "./toastLifecycle";

export type VisibleDuration = number | "infinity";

export type CubicBezier = [number, number, number, number];
type Easing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | CubicBezier;

export type ToastInfo = {
  id: string;
  contents: ReactNode;
  opacity: {
    value: number;
    fadeMs: number;
    ease: Easing;
  };
  pendingLifecycles: InstanceType<typeof ToastLifecycle>[];

  eaten?: boolean; // if true, should remove/not display Toast
  hoverPauses?: boolean;
};
export type ToastList = { [k in string]?: ToastInfo };
export type ToasterQueue = {
  toasts: ToastList;
  defineToast: (id: string, toastInfo: Omit<ToastInfo, "id">) => void;
  updateToast: (id: string, updates: Partial<Omit<ToastInfo, "id">>) => void;
  fadeToast: (id: string, options?: EatToastOptions) => void;
};

export type EatToastOptions = {
  fadeMs?: number;
  ease?: Easing;
};
export type ToastControls = {
  define: (toast: Omit<ToastInfo, "id">) => void;
  update: (updates: Partial<Omit<ToastInfo, "id">>) => void;

  // We have a few closing options:
  fade: (options?: EatToastOptions) => void; // auto-fade from timer expiring, cancellable
  close: (options?: EatToastOptions) => void; // fade then close, uncancellable (called by user so should close)
  forceClose: (options?: Omit<EatToastOptions, "fadeMs">) => void; // instantly closes the Toast

  get: () => ToastInfo | undefined;
};

export type ToastResult = null | "eat" | "keep";
export type ToastLifecycleFn = (toastParams: {
  stopped: boolean;
}) => Promise<ToastResult>;
