import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useStore } from "@nanostores/react";
import {
  slideshow_length,
  stateSlideshow,
  stateSlideshowIndex,
} from "../states.jsx";

import "../styles/carousel.css";

export default function SScarousel({
  title,
  pictures,
  pictureTitles,
  plans,
  planTitles,
  children,
}) {
  const sToggle = useStore(stateSlideshow);
  const images = sToggle ? pictures : plans;
  const alts = sToggle ? pictureTitles : planTitles;

  const index = useStore(stateSlideshowIndex);

  // carousel ----
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPercentage] = useState(0);
  // const [nextPercentage, setNextPercentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);

  const move = useMotionValue(0);

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

    move.set(percentage);
  };

  useEffect(
    () =>
      move.onChange(latest => {
        console.log(move);
      }),
    [percentage, move]
  );

  // console.log("mouse down at", mouseDownAt);
  // console.log("percentage", percentage);
  // }, [mouseDownAt, percentage]);

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

    console.log(
      "index changed",
      index + 1,
      "/",
      images.length + 1,
      "=>",
      imgAtPos
    );
  }, [index]);

  // update index according to percentage:

  const calculateIndex = (percentage, len) => {
    return Math.floor((len * percentage) / -100);
  };

  useEffect(() => {
    // const currentPercentage = move.get();
    // console.log("currentPercentage", currentPercentage);

    const newIndex = calculateIndex(percentage, images.length + 1);
    // console.log("newIndex", newIndex);
    stateSlideshowIndex.set(newIndex);
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
      <div className="crosshair" />
      <motion.div
        id="image-carousel"
        data-mouse-down-at="0"
        data-prev-percentage="0"
        // style={{ move }}
        variants={move_carousel}
        animate="a"
        initial="i"
      >
        {children}
        {images.map((img, i) => (
          <figure key={alts[i]}>
            <a href="">
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
    </div>
  );
}
