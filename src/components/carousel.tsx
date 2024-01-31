import React, { useEffect, useRef, useState } from "react";
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
} from "../states";

import "../styles/carousel.css";
import SSfigure from "./SSfigure.jsx";
import Fig from "./carousel/fig";

export default function Carousel({
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

  const zoomIng = (i: number) => {
    stateSlideshowZoom2.set(1);
    stateSlideshowIndex.set(i);
    console.log("requested zoom index:", i, "- status:", zoom);
    if (zoom === 1) {
      stateSlideshowZoom2.set(0);
    }
  };
  // console.log("zoom", zoom);

  // ----------------------------------------------------
  // carousel ----
  // ----------------------------------------------------

  const carousel = useRef<HTMLDivElement>(null);
  const carousel_box = useRef<HTMLDivElement>(null);

  const [carouselWidth, setCarouselWidth] = useState(0);
  const [carouselElements, setCarouselElements] =
    useState<HTMLCollection | null>(null);

  const carousel_element_width = carouselElements
    ? carouselElements[0].clientWidth
    : 0;

  const gap_width = 16;

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(carousel.current.offsetWidth);
      setCarouselElements(carousel.current.children);
      console.log(
        "carousel",
        carousel,
        "carouselWidth",
        carouselWidth,
        "carousel_elements",
        carouselElements,
        "carousel_element_width",
        carousel_element_width
      );
    } else {
      throw new Error("carousel not found");
    }
  }, []);

  // const carouselWidth = carousel.current?.offsetWidth;

  const move_carousel = useMotionValue(0);

  const calc_carousel_element_mid = i => {
    return (
      (-1 * carousel_element_width - gap_width) * i - carousel_element_width / 2
    );
  };

  const move_carousel_to_index = calc_carousel_element_mid(index);

  const inpt = [0, -1 * carouselWidth];
  const out = [0, move_carousel_to_index];
  useTransform(move_carousel, inpt, out);

  useEffect(
    () =>
      move_carousel.on("change", latest => {
        console.log("move_carousel:", latest);
      }),
    [move_carousel]
  );

  useEffect(() => {
    const move_carousel_to_index = calc_carousel_element_mid(index);
    // move_carousel.set(move_carousel_to_index);

    console.log(
      "requested index:",
      index,
      "moving to:",
      move_carousel_to_index,
      "carousel_element_width:",
      carousel_element_width
    );
  }, [index, move_carousel]);

  const input = [0, -1 * carouselWidth];
  const output = [0, 1];
  const opacity = useTransform(move_carousel, input, output);

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

  /* useEffect(() => {
    const addthis = index * (img_width + gap_width) + half_img_width;
    const addthis_perc = (100 / carouselWidth) * addthis;

    const imgAtPos = addthis_perc * -1;

    setPercentage(imgAtPos);
  }, [index]); */

  /* const move_carousel = {
    i: { x: 0, y: "-50%" },
    a: {
      x: percentage + "%",
      y: "-50%",
      transition: {
        x: {
          duration: 2,
          fill: "forwards",
        },
      },
    },
  }; */

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
    // i: { height: "auto" },

    // a: { height: "100lvh"  },
    a: {
      // scale: 3,
      minHeight: "100%",
      // originX: picpos,
    },
    e: {
      minHeight: "25%",
    },
  };

  // update index according to percentage:

  // -------
  const exportToStates = () => {
    slideshow_length.set(images.length + 1);
    // slideshowCurrentAlt.set(alts[index]);
  };
  exportToStates();
  return (
    <AnimatePresence initial={true}>
      <motion.div
        className="carousel"
        ref={carousel_box}
        // onMouseDown={handleOnDown}
        // onMouseUp={handleOnUp}
        // onMouseMove={handleOnMove}
      >
        <div key="crosshair" className="crosshair" />
        <motion.div
          ref={carousel}
          id="image-carousel"
          style={{ y: "-50%", x: move_carousel }}
          drag="x"

          // dragConstraints={carousel}
          // data-mouse-down-at="0"
          // data-prev-percentage="0"
          // variants={move_carousel}
          // animate="a"
          // initial="i"
          // exit="e"
        >
          {children}
          {images.map((img, i) => (
            <Fig
              key={i.toString()}
              index={i}
              src={img.src}
              title={alts[i]}
              animation={move_image}
              onclick={zoomIng}
              classname=""
            />
          ))}

          <div className="summary_block">{title}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* {zoom === 1 && (
          <Fig
            classname="slideshow"
            key={index}
            index={index}
            src={images[index].src}
            title={alts[index]}
            onclick={zoomIng}
            animation={anim_Zoom1}
          />
        )} */
