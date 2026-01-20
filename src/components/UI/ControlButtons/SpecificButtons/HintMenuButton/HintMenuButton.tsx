import { useState } from "react";
import Modal from "../../../Modal/Modal";
import ControlButton from "../../ControlButton";
import SolutionButton from "../SolutionButton/SolutionButton";

const HintMenuButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen((curr) => !curr);
  };

  const handleClose = () => setIsModalOpen(false);

  const buttonStyle: React.CSSProperties = {
    fontSize: "2rem",
    width: "100%",
    maxWidth: "100%",
    minHeight: "fit-content",
    // height:""
  };

  const options = [
    {
      text: "Solutions",
      buttons: [
        <SolutionButton onClickEffect={handleClose} style={buttonStyle} />,
        <SolutionButton
          partialSol={true}
          onClickEffect={handleClose}
          style={buttonStyle}
        />,
      ],
    },
    {
      text: "Checks",
      buttons: [
        <SolutionButton
          onClickEffect={handleClose}
          style={buttonStyle}
          onComplete={() => {}}
          successText="Your pieces can be extended to a Hard solution!"
        />,
        <SolutionButton
          partialSol={true}
          onClickEffect={handleClose}
          style={buttonStyle}
          successText="Your pieces can be extended to an Easy solution!"
        />,
      ],
    },
    {
      text: "1 Piece Hint",
      buttons: [
        <SolutionButton
          onClickEffect={handleClose}
          style={buttonStyle}
          onComplete={"placeSinglePiece"}
          successText="Found a Hard solution - placed a piece from that solution!"
        />,
        <SolutionButton
          partialSol={true}
          onClickEffect={handleClose}
          style={buttonStyle}
          onComplete={"placeSinglePiece"}
          successText="Found an Easy solution - placed a piece from that solution!"
        />,
      ],
    },
  ];

  return (
    <>
      <ControlButton text={"Hints & Solutions"} onClick={handleOpen} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{
            maxWidth: "calc(96vw-40px)",
            width: "max-content",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            maxHeight: "90vh",
          }}
        >
          Hints and Solutions
          <br />
          "Easy" allows flipped over tiles, where "Hard" will try to fill the
          grid with only right-side up
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "20px",
              gap: "20px",
              maxHeight: "60vh",
              flexWrap: "wrap",
              overflow: "auto",
            }}
          >
            {options.map(({ text, buttons }) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "400px",
                  minWidth: "250px",
                  width: "100%",
                  backgroundColor: "#121212",
                  gap: "20px",
                  padding: "20px",
                  borderRadius: "20px",
                }}
              >
                {text}: {buttons}
              </div>
            ))}
          </div>
          <ControlButton text="Close" onClick={handleClose} />
        </div>
      </Modal>
    </>
  );
};

export default HintMenuButton;
