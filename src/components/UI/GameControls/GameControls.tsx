import {
  useChallengeDate,
  useChallengeDateDispatch,
} from "../../../context/ChosenDate/ChallengeDateContext";
import useGameDispatch from "../../../context/Game/dispatch";
import useGameState from "../../../context/Game/state";
import { Actions } from "../../../context/Game/types";
import { useViewport } from "../../../utils/useWindowSize/windowSizeContext";
import ControlButton from "../ControlButtons/ControlButton";
import DeletePieceButton from "../ControlButtons/SpecificButtons/DeletePieceButton/DeletePieceButton";
import HowToPlayButton from "../ControlButtons/SpecificButtons/HowToPlayButton/HowToPlayButton";
import ShowSolutionButton from "../ControlButtons/SpecificButtons/ShowSolutionButton/ShowSolutionButton";
import styles from "./GameControls.module.css";

const GameControls: React.FC = () => {
  const viewport = useViewport();
  const { date } = useChallengeDate();
  const { incrementChallengeDate } = useChallengeDateDispatch();
  const { gamePieces } = useGameState();
  const dispatch = useGameDispatch();

  return (
    <div className={styles.gameControlsContainer}>
      <h2 style={{ margin: 0 }}>{viewport} Menu</h2>
      <div>{date.toDateString()}</div>
      <div className={styles.buttonList}>
        <DeletePieceButton />
        {/* <ControlButton text="Choose day" onClick={undefined} inactive /> */}
        <ControlButton
          text="Next day"
          onClick={() => incrementChallengeDate(1)}
        />
        <ControlButton
          text="Previous day"
          onClick={() => incrementChallengeDate(-1)}
        />
        {/* <ControlButton text="Hint" onClick={undefined} inactive /> */}
        <ControlButton
          text="Clear All"
          onClick={() => dispatch({ type: Actions.REMOVE_ALL_PIECES })}
          inactive={gamePieces.filter(({ position }) => position).length === 0}
        />
        <ShowSolutionButton />
        <ShowSolutionButton partialSol={true} />
        <HowToPlayButton />
      </div>
    </div>
  );
};

export default GameControls;
