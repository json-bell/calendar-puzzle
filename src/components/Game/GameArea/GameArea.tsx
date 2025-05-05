import BoardGrid from "../BoardGrid/BoardGrid";
import styles from "./GameArea.module.css";
import GameProvider from "../../../context/Game/GameProvider";
import GameControls from "../../UI/GameControls/GameControls";
import PieceList from "../../UI/PieceList/PieceList";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { useViewport } from "../../../utils/useWindowSize/windowSizeContext";
import { ChallengeDateProvider } from "../../../context/ChosenDate/ChosenDateProvider";

const GameArea = () => {
  const viewport = useViewport();

  const layoutStyle = styles[`${viewport}Layout`];

  return (
    <ChallengeDateProvider>
      <GameProvider>
        <section className={cx(styles.gameArea, layoutStyle)}>
          <div className={styles.boardArea}>
            <BoardGrid />
          </div>
          <div className={styles.gameControls}>
            <GameControls />
          </div>
          <div className={styles.piecesContainer}>
            <PieceList />
          </div>
        </section>
      </GameProvider>
    </ChallengeDateProvider>
  );
};

export default GameArea;
