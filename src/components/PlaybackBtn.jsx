import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import { statePlayback, slideshowAutoPlayInterval } from "../states";
import "../styles/btn.css";

function PlaybackBtn({ children }) {
  const pToggle = useStore(statePlayback);
  const setToggle = () => {
    statePlayback.set(!pToggle);
  };

  const interval = useStore(slideshowAutoPlayInterval);

  const btnvariants = {
    loop: Infinity,
    ease: "linear",
    duration: interval,
  };

  /* i: {
      pathLength: 0,
    },
    a: {
      pathLength: 1,
    },
    e: {},
    h: {
    },
    t: {}

  } */

  return (
    // console.log(children.props.value),
    // {`${pToggle ? 'an' : 'aus'}`}
    <motion.button
      style={""}
      animate={{ rotate: 0 }}
      transition={btnvariants}
      variants={btnvariants}
      initial="i"
      exit="e"
      whileHover="h"
      onClick={setToggle}
      className="btn btn_play"
      title={children.props.value}
    >
      {!pToggle ? (
        <span className="material-symbols-rounded"> play_arrow</span>
      ) : (
        <span className="material-symbols-rounded"> pause</span>
      )}
    </motion.button>
  );
}

export default PlaybackBtn;

/* <svg className="btn_svg">

      <use className="btn_use" href={!pToggle ? "/svg.svg#play" : "/svg.svg#pause"}/>
    </svg> */
