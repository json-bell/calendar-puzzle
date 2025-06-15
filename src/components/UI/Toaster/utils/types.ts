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

  eaten?: boolean; // if true, should remove/not display Toast
  pendingLifecycles?: InstanceType<typeof ToastLifecycle>[];
  hoverPauses?: boolean;
};
export type ToastList = { [k in string]?: ToastInfo };
export type ToasterQueue = {
  toasts: ToastList;
  updateToast: (id: string, updates: Partial<Omit<ToastInfo, "id">>) => void;
  fadeToast: (id: string, options?: EatToastOptions) => void;
};

export type EatToastOptions = {
  fadeMs?: number;
  ease?: Easing;
};
export type ToastControls = {
  set: (updates: Partial<Omit<ToastInfo, "id">>) => void;

  // We have a few closing options:
  fade: (options?: EatToastOptions) => void; // auto-fade from timer expiring, cancellable
  close: (options?: EatToastOptions) => void; // fade then close, uncancellable (called by user so should close)
  forceClose: (options?: Omit<EatToastOptions, "fadeMs">) => void; // instantly closes the Toast

  get: () => ToastInfo | undefined;
};
