import React from "react";
import { useStore } from "@nanostores/react";
import {
  stateSlideshow,
  stateSlideshowIndex,
  stateSlideshowZoom,
} from "../states";
import "../styles/btn.css";
import Tooltip from "./Tooltip";

function PlanBtn({ children }) {
  // const [toggle, setToggle] = useStore(stateSlideshow);
  const zToggle = useStore(stateSlideshowZoom);
  const sToggle = useStore(stateSlideshow);
  const setToggle = () => {
    stateSlideshow.set(!sToggle);
    stateSlideshowIndex.set(0);
    stateSlideshowZoom.set(false);
  };

  return (
    // console.log(children.props.value),
    <button
      onClick={setToggle}
      className="btn modal_toggle_btn"
      title={children.props.value}
    >
      <Tooltip dir="top">{children.props.value}</Tooltip>
      {sToggle ? (
        <span className="material-symbols-rounded"> architecture</span>
      ) : (
        <span className="material-symbols-rounded material-nofill">
          photo_library
        </span>
      )}
    </button>
  );
}

export default PlanBtn;

/* <svg className="btn_svg">
      <use className="btn_use" href="/svg.svg#plans"/>
    </svg> */
