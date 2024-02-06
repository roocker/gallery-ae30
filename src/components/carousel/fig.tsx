import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { init } from "astro/virtual-modules/prefetch.js";
import { stateZoomComplete } from "../../states";
import { useStore } from "@nanostores/react";

export default function Fig({
  index,
  src,
  title,
  onclick,
  classname,
  figstyle,
  figanimate,
  imgstyle,
  imganimate,
  reqIndex,
  datazoom,
  transition,
  layout,
}) {
  const zoomComplete = useStore(stateZoomComplete);
  const setZoomComplete = () => {
    if ( datazoom >= 1 ) {
      stateZoomComplete.set(true);
    } else {
    stateZoomComplete.set(false)
  }

    // console.log("zoomAnimation:", zoomComplete);
  };

  useEffect(() => {
    console.log("zoomAnimation:", zoomComplete);
  }, [zoomComplete])


  return (
    <motion.figure
      layout={layout ? true : false}
      key={index}
      data-zoom={reqIndex === index && datazoom >= 1 ? true : false}
      onLayoutAnimationComplete={setZoomComplete}
      className={classname}
      style={figstyle}
      animate={figanimate}
      transition={transition}
      // exit={{ zIndex: 9999, opacity: 0, border: "3px solid pink" }}
    >
      <a
        onClick={() => {
          onclick(index);
        }}
      >
        <motion.img
          src={src}
          alt={title}
          style={imgstyle}
          exit={imganimate}
          draggable={false}
          // exit={{ objectFit: "cover", border: "3px solid yellow"}}
          // initial={{ objectFit: "cover" }}
          // animate={{ objectFit: "cover" }}
        />
      </a>
      {/*
              rechts unten? ==> Slideshow_alt update

            <figcaption>{alts[i]}</figcaption> */}
    </motion.figure>
  );
}
