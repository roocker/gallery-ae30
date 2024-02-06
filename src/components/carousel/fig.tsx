import React, { useEffect } from "react";
import { motion } from "framer-motion";

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
  setZoomComplete,
}) {


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
        />
      </a>
    </motion.figure>
  );
}
