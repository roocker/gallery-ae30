import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { init } from "astro/virtual-modules/prefetch.js";

export default function Fig({
  index,
  src,
  title,
  onclick,
  classname,
  style,
  initial,
}) {
  return (
    <figure key={index} className={classname}>
      <a
        onClick={() => {
          onclick(index);
        }}
      >
        <motion.img
          src={src}
          alt={title}
          style={style}
          // initial={initial}
          // animation={{ height: "100lvh" }}
          className=""
        />
      </a>
      {/*
              rechts unten? ==> Slideshow_alt update

            <figcaption>{alts[i]}</figcaption> */}
    </figure>
  );
}
