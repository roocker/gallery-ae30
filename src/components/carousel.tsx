import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useAnimate,
  useDragControls,
  animate,
  useMotionTemplate,
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

  const [carouselWidth, setCarouselWidth] = useState(0);
  const [carouselElements, setCarouselElements] =
    useState<HTMLCollection | null>(null);

  const carousel_element_width = carouselElements
    ? carouselElements[0].clientWidth
    : 0;

  const gap_width = 16;

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(carousel.current.offsetWidth); // update on resizing of window!
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

  const move_carousel = useMotionValue(0);

  const moveImagePer = useTransform(
    move_carousel,
    latest => (100 / carouselWidth) * latest * -1
  );

  const moveImage = useMotionTemplate`${moveImagePer}% center`;

  useEffect(
    () =>
      move_carousel.on("change", latest => {
        console.log(
          "move_carousel:",
          latest,
          "\n",
          "move_image:",
          moveImage.get()
        );
      }),
    [move_carousel]
  );

  useEffect(() => {
    const calc_carousel_element_mid = i => {
      return (
        (-1 * carousel_element_width - gap_width) * i -
        carousel_element_width / 2
      );
    };
    const move_carousel_to_index = calc_carousel_element_mid(index);

    animate(move_carousel, move_carousel_to_index, {
      type: "spring",
      stiffness: 50,
      damping: 20,
    });

    console.log(
      "requested index:",
      index,
      "moving to:",
      move_carousel_to_index,
      "carousel_element_width:",
      carousel_element_width
    );
  }, [index]);

  // drag from wrapper div
  const dragControls = useDragControls();
  function startDrag(e) {
    dragControls.start(e);
  }

  const exportToStates = () => {
    slideshow_length.set(images.length + 1);
    // slideshowCurrentAlt.set(alts[index]);
  };
  exportToStates();

  return (
    <AnimatePresence initial={true}>
      <motion.div
        className="carousel"
        onPointerDown={startDrag}
        style={{ touchAction: "none" }}
      >
        <div key="crosshair" className="crosshair" />

        <motion.div
          ref={carousel}
          id="image-carousel"
          style={{ x: move_carousel, y: "-50%" }}
          drag="x"
          dragControls={dragControls}
          dragConstraints={{
            right: 0,
            left: -1 * carouselWidth,
          }}
          dragTransition={{
            bounceStiffness: 200,
            bounceDamping: 10,
          }}
          dragElastic={0.2}
          draggable={false}
        >
          {children}
          {images.map((img, i) => (
            <Fig
              key={i}
              index={i}
              src={img.src}
              title={alts[i]}
              style={{ objectPosition: moveImage }}
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
