import ControlButton from "../../ControlButton";
import { useChallengeDate } from "../../../../../context/ChosenDate/ChallengeDateContext";
import getPositionMapFromPieces from "../../../../../puzzle/game/getPositionMapFromPieces";
import { Actions } from "../../../../../context/Game/types";
import useGameState from "../../../../../context/Game/state";
import useGameDispatch from "../../../../../context/Game/dispatch";
import buildSolution from "../../../../../puzzle/solution/buildSolution/buildSolution";
import useToast from "../../../Toaster/utils/useToast";
import { newToastDefaults } from "../../../../../context/ToasterProvider/newToastDefaults";
import { createToastLifecycle } from "../../../Toaster/utils/toastLifecycle";
import { useRef } from "react";

type SolutionButtonProps = { partialSol?: boolean };

const ShowSolutionButton = ({ partialSol = false }: SolutionButtonProps) => {
  const toast = useToast("solution");

  const attemptRef = useRef(0);

  const { checkIsChallengeValue, dayName, dayNumber, month } =
    useChallengeDate();
  const { gamePieces } = useGameState();
  const dispatch = useGameDispatch();

  const handleToastDefinition = () => {
    toast.define({
      contents: (
        <>
          Finding a solution...
          <ControlButton onClick={onCancel}>Cancel</ControlButton>
        </>
      ),
      opacity: newToastDefaults.opacity,
      pendingLifecycles: [
        createToastLifecycle({
          updateToast: toast.update,
          visibleTime: "infinity",
        }),
      ],
    });
  };

  const buildAndPlace = async () => {
    const solutionId = attemptRef.current;
    const solution = await buildSolution(
      {
        checkIsChallengeValue,
        dayName,
        dayNumber,
        month,
      },
      {
        gamePieces,
        allowFlipped: partialSol,
        runsAsync: true,
      }
    );

    // early return if we've started a new solution
    console.log({ attemptRef, solutionId });
    if (attemptRef.current !== solutionId) return;

    if (solution) {
      toast.update({
        contents: (
          <>
            <p style={{ textAlign: "left" }}>SOLVED!</p>
            <p>Found solution and applied it to the board</p>
          </>
        ),
        pendingLifecycles: [
          createToastLifecycle({
            updateToast: toast.update,
            visibleTime: 500,
            fadeMs: 3000,
            opacityEase: "ease-in-out",
          }),
        ],
      });
      dispatch({
        type: Actions.PLACE_PIECES,
        payload: {
          positionMap: getPositionMapFromPieces(solution.pieces),
        },
      });
    }
    if (!solution) {
      toast.update({
        contents: (
          <>
            <p style={{ textAlign: "left" }}>UNSOLVABLE :'(</p>
            <p>
              The currently placed pieces can't be expanded to a full solution -
              try removing some pieces :)
            </p>
          </>
        ),
        pendingLifecycles: [
          createToastLifecycle({
            updateToast: toast.update,
            visibleTime: 5000,
          }),
        ],
      });
    }
  };

  const onCancel = () => {
    attemptRef.current++;
    toast.update({
      contents: <>Cancelled Solution</>,
      pendingLifecycles: [
        createToastLifecycle({
          updateToast: toast.update,
          visibleTime: 500,
          fadeMs: 500,
          opacityEase: "ease-in-out",
        }),
      ],
    });
  };

  const onClick = async () => {
    handleToastDefinition();
    await buildAndPlace();
  };

  return (
    <>
      <ControlButton
        text={partialSol ? "Solve (Easy)" : "Solve (Hard)"}
        onClick={onClick}
      />
    </>
  );
};

export default ShowSolutionButton;
