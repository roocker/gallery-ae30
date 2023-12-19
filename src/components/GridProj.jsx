/* 
  TODO
  - [ ] fix bug with filters! 
  - [ ] figcaption visual bug when text wrap
  - [ ] Picture crop/resize position from CMS / Collection as optional attrib!
  https://docs.astro.build/en/guides/integrations-guide/image/#picture-
  https://sharp.pixelplumbing.com/api-resize
  - [ ] sharp image operation (color correction?)

  */
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  handleRemoveFilter,
  handleToggleFilter,
  stateCurrentProjs,
} from "../states";

import "../styles/grid.css";
import React, { useEffect } from "react";

// Pictures Aspect Ratio
// const width = 3;
// const height = 2;

function GridProj(props) {
  let projs = [];
  const allProjs = props.projects;

  /* console.log("after props", allProjs.map((pro, i) => (
    {
      i: i,
      title: pro.id
    console.log('Projekte', currentProjs , 'gem. Parameter:' , params);
    }
  ))) */

  const currentProjs = useStore(stateCurrentProjs);
  // console.log("currentProjs", currentProjs); !!

  // const imgSrcs = props.covers;
  // console.log("imgSrcs", imgSrcs)

  if (currentProjs) {
    projs = currentProjs;
    // console.log("SUCESS: GridProj found Projects in States", projs);
  } else {
    projs = allProjs;
    /* console.log(
      "WARNING: GridProj didn't fount Projects from States, default to allProjects",
    ); */
    stateCurrentProjs.set(projs);
  }

  // console.log("projs", projs); !!

  let completedAnimations = 0;
  const totalAnimations = projs.length;
  // console.log("gibts noch projs?", projs)

  if (projs == 0) {
    return (
      <div className="noProjects">
        <p>
          Es sind keine Projekte für die gewählten Filter Einstellungen
          vorhanden.
        </p>
        <p>
          <a onClick={handleRemoveFilter}>Filter entfernen</a>
        </p>
      </div>
    );
  } else {
    return projs.map((proj, index) => {
      // console.log(proj, index);

      let smaller;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      vw > vh ? (smaller = vh) : (smaller = vw);

      const min = smaller * -1;
      const max = smaller;

      const minR = -270;
      const maxR = 270;

      const randomX = Math.random() * (max - min) + min;
      // console.log(randomX);
      const randomY = Math.random() * (max - min) + min;
      // console.log(randomY);
      const randomR = Math.random() * (maxR - minR) + minR;
      // console.log(randomR);
      const randomS = Math.random();
      // console.log(randomS);

      const shuffle = {
        i: {
          x: randomX,
          y: randomY,
          rotate: randomR,
          scale: 0.8,
          opacity: 0,
        },
        a: {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: index * 0.4 * randomS,
          },
        },
        e: {
          x: randomX,
          y: randomY,
        },
        z1: {
          scale: 1.05,
          transition: {
            duration: 0.1,
            // type: 'spring', stiffness: 100, damping: 20,
          },
        },
        /* z2: {
          scale: 7,
          originY: "50%",
          originX: "50%",
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        }, */
      };

      // console.log("weitheig:", proj.data.widehigh)
      const isWide = proj.data.widehigh === "extra breit" ? true : false;
      const isHigh = proj.data.widehigh === "extra hoch" ? true : false;
      // console.log("hier:", isWide, isHigh)
      //

      // console.log("before return:", proj.id, index)

      return (
        <motion.article
          className={`${isWide ? "wide" : ""} ${isHigh ? "high" : ""}`}
          variants={shuffle}
          key={index}
          initial="i"
          animate="a"
          exit="e"
          whileHover="z1"
          // onHoverEnd={e => {}}
          // whileTap="z2"
          onAnimationComplete={() => {
            completedAnimations++;
            if (completedAnimations === totalAnimations) {
              window.scrollTo(0, 0);
            }
          }}
        >
          <a href={`../${proj.data.category}/${proj.slug}`}>
            <AnimatePresence initial={true}>
              <figure>
                <img
                  // src={imgSrcs.find((img) => img.imgIndex === index).img.src}
                  // das ist jetzt
                  // src={index.find((img) => img.imgIndex === index).img.src}
                  src={proj.data.titleimg.img.src}
                  alt={proj.data.titleimg.alt}
                />

                <figcaption>
                  {proj.data.title}
                </figcaption>
              </figure>
            </AnimatePresence>
          </a>
        </motion.article>
      );
    });
  }
}

export default GridProj;
