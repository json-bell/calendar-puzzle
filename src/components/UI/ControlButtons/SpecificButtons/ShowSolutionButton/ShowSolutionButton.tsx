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
import { useState } from "react";

const ShowSolutionButton = () => {
  const toast = useToast("solution");

  const [solutionAttempt, setSolutionAttempt] = useState(0);

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
    const solutionId = solutionAttempt;
    const solution = await buildSolution(
      {
        checkIsChallengeValue,
        dayName,
        dayNumber,
        month,
      },
      {
        gamePieces,
        allowFlipped: false,
        runsAsync: true,
      }
    );

    // early return if we've started a new solution
    if (solutionAttempt !== solutionId) return;

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
            visibleTime: 2000,
            fadeMs: 2000,
          }),
        ],
      });
      dispatch({
        type: Actions.PLACE_PIECES,
        payload: {
          positionMap: getPositionMapFromPieces(solution?.pieces || []),
        },
      });
    }
    if (!solution) {
      toast.update({
        contents: (
          <>
            <p style={{ textAlign: "left" }}>UNSOLVABLE :'(</p>
            <p>
              The pieces are placed in a way that cannot be solved, try removing
              some pieces then finding a new solution
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
    toast.close();
    setSolutionAttempt((curr) => curr + 1);
  };

  const onClick = async () => {
    handleToastDefinition();
    await buildAndPlace();
  };

  const { checkIsChallengeValue, dayName, dayNumber, month } =
    useChallengeDate();

  const { gamePieces } = useGameState();

  const dispatch = useGameDispatch();

  return (
    <>
      <ControlButton text="Complete Solution" onClick={onClick} />
    </>
  );
};

export default ShowSolutionButton;
