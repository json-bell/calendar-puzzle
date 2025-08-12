import { useState } from "react";
import Modal from "../../../Modal/Modal";
import ControlButton from "../../ControlButton";

const HowToPlayButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ControlButton text={"Tutorial"} onClick={handleOpen} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Tutorial
        <div
          style={{
            maxWidth: "90vw",
            maxHeight: "60vh",
            overflow: "scroll",
            margin: "20px",
            boxShadow: "0 0 10px 3px black inset",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          The goal is to cover all labels, except for those for the current (or
          currently selected) date.
          <br />
          <br />
          To place a piece:
          <ul>
            <li>First, click on the pieces in the track to select a piece.</li>
            <li>
              Then once selected, click a tile in the grid to place the selected
              cell in that location
            </li>
            <li>
              Clicking a placed piece will spin or flip the piece across that
              square for more detailed arragements
            </li>
            <li>
              If you get stuck, use the "Solve" buttons to help you! This will
              try to complete your current position, so you may need to remove
              pieces before it can be completed
            </li>
          </ul>
        </div>
        <ControlButton text="Close" onClick={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default HowToPlayButton;
