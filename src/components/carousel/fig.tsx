import React from "react";
import { motion } from "framer-motion";

export default function Fig({ index, src, title, animation, onclick, classname }) {

  return (
    <figure
      className={classname}

    >
      <a
        onClick={() => {
          onclick(index)
        }}
      >
        <motion.img
          src={src}
          alt={title}
          variants={animation}
          animate="a"
          initial="i"
          exit="e"
          draggable="false"
        />
      </a>
      {/*
              rechts unten? ==> Slideshow_alt update

            <figcaption>{alts[i]}</figcaption> */}
    </figure>
  );
}
