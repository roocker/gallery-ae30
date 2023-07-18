import GridFilter from '../components/GridFilter';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from "@nanostores/react";
import { stateFilter, stateCurrentProjs } from '../states';

import { CURRENTYEAR } from '../consts';
import '../styles/grid_controls.css'
import '../styles/btn.css'

import { getCollection } from 'astro:content';
const allProjects = await getCollection('projects');

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
  const currentProjs = useStore(stateCurrentProjs)

  const handleToggle = () => {
    stateFilter.set(!tFilter);
  }

  console.log("BTN FILTER", tFilter, props.btnname)

  return(


    <section
    className={`controls ${tFilter ? 'bgwhite' : ''}`}
    aria-label="Image Grid Controls"
    >

    {!tFilter && (
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
    )}


    {tFilter && (
    <motion.div
    className="motiondiv"
    onClick={handleToggle}
    variants={slideUp}
    key={tFilter}
    initial="i"
    animate="a"
    exit="e"
    >

    <GridFilter
    defaultCat="all"
    defaultTag="all"
    defaultYear1={1980}
    defaultYear2={CURRENTYEAR}
    defaultSize1={0}
    defaultSize2={10000}
    />

    </motion.div>
    )}


    <div className="line counter_line">
    <p className="counter_p">
    <span className="counter_number index">
    {`${currentProjs ? currentProjs.length.toString().padStart(2, '0') : '00'}`}
    </span> / <span className="counter_number length">{allProjects.length}</span>
    </p>
    </div>



    </section>

  )
};

export default GridControlWrapper
