import ControlButton from "../../ControlButton";
import { useChallengeDate } from "../../../../../context/ChosenDate/ChallengeDateContext";
import getPositionMapFromPieces from "../../../../../puzzle/game/getPositionMapFromPieces";
import { Actions } from "../../../../../context/Game/types";
import useGameState from "../../../../../context/Game/state";
import useGameDispatch from "../../../../../context/Game/dispatch";
import buildSolution from "../../../../../puzzle/solution/buildSolution/buildSolution";

const ShowSolutionButton = () => {
  const { checkIsChallengeValue, dayName, dayNumber, month } =
    useChallengeDate();

  const { gamePieces } = useGameState();

  const dispatch = useGameDispatch();

  return (
    <>
      <ControlButton
        text="Show Solution"
        onClick={async () => {
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
          dispatch({
            type: Actions.PLACE_PIECES,
            payload: {
              positionMap: getPositionMapFromPieces(solution?.pieces || []),
            },
          });
        }}
      />
    </>
  );
};

export default ShowSolutionButton;
