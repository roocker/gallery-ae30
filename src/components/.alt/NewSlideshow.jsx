import '../styles/newslideshow.css'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";


const animate_slide = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 600 : -600,
      opacity: 1
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 600 : -600,
      opacity: 1
    };
  }
};


const animation_zoom = {
  i:{
    minHeight: "0vh",
    minWidth: "0vw",
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
  a:{
    minHeight: "100vh", 
    minWidth: "100vw", 
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

function NewSlideshow (props){

  const [zoom, setZoom] = useState(true);
  const setZoomToggle = () => {
    setZoom(!zoom);
    console.log("setzoom:", zoom)
  }

  const images = props.pictures;

  
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
    };
  

  return (
    <>
    <motion.figure

    variants={animation_zoom}
    initial="i"
    animate="a"
    exit="exit"
    >

    <AnimatePresence initial={false} custom={direction}>
    <motion.img
    key={page}
    src={images[imageIndex]}
    custom={direction}
    variants={animate_slide}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 2 }
    }}

    />
    </AnimatePresence>
    </motion.figure>

      <div className="next" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
      <div className="mid" onClick={setZoom}>
        {"Z"}
      </div>
    </>
  )


}
export default NewSlideshow;

