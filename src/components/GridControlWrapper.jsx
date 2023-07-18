import GridControls from '../components/GridControls';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from "@nanostores/react";
import { stateFilter } from '../states';

import { CURRENTYEAR } from '../consts';
import '../styles/grid_controls.css'
import '../styles/btn.css'

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
      duration: .2,
      type: "spring",
      damping: 25,
      stiffness: 400,
    },
  },
}

function GridControlWrapper (props){

  const tFilter = useStore(stateFilter);

  const handleToggle = () => {
    stateFilter.set(!tFilter);
  }

  console.log("BTN FILTER", tFilter, props.btnname)

  if(!tFilter){
  return(

    <div
    className="control_wrapper nobg">

    <section
    className="controls"
    aria-label="Image Grid Controls"
    >

    <div className="line select_line filter_toggle_btn">

    <button
      onClick={handleToggle}
      className="btn filter_toggle_btn"
      title={props.btnname}
      >
    <svg className="btn_svg">
      <use className="btn_use" href="/svg.svg#filter"/>
    </svg>

    </button>
    </div>
    </section>
    </div>

  )
  } else {
  return(
    <AnimatePresence>
    <motion.div
    className="control_wrapper"
      onClick={handleToggle}
    variants={slideUp}
    key={tFilter}
    initial="i"
    animate="a"
    exit="e"
    >
      <GridControls
      defaultCat="all"
      defaultTag="all"
      defaultYear1={1990}
      defaultYear2={CURRENTYEAR}
      defaultSize1={0}
      defaultSize2={7000}
      />
    </motion.div>
    </AnimatePresence>
  )
  };
}

export default GridControlWrapper
