import { useMemo } from "react";
import { useToasterQueue } from "./useToasterQueue";
import { ToastControls } from "./types";
// import { ToastLifecycle, ToastLifecycleInstance } from "./toastLifecycle";

// type Options = {
// lifeOnUpdate: InstanceType<typeof ToastLifecycle> | null;
// };

const useToast = (
  id: string
  // options?: {
  //   lifeOnUpdate?: ToastLifecycleInstance | null;
  // }
): ToastControls => {
  const { toasts, updateToast, fadeToast, defineToast } = useToasterQueue();
  // const {}: Options = { ...options };

  const specifiedToast = toasts[id];
  const toastExists = !!specifiedToast;

  return useMemo((): ToastControls => {
    const define: ToastControls["define"] = (toast) => {
      defineToast(id, toast);
    };

    const update: ToastControls["update"] = (updates) => {
      updateToast(id, { ...updates });
    };

    const close: ToastControls["close"] = (eatingOptions) => {
      console.log("closing...");
      update({ hoverPauses: false });
      fadeToast(id, { fadeMs: 500, ...eatingOptions });
    };

    const fade: ToastControls["fade"] = (eatingOptions) => {
      update({ hoverPauses: true });
      fadeToast(id, { ...eatingOptions });
    };

    const forceClose: ToastControls["forceClose"] = (eatingOptions) => {
      update({ hoverPauses: false });
      fadeToast(id, { fadeMs: 0, ...eatingOptions });
    };

    const get: ToastControls["get"] = () => toasts[id];

    return { define, update, get, close, fade, forceClose };
  }, [id, updateToast, fadeToast, toastExists, specifiedToast, defineToast]);
};

export default useToast;

// USAGE EXAMPLES

// export const SolutionButton = () => {
//   const solutionToast = useToast("solution");

//   const onClick = async () => {
//     solutionToast.set({
//       contents: "searching for a solution...",
//       duration: "Infinity",
//     });
//     const sol = await generateSolution(
//       {
//         checkIsChallengeValue: () => false,
//         dayName: "fri",
//         dayNumber: 1,
//         month: "apr",
//       },
//       { gamePieces: [] }
//     );
//     if (sol) {
//       solutionToast.set({ duration: 1000, contents: "Here's the solution" });
//     } else {
//       solutionToast.set({
//         duration: 2000,
//         contents:
//           "Can't find a solution with current pieces and these options: ${options}",
//       });
//     }
//   };

//   return <button onClick={onClick}></button>;
// };
