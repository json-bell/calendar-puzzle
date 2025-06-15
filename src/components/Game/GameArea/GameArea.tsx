import BoardGrid from "../BoardGrid/BoardGrid";
import styles from "./GameArea.module.css";
import GameProvider from "../../../context/Game/GameProvider";
import GameControls from "../../UI/GameControls/GameControls";
import PieceList from "../../UI/PieceList/PieceList";
import cx from "../../../utils/concatClassNames/concatClassNames";
import { useViewport } from "../../../utils/useWindowSize/windowSizeContext";
import { ChallengeDateProvider } from "../../../context/ChosenDate/ChosenDateProvider";
import Toaster from "../../UI/Toaster/Toaster";
import ToasterProvider from "../../../context/ToasterProvider/ToasterProvider";

const GameArea = () => {
  const viewport = useViewport();

  const layoutStyle = styles[`${viewport}Layout`];

  return (
    <ChallengeDateProvider>
      <GameProvider>
        <ToasterProvider>
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
            <Toaster />
          </section>
        </ToasterProvider>
      </GameProvider>
    </ChallengeDateProvider>
  );
};

export default GameArea;
