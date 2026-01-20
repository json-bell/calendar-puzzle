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
import { Solution } from "../../../../../puzzle/solution/buildSolution/types";

type SolutionButtonProps = {
  partialSol?: boolean;
  onComplete?:
    | "placeSolution"
    | "placeSinglePiece"
    | ((solution: Solution | null) => void);
  successText?: string;
  onClickEffect?: () => void;
  style: React.CSSProperties;
};

const SolutionButton = ({
  partialSol = false,
  onComplete = "placeSolution",
  successText = "Found solution and applied it to the board",
  onClickEffect,
  style,
}: SolutionButtonProps) => {
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
    if (attemptRef.current !== solutionId) return;

    if (solution) {
      toast.update({
        contents: (
          <>
            <p style={{ textAlign: "left" }}>SOLVED!</p>
            <p>{successText}</p>
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

      if (onComplete === "placeSolution") {
        dispatch({
          type: Actions.PLACE_PIECES,
          payload: {
            positionMap: getPositionMapFromPieces(solution.pieces),
          },
        });
        return;
      } else if (onComplete === "placeSinglePiece") {
        const placedPieceIds = gamePieces
          .filter(({ position }) => !!position)
          .map(({ piece }) => piece.pieceId);
        const placeablePieces = solution.pieces.filter(({ piece }) => {
          const alreadyPlaced = placedPieceIds.includes(piece.pieceId);
          return !alreadyPlaced;
        });

        if (placeablePieces.length === 0) return;

        dispatch({
          type: Actions.PLACE_PIECES,
          payload: {
            positionMap: getPositionMapFromPieces([placeablePieces[0]]),
          },
        });
        return;
      }
      // typeof onComplete = function
      else {
        onComplete?.(solution);
        return;
      }
    }
    if (!solution) {
      if (typeof onComplete === "function") onComplete(null);

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
    onClickEffect?.();
    await buildAndPlace();
  };

  return (
    <>
      <ControlButton
        text={partialSol ? "Solve (Easy)" : "Solve (Hard)"}
        onClick={onClick}
        style={style}
      />
    </>
  );
};

export default SolutionButton;
