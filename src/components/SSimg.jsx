import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/slideshow.css";

const animation_zoom = {
  i: {
    minHeight: "0lvh",
    minWidth: "0lvw",
  },
  a: {
    minHeight: "100lvh",
    minWidth: "100lvw",
  },
  e: {
    minHeight: "0lvh",
    minWidth: "0lvw",
  },
};

function SSimg(props) {
  const images = props.images;

  const index = props.index;
  const alts = props.alts;
  //Toggle for Zoom
  const zToggle = props.zoom;

  /* console.log("current images:", images)
  console.log("current index:", images[index])
  console.log("current alt:", alts[index])
  console.log("current zoom state:", zToggle) */

  // Zoom Drag feature
  /* #rev #bug
  - need to save downX as useState to have zoom feature whenever image is switched to next one 
  - also need to update img (autoplay)
  - vl spart man sich dadurch auch das ganze nextPercentage gedöns?
  - case TouchEvent und so

  */

  const img = document.getElementById("img");

  // console.log(img)
  /* const zoomDragUp = () => {
    console.log("up", img.dataset.downX);
    img.dataset.downX = 0;
    img.dataset.prevPercentage = img.dataset.downX;
  };
  const zoomDragDown = e => {
    // props.onClick();
    if (e.nativeEvent instanceof MouseEvent) {
      img.dataset.downX = e.clientX;
      console.log("zoomDragDown x:", img.dataset.downX);
    }
  };
  const zoomDragMove = e => {
    if (zToggle && e.nativeEvent instanceof MouseEvent) {
      const moveXdelta = img.dataset.downX - e.clientX;
      const maxXdelta = window.innerWidth;
      const moveXdeltaPercent = (moveXdelta / maxXdelta) * -100;
      const nextPercentage = img.dataset.prevPercentage + moveXdeltaPercent;
      return img.animate(
        { objectPosition: `${nextPercentage}% 50%` },
        { duration: 1200, fill: "forwards" }
      );
    }
  }; */

  return (
    <AnimatePresence initial={true}>
      <motion.img
        className=""
        id="img"
        src={images[index]}
        alt={alts[index]}
        variants={animation_zoom}
        exit="e"
        initial={zToggle ? "a" : "i"}
        animate={zToggle ? "a" : "i"}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={props.onClick}
        // onMouseDown={zoomDragDown}
        // onMouseMove={zoomDragMove}
        // onMouseUp={zoomDragUp}
        draggable={false}
      />
    </AnimatePresence>
  );
}
export default SSimg;
