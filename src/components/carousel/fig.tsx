import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Fig({ index, src, title, onclick, classname, style }) {
  return (
    <figure className={classname}>
      <a
        onClick={() => {
          onclick(index);
        }}
      >
        <motion.img src={src} alt={title} style={style} className="" />
      </a>
      {/*
              rechts unten? ==> Slideshow_alt update

            <figcaption>{alts[i]}</figcaption> */}
    </figure>
  );
}
