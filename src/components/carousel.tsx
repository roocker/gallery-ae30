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
  useScroll,
  LayoutGroup,
} from "framer-motion";
import { useStore } from "@nanostores/react";
import {
  slideshow_length,
  stateSlideshow,
  stateSlideshowIndex,
  stateSlideshowZoom2,
} from "../states";

import "../styles/carousel.css";
// import SSfigure from "./SSfigure.jsx";
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

  const [reqIndex, setReqIndex] = useState(-1);
  const [zoomNow, setZoomNow] = useState(0);

  const zoomIng = (i: number) => {
    stateSlideshowZoom2.set(1);
    // resetZoomX, 0, { duration: 1 };

    console.log("resetX idst", resetZoomX.get());

    setReqIndex(i);
    setZoomNow(i);

    stateSlideshowIndex.set(i);
    console.log(
      "requested zoom index:",
      i,
      "from currentIndex:",
      index,
      "- status:",
      zoom,
      "elementOrigin:",
      elementOrigin[reqIndex],
      "zoomNow:",
      zoomNow,
      "move_carousel:",
      move_carousel.get()
    );

    if (zoom === 1) {
      stateSlideshowZoom2.set(0);
    }
  };
  // console.log("zoom", zoom);

  // ----------------------------------------------------
  // carousel
  // ----------------------------------------------------

  const carousel = useRef<HTMLDivElement>(null);
  const carouselContainer = useRef<HTMLDivElement>(null);

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
      /* console.log(
        "carousel",
        carousel,
        "carouselWidth",
        carouselWidth,
        "carousel_elements",
        carouselElements,
        "carousel_element_width",
        carousel_element_width
      ); */
    } else {
      // throw new Error("carousel not found");
    }
  }, []);

  /* const { scrollY } = useScroll();
  useEffect(() => {
    console.log("scrollY", scrollY.get());
  }, [scrollY]); */

  const move_carousel = useMotionValue(0);

  const moveImagePer = useTransform(
    move_carousel,
    latest => (100 / carouselWidth) * latest * -1
  );
  const moveImage = useMotionTemplate`${moveImagePer}% center`;

  const resetZoomX = useTransform(
    move_carousel,
    latest => (window.innerWidth / 2 - Math.abs(latest)) * -1
  );

  /* const setNearestIndex = e => {
    const segmentWidth = (carouselWidth / (images.length + 1)) * -1;
    const nearestIndex = Math.abs(
      Math.floor(move_carousel.get() / segmentWidth)
    );
    stateSlideshowIndex.set(nearestIndex);
    console.log("nearest index:", nearestIndex, "segmentWidth:", segmentWidth);
  }; */

  // log move_carousel current position
  useEffect(
    () =>
      move_carousel.on("change", latest => {
        /* console.log(
          "move_carousel:",
          latest,
          "\n",
          "move_image:",
          moveImage.get(),
          "\n",
          "resetZoomX:",
          resetZoomX.get()
        ); */
      }),
    [move_carousel, images, resetZoomX]
  );

  const transition = {
    type: "spring" as "spring" | "keyframes" | "decay" | "tween" | "inertia",
    stiffness: 50,
    damping: 20,
  };

  const calc_carousel_element_mid = i => {
    return (
      (-1 * carousel_element_width - gap_width) * i - carousel_element_width / 2
    );
  };

  const calc_carousel_element_rel_mid = i => {
    // console.log("currentindex:", index , i)
    if (index == i) {
      return 0.5;
    } else {
      const deltaToI = i - index;
      /* console.log(
        "1% of window",
        (100 / window.innerWidth) * window.innerWidth,
        "deltaToI",
        deltaToI,
        "i",
        i,
        "carousel_element_width * deltaToI",
        carousel_element_width * deltaToI
      ); */
      /* console.log(
        "i",
        i,
        100,
        "/",
        window.innerWidth,
        "*(",
        deltaToI,
        "*",
        carousel_element_width,
        ")"
      ); */
      return (
        (100 / window.innerWidth) * (deltaToI * carousel_element_width) * 0.01 +
        0.5
      );
    }
  };

  const [elementOrigin, setElementOrigin] = useState([]);

  useEffect(() => {
    const move_carousel_to_index = calc_carousel_element_mid(index);

    animate(move_carousel, move_carousel_to_index, transition);

    if (zoom < 1) {
    } else {
      // animate(move_carousel, window.innerWidth / -2 , transition);
      // move_carousel.set(window.innerWidth / -2);
    }

    const newElementOrigin = images.map((_, i) => {
      return calc_carousel_element_rel_mid(i);
    });

    setElementOrigin(newElementOrigin);

    /* console.log(
      "index:",
      index,
      "origin",
      elementOrigin[index],
      "moving to:",
      move_carousel_to_index,
      "carousel_element_width:",
      carousel_element_width,
      "carouselWidth",
      carouselWidth
      // "elementOrigin:",
      // elementOrigin
    ); */
  }, [index, stateSlideshowIndex, zoom]);

  /* useEffect(() => {
    console.log("Updated elementOrigin:", elementOrigin, "for index:", index);
  }, [elementOrigin]); */

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

  // scroll horizontally
  const handleScroll = e => {
    if (carouselContainer.current) {
      const newValue = move_carousel.get() + e.deltaY * -2.5;
      const minScrollright = 0;
      const maxScrollleft = -1 * carouselWidth;

      const restrictedValue = Math.min(
        Math.max(newValue, maxScrollleft),
        minScrollright
      );
      animate(move_carousel, restrictedValue, transition);
    }
  };

  return (
    <motion.div
      onWheel={handleScroll}
      ref={carouselContainer}
      className="carousel"
      onPointerDown={startDrag}
      style={{ touchAction: "none" }}
      transition={{ duration: 2 }}
    >
      <div key="crosshair" className="crosshair" />
      <AnimatePresence initial={true}>
        {zoom >= 0 && (
          <motion.div
            key="carousel"
            ref={carousel}
            id="image-carousel"
            className={zoom === 1 ? "zoom1" : zoom === 2 ? "zoom2" : ""}
            style={{
              y: "-50%",
              x: move_carousel,
            }}
            drag={zoom < 1 ? "x" : false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // onDragEnd={setNearestIndex}
            dragControls={dragControls}
            dragTransition={{
              min: -1 * carouselWidth,
              max: 0,
              power: 0.3,
              timeConstant: 700,
              bounceStiffness: 50,
              bounceDamping: 20,
              // modifyTarget(v)
            }}
            dragConstraints={{
              right: 0,
              left: -1 * carouselWidth,
            }}
            dragElastic={0.1}
          >
            {children}
            <LayoutGroup>
              <AnimatePresence>
                {images.map((img, i) => (
                  <Fig
                    layout
                    key={i}
                    reqIndex={reqIndex}
                    datazoom={zoom}
                    transition={{
                      layout: { duration: .3 },
                    }}
                    index={i}
                    src={img.src}
                    title={alts[i]}
                    figstyle={{
                      zIndex: reqIndex === i  ? 999 : 0,
                      objectPosition: moveImage,

                      // x: zoom > 0 ? resetZoomX : 0,
                      left: zoom > 0 ? resetZoomX : "",
                    }}
                    figanimate={{}}
                    imgstyle={{
                      // objectFit: "cover",
                      objectPosition: moveImage,
                    }}
                    imganimate={{
                      objectPosition: moveImage,
                      // objectFit: "fill",
                    }}
                    onclick={zoomIng}
                    classname=""
                  />
                ))}
              </AnimatePresence>
            </LayoutGroup>

            <div className="summary_block">{title}</div>
          </motion.div>
        )}
        {zoom >= 2 && (
          <motion.div
            key="slideshow"
            layout
            id="image-slideshow"
            data-zoom={zoomNow}
            initial={{
              // zIndex: 1,
              originX: elementOrigin[reqIndex],
              x: elementOrigin[reqIndex],
              //   height: "45vmin",
              //   width: "30vmin",
              // opacity: 0,
            }}
            animate={{
              originX: 0.5,
              //   height: "45vmin",
              //   width: "30vmin",
              // opacity: 1,
            }}
            exit={{
              originX: 0.5,
              // opacity: 1,
              //   height: "45vmin",
              //   width: "30vmin",
            }}
            transition={{ duration: 1, layout: { duration: 1 } }}
          >
            <Fig
              classname="slideshow"
              key={index}
              index={index}
              src={images[index].src}
              title={alts[index]}
              onclick={zoomIng}
              style={{}}
              // animation={anim_Zoom1}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
