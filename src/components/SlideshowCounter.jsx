import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { slideshow_length, stateSlideshowIndex } from "../states.jsx";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import "../styles/counter.css";

const fontSize = 20;
const padding = 2;
const height = fontSize + padding;

export default function SlideshowCounter() {
  const index = useStore(stateSlideshowIndex);
  const length = useStore(slideshow_length);

  return (
    <div
      className={`counter ${length > 9 ? "twodigits" : ""}`}
      style={{ height }}
    >
      {length > 9 && <Digit place={10} val={index + 1} />}
      <Digit place={1} val={index + 1} />
      &mdash;
      <div className="digit">
        <span className="slideshow_number length">{length}</span>
      </div>
    </div>
  );
}

function Digit({ place, val }) {
  let valueRoundedToPlace = Math.floor(val / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="digit">
      {[...Array(10).keys()].map(i => (
        <Number mv={animatedValue} n={i} key={i} />
      ))}
    </div>
  );
}
function Number({ mv, n }) {
  let y = useTransform(mv, latest => {
    let placeValue = latest % 10;
    let offset = (10 + n - placeValue) % 10;
    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span style={{ y }} className="slideshow_number index">
      {n}
    </motion.span>
  );
}
