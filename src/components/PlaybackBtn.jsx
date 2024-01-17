import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import { statePlayback } from "../states";
import "../styles/btn.css";

function PlaybackBtn({ autoPlayInterval, children }) {
  const pToggle = useStore(statePlayback);
  const setToggle = () => {
    statePlayback.set(!pToggle);
  };
  const interval = autoPlayInterval;

  const [cycle, setCycle] = useState(true);

  useEffect(() => {
    if (pToggle) {
      const timer = setInterval(() => {
        setCycle(prevCycle => !prevCycle);
      }, interval * 1000);

      return () => clearInterval(timer);
    }
  }, [pToggle]);

  const btnvariants = {
    i: {
      pathLength: 0,
      rotate: 0,
    },
    a: {
      rotate: 0,
      originX: "50%",
      originY: "50%",
      pathLength: 1,
      transition: {
        pathLength: {
          repeat: Infinity,
          duration: interval,
        },
        rotate: {
          duration: 0.000001,
        },
      },
    },
    d: {
      rotate: 360,
      pathLength: 0,
      transition: {
        duration: interval,
      },
    },
  };

  return (
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
      <svg className={`circle_path ${!pToggle ? "hide" : ""}`}>
        <motion.path
          d="M 1, 24
        a 10,10 0 1,1 46,0
        a 10,10 0 1,1 -46,0"
          fill="none"
          strokeWidth="2"
          stroke="var(--cgrey)"
          strokeLinecap="round"
          // animate={pToggle ? "a" : ""}
          animate={pToggle ? (cycle ? "a" : "d") : "i"}
          initial="i"
          variants={btnvariants}
        />
      </svg>
      {!pToggle ? (
        <span className="material-symbols-rounded"> play_arrow</span>
      ) : (
        <span className="material-symbols-rounded"> pause</span>
      )}
    </motion.button>
  );
}

export default PlaybackBtn;
/* <motion.circle
          cx="24"
          cy="24"
          r="23"
          fill="none"
          strokeWidth="2"
          // stroke="var(--cgrey)"
          stroke="red"
          strokeLinecap="round"
          animate={pToggle ? "a" : ""}
          initial="i"
          variants={btnvariants}
        /> */
