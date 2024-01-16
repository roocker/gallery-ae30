import { useStore } from "@nanostores/react";
import { stateModal, statePlayback } from "../states.jsx";
import "../styles/btn.css";
import React from "react";

function ModalBtn({ children }) {
  const isOpen = useStore(stateModal);
  const toggleModal = () => {
    stateModal.set(!isOpen);
    // console.log('toggleModal is called and "isOpen":',isOpen);
  };

  const pToggle = useStore(statePlayback);
  const togglePlayback = () => {
    statePlayback.set(!pToggle);
  };

  return (
    // console.log(children.props.value),
    <button
      onClick={toggleModal}
      className="btn modal_toggle_btn"
      title={children.props.value}
    >
      {!isOpen ? (
        <span className="material-symbols-rounded"> format_align_left</span>
      ) : (
        <span className="material-symbols-rounded"> close</span>
      )}
    </button>
  );
}

export default ModalBtn;

/* <svg className="btn_svg">
      <use className="btn_use" href="/svg.svg#text"/>
    </svg> */
