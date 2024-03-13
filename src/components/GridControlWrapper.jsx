import React, { useEffect } from "react";
import GridFilter from "../components/GridFilter";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import {
  stateFilter,
  stateCurrentProjs,
  handleToggleFilter,
  stateSelectedCat,
} from "../states";

import { CURRENTYEAR } from "../consts";
import "../styles/grid_controls.css";
import "../styles/btn.css";

import { getCollection } from "astro:content";

const slideUp = {
  i: {
    y: "100vh",
    opacity: 0,
  },
  a: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 400,
    },
  },
  e: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 25,
      stiffness: 400,
    },
  },
};

function GridControlWrapper(props) {
  const allProjects = props.projects;

  /* console.log( "WRAPPER allProjects" , allProjects.map((proj,i) => (
    {
      id: proj.id,
      index: i
    }
  ))); */

  useEffect(() => {
    const handleKeyDown = event => {
      switch (event.key) {
        case "f":
          handleToggleFilter();
          break;
        case "Escape":
          handleClose();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
  const tFilter = useStore(stateFilter);
  const currentProjs = useStore(stateCurrentProjs);

  const handleClose = () => {
    stateFilter.set(false);
  };

  // console.log("hallo", currentProjs )

  const defaultCat = props.defaultCat;
  const defaultTag = props.defaultTag;
  const defaultYear1 = props.defaultYear1;
  const defaultYear2 = props.defaultYear2;
  const defaultSize1 = props.defaultSize1;
  const defaultSize2 = props.defaultSize2;

  useEffect(() => {
    if (defaultCat !== "all") {
      stateSelectedCat.set(defaultCat);
      // stateCurrentProjs.set()
    }
  }, [defaultCat, currentProjs]);

  const currentProjsLength = currentProjs.length;

  return (
    <section
      className={`controls ${tFilter ? "bgwhite" : ""}`}
      aria-label="Image Grid Controls"
    >
      {!tFilter && (
        <div className="line select_line filter_toggle_btn">
          <button
            onClick={handleToggleFilter}
            className="btn filter_toggle_btn"
            title={props.btnname}
          >
            <svg className="btn_svg">
              <use className="btn_use" href="/svg.svg#filter" />
            </svg>
          </button>
        </div>
      )}

      {tFilter && (
        <motion.div
          className="filter_motiondiv"
          onClick={handleToggleFilter}
          variants={slideUp}
          key={tFilter}
          initial="i"
          animate="a"
          exit="e"
        >
          <GridFilter
            allProjects={allProjects}
            defaultCat={defaultCat}
            defaultTag={defaultTag}
            defaultYear1={defaultYear1}
            defaultYear2={defaultYear2}
            defaultSize1={defaultSize1}
            defaultSize2={defaultSize2}
          />
        </motion.div>
      )}

      <div className="line counter_line">
        <p className="counter_p">
          <span className="counter_number index">
            {`${
              currentProjs
                ? currentProjsLength.toString().padStart(2, "0")
                : "00"
            }`}
          </span>{" "}
          /{" "}
          <span className="counter_number length">
            {allProjects.length > 9
              ? allProjects.length
              : "0" + allProjects.length}
          </span>
        </p>
      </div>
    </section>
  );
}

export default GridControlWrapper;
