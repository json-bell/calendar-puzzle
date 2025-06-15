import { useMemo } from "react";
import { useToasterQueue } from "./useToasterQueue";
import { ToastControls } from "./types";
import ControlButton from "../../ControlButtons/ControlButton";
import { createToastLifecycle, ToastLifecycle } from "./toastLifecycle";

const useToast = (
  id: string,
  options?: { lifeOnUpdate?: InstanceType<typeof ToastLifecycle> | null }
): ToastControls => {
  const { toasts, updateToast, fadeToast } = useToasterQueue();
  const { lifeOnUpdate = createToastLifecycle() } = options || {};

  return useMemo(() => {
    const set: ToastControls["set"] = (updates) => {
      const updateLifeObj = lifeOnUpdate
        ? { pendingLifecycles: [lifeOnUpdate] }
        : null;

      updateToast(id, { ...updateLifeObj, ...updates });
    };

    const fade: ToastControls["fade"] = (eatingOptions) => {
      set({ hoverPauses: true });
      fadeToast(id, { ...eatingOptions });
    };
    const close: ToastControls["close"] = (eatingOptions) => {
      console.log("closing...");
      set({ hoverPauses: false });
      fadeToast(id, { fadeMs: 500, ...eatingOptions });
    };
    const forceClose: ToastControls["forceClose"] = (eatingOptions) => {
      set({ hoverPauses: false });
      fadeToast(id, { fadeMs: 0, ...eatingOptions });
    };

    const get: ToastControls["get"] = () => toasts[id];

    return { set, close, get, fade, forceClose };
  }, [id, updateToast, fadeToast]);
};

export default useToast;

// USAGE EXAMPLES

export const WinButtonTest = () => {
  const buttonToast = useToast("win");

  const onClick = () => {
    buttonToast.set({ contents: <>You won! Congrats!</> });
  };
  return <ControlButton onClick={onClick}>Test Win button</ControlButton>;
};

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
