import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useStore } from "@nanostores/react";
import SSimg from "../components/SSimg";
import ProjectSummary from "../components/ProjectSummary";
import "../styles/slideshow.css";

import {
  slideshow_length,
  stateSlideshow,
  statePlayback,
  stateSlideshowIndex,
  stateSlideshowDirection,
  slideshowCurrentAlt,
  slideshowAutoPlayInterval,
  stateSlideshowZoom,
  stateModal,
  stateSlideshowZoom2,
  stateZoomComplete,
} from "../states";

function SSfigure(props) {
  const children = props.children;
  // console.log("children form SSfig", children);

  const index = useStore(stateSlideshowIndex);
  const direction = useStore(stateSlideshowDirection);

  const [pan, setPan] = useState(false);

  const animate_stoggle = {
    i: {
      y: 1500,
      opacity: 1,
      /* transition: {
        y: { type: 'easeinout', duration: 2 },
      } */
    },
    a: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      transition: {
        // y: { type: 'easeinout', duration: 2 },
        y: { type: "spring", stiffness: 100, damping: 15 },
        // opacity: { duration: 2}
      },
    },
    e: {
      zIndex: 0,
      y: -1500,
      opacity: 1,
      /* transition: {
        y: { type: 'easeinout', duration: 2 },
      }, */
    },
  };

  const animate_slide = {
    i: direction => {
      return {
        // zIndex:0,
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    a: {
      zIndex: 1,
      opacity: 1,
      x: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    e: direction => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  //Toggle for Images/Plans
  const sToggle = useStore(stateSlideshow);

  const setSlidesToggle = () => {
    stateSlideshow.set(!sToggle);
    stateSlideshowIndex.set(0);
    stateSlideshowZoom.set(false);
  };

  let images = sToggle ? props.pictures : props.plans;

  const imagesSrcs = images.map(img => {
    return img.src;
  });
  let alts = sToggle ? props.pictureTitles : props.planTitles;

  // console.log("JETZT", images)
  // console.log("JETZT", imagesSrcs)

  //Toggle for Zoom
  const zToggle = useStore(stateSlideshowZoom);

  const zoom = useStore(stateSlideshowZoom2);
  // const carousel_slideshow_toggle = useStore(stateZoomComplete)

  const setZoomToggle = () => {
    if (!pan) {
      stateSlideshowZoom.set(!zToggle);
      if (zoom === 1) {
        stateSlideshowZoom2.set(2);
      } else {
        stateSlideshowZoom2.set(0);
        stateZoomComplete.set(false);
        // console.log("zoom:", zoom);
      }
    }
  };

  // change Controls color on Plan/Picture Toggle
  const mToggle = useStore(stateModal);

  let bgIsDark = true;
  useEffect(() => {
    bgIsDark =
      index == slideshow_length.get() - 1
        ? false
        : sToggle && !mToggle && zToggle
          ? true
          : false;

    // console.log("HIER", index, slideshow_length.get());
    // console.log( "zToggle",zToggle , "mToggle", mToggle ,"stoggle" ,sToggle)
    // console.log("bgIsDark" ,bgIsDark)

    const footerControls = document.querySelector(".controls");
    footerControls.style.color = bgIsDark ? "var(--cwhite)" : "var(--cgrey)";

    // const crosshair = document.querySelector(".crosshair", "::after");
    //
    const crosshair = document.querySelector(".crosshair");
    crosshair.style.setProperty(
      "--bgColor",
      bgIsDark ? "var(--cwhite)" : "var(--cgrey)"
    );
  }, [sToggle, zToggle, mToggle, index]);

  // Slider Functions

  function nextSlide() {
    stateSlideshowDirection.set(1);
    if (index === images.length) {
      stateSlideshowIndex.set(0);
    } else {
      stateSlideshowIndex.set(index + 1);
    }
  }

  function prevSlide() {
    stateSlideshowDirection.set(-1);
    if (index === 0) {
      stateSlideshowIndex.set(images.length);
    } else {
      stateSlideshowIndex.set(index - 1);
    }
  }

  // Auto Playback

  const pToggle = useStore(statePlayback);
  const togglePlayback = () => {
    statePlayback.set(!pToggle);
  };

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    if (props.autoPlayInterval > 0 && pToggle) {
      const interval = setInterval(play, props.autoPlayInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [props.autoPlayInterval, pToggle]);

  // Keyboard Hotkeys/Shortcuts
  useEffect(() => {
    const handleKeyDown = event => {
      switch (event.key) {
        case "ArrowLeft":
        case "h":
          prevSlide();
          break;
        case "ArrowRight":
        case "l":
          nextSlide();
          break;
        /* case "p":
          setSlidesToggle();
          break; */
        case " ":
        case "w":
          togglePlayback();
          break;
        case "z":
          setZoomToggle();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const pan_pos_x_per = useMotionValue(50);
  const pan_pos_y_per = useMotionValue(50);

  function onPan(event, info) {
    const x = (100 / window.innerWidth) * info.point.x;
    const y = (100 / window.innerWidth) * info.point.y;
    // console.log(info.point.x, info.point.y);

    pan_pos_x_per.set(x);
    pan_pos_y_per.set(y);

    return pan_pos_x_per, pan_pos_y_per;
  }

  const pan_pos = useMotionTemplate`${pan_pos_x_per}% ${pan_pos_y_per}%`;

  /* useEffect(
    () =>
      pan_pos_x_per.on("change", latest => {
        console.log("x", latest , "y", pan_pos_y_per.get());
      }),
    [pan_pos_x_per, pan_pos_y_per]
  ); */

  // RETURN ----------------------------------------
  // console.log("index", index, "images.length", images.length);

  return (
    <>
      <motion.figure
        className="slideshow"
        // variants={animate_stoggle}
        key={sToggle}
        initial="i"
        animate="a"
        exit="e"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="motiondiv"
            // style={{ pan_pos_raw }}
            onPan={onPan}
            onPanStart={() => setPan(true)}
            onPanEnd={() => setPan(false)}
            // onMouseMove={onPan}
            //https://codesandbox.io/p/sandbox/framer-motion-mouse-position-2b4sd?file=%2Fsrc%2FApp.js%3A75%2C31
            // onPointerMove={onPan}
            key={index}
            custom={direction}
            variants={animate_slide}
            initial="i"
            animate="a"
            exit="e"
          >
            {index == images.length ? (
              <>{children}</>
            ) : (
              <SSimg
                panpos={pan_pos}
                images={imagesSrcs}
                index={index}
                alts={alts}
                zoom={zToggle}
                onClick={setZoomToggle}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <figcaption>{alts[index]}</figcaption>
      </motion.figure>

      <button className="slideshow_btn btn_prev" onClick={prevSlide}>
        {/* ◀️ vorheriges Bild */}
        <span className="material-symbols-rounded"> navigate_before</span>
      </button>
      <button className="slideshow_btn btn_next" onClick={nextSlide}>
        {/* ▶️ nächstes Bild */}
        <span className="material-symbols-rounded"> navigate_next</span>
      </button>
    </>
  );
}
export default SSfigure;
