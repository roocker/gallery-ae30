import React from "react";
import { useStore } from "@nanostores/react";
import {
  stateSlideshowIndex,
  stateSlideshowDirection,
  slideshow_length,
  stateModal,
} from "../states";
import "../styles/btn.css";

function SlideshowBtn({ dir, children }) {
  const index = useStore(stateSlideshowIndex);
  const direction = useStore(stateSlideshowDirection);
  const numberOFimages = useStore(slideshow_length);
  const modalopen = useStore(stateModal);

  function nextSlide() {
    stateSlideshowDirection.set(1);
    if (index === numberOFimages - 1) {
      stateSlideshowIndex.set(0);
    } else {
      stateSlideshowIndex.set(index + 1);
      if (modalopen) {
        stateModal.set(false);
      }
    }
  }

  function prevSlide() {
    stateSlideshowDirection.set(-1);
    if (index === 0) {
      stateSlideshowIndex.set(numberOFimages - 1);
    } else {
      stateSlideshowIndex.set(index - 1);
      if (modalopen) {
        stateModal.set(false);
      }
    }
  }

  return (
    <button
      onClick={dir === "next" ? nextSlide : prevSlide}
      className="btn modal_toggle_btn"
      title={children.props.value}
    >
      {dir === "next" ? (
        <span class="material-symbols-rounded"> navigate_next</span>
      ) : (
        <span class="material-symbols-rounded"> navigate_before</span>
      )}
    </button>
  );
}

export default SlideshowBtn;
/* <svg className={`btn_svg ${dir === "next" ? 'btn_arrowL' : ''}`} >
      <use className="btn_use" href="/svg.svg#arrowL" />
    </svg> */
