import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useStore } from "@nanostores/react";
import {
  slideshow_length,
  stateSlideshow,
  stateSlideshowIndex,
  stateSlideshowZoom2,
} from "../states.jsx";

import "../styles/carousel.css";
import SSfigure from "./SSfigure.jsx";

export default function SScarousel({
  title,
  pictures,
  pictureTitles,
  plans,
  planTitles,
  children,
  autoPlayInterval,
}) {
  const sToggle = useStore(stateSlideshow);
  const images = sToggle ? pictures : plans;
  const alts = sToggle ? pictureTitles : planTitles;

  const index = useStore(stateSlideshowIndex);

  const zoom = useStore(stateSlideshowZoom2);

  const zoomIn = (i: Number) => {
    stateSlideshowZoom2.set(1);
    console.log("requested zoom index:", i, "- status:", zoom);
  };

  const zoomOut = () => {
    stateSlideshowZoom2.set(0);
  };
  // console.log("zoom", zoom);

  // carousel ----
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(0);
  // const [nextPercentage, setNextPercentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);

  const handleOnDown = e => {
    setMouseDownAt(e.clientX);
  };

  const handleOnUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  };

  const handleOnMove = e => {
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth / 1;
    const percentage = (mouseDelta / maxDelta) * -100;

    // ???
    const nextPercentageUncronstrained = prevPercentage + percentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUncronstrained, 0),
      -100
    );

    setPercentage(nextPercentage);
  };

  const moves = useMotionValue(0);
  const move = useTransform(moves, [0, percentage], [0, percentage]);

  useEffect(() => {
    // console.log("percentage to move to", percentage);
    move.set(percentage);
    // console.log(move.get());
  }, [percentage]);

  // useEffect(() => move.on("change", latest => console.log(latest)), [move]);

  /* useEffect(
    () =>
      move.on("change", latest => {
        console.log(latest);
        // const newIndex = calculateIndex(latest, images.length + 1);
        // console.log("newIndex", newIndex);
        // stateSlideshowIndex.set(newIndex);
      }),
    [percentage, move]
  ); */

  const move_carousel = {
    i: { x: 0, y: "-50%" },
    a: {
      x: percentage + "%",
      transition: {
        x: {
          duration: 2,
          fill: "forwards",
        },
      },
    },
  };
  const move_image = {
    i: { objectPosition: "0% center" },
    a: {
      objectPosition: `${100 + percentage}% center`,
      transition: {
        objectPosition: {
          duration: 2,
          fill: "forwards",
        },
      },
    },
  };

  const anim_Zoom1 = {
    i: { height: "auto" },

    a: { height: "100%" },
  };

  useEffect(() => {
    const smallerVS = //calculate 30vmin / 2
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    const img_width = (smallerVS / 100) * 30;
    const half_img_width = img_width / 2;

    const gap_width = 16;

    const carouselwidth =
      img_width * (images.length + 1) + gap_width * images.length;

    const addthis = index * (img_width + gap_width) + half_img_width;
    const addthis_perc = (100 / carouselwidth) * addthis;

    const imgAtPos = addthis_perc * -1;

    setPercentage(imgAtPos);

    /* console.log(
      "index changed",
      index + 1,
      "/",
      images.length + 1,
      "=>",
      imgAtPos
    ); */
  }, [index]);

  // update index according to percentage:

  const calculateIndex = (percentage, len) => {
    return Math.floor((len * percentage) / -100);
  };

  useEffect(() => {
    // const currentPercentage = move.get();
    // console.log("currentPercentage", currentPercentage);
    // const newIndex = calculateIndex(percentage, images.length + 1);
    // console.log("newIndex", newIndex);
    // stateSlideshowIndex.set(newIndex);
  }, [percentage]);

  // -------
  const exportToStates = () => {
    slideshow_length.set(images.length + 1);
    // slideshowCurrentAlt.set(alts[index]);
  };
  exportToStates();
  return (
    <div
      className="carousel"
      onMouseDown={handleOnDown}
      onMouseUp={handleOnUp}
      onMouseMove={handleOnMove}
    >
      <AnimatePresence initial={true}>
        <div className="crosshair" />
        {zoom === 0 && (
          <motion.div
            id="image-carousel"
            data-mouse-down-at="0"
            data-prev-percentage="0"
            // style={{ transform: `translate(${percentage}% , -50%)` }}
            variants={move_carousel}
            animate="a"
            initial="i"
          >
            {children}
            {images.map((img, i) => (
              <figure key={`carouselfig_${alts[i]}`}>
                <a
                  onClick={() => {
                    zoomIn(i);
                  }}
                >
                  <motion.img
                    src={img.src}
                    alt={alts[i]}
                    variants={move_image}
                    animate="a"
                    draggable="false"
                  />
                </a>
                {/*
              rechts unten? ==> Slideshow_alt update

            <figcaption>{alts[i]}</figcaption> */}
              </figure>
            ))}

            <div className="summary_block">{title}</div>
          </motion.div>
        )}

        {zoom === 1 && (
          <motion.div variants={anim_Zoom1} animate="a" initial="i" exit="e">
            <SSfigure
              pictures={pictures}
              pictureTitles={pictureTitles}
              plans={plans}
              planTitles={planTitles}
              autoPlayInterval={autoPlayInterval}
            >
              test
            </SSfigure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
