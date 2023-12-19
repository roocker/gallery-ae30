import { useStore } from "@nanostores/react";
import { stateModal } from "../states.jsx";
import Backdrop from "./Backdrop.jsx";
import "../styles/modal.css";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slideUp = {
  i: {
    y: "100vh",
    opacity: 0,
  },
  a: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 400,
    },
  },
  e: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 25,
      stiffness: 400,
    },
  },
};

function TextBlockModal({ children, fLmodal }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "t":
          handleToggle();
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

  const isOpen = useStore(stateModal);
  // console.log ('TextBlockModal at start and "isOpen":', isOpen);

  const handleToggle = () => {
    stateModal.set(!isOpen);
  };
  const handleOpen = () => {
    stateModal.set(true);
  };
  const handleClose = () => {
    stateModal.set(false);
    // console.log('TextBlockModal is called and "isOpen":', isOpen);
  };

  // console.log('TextBlModal:', isOpen);

  // event listener for Esc
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  // const bgIsBright = tFilter ? true : false;
  // console.log("bgIsBright" ,bgIsBright)




   useEffect(() => {
    const footerControls = document.querySelector(".controls");
    footerControls.style.color = isOpen ?  'var(--cgrey)' : '';
  }, [ isOpen ]) 


  return (
    <AnimatePresence
      initial={true}
      mode="wait"
      onExitComplete={() => {
        console.log("Modal exit animation completed");
      }}
    >
      {isOpen && (
        <Backdrop classname="backdrop_modal" onClick={handleClose}>
          <motion.section
            className="modal_content"
            variants={slideUp}
            initial="i"
            animate="a"
            exit="e"
            key={isOpen}
          >
            <div className="content" onClick={(e) => e.stopPropagation()}>
              {children}
              <button className="modal_close_btn" onClick={handleClose}>
                <svg className="svg-icon">
                  <use
                    id="icon-close"
                    className="svg-icon-use"
                    href="/svg.svg#close"
                  />
                </svg>
              </button>
            </div>
          </motion.section>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

export default TextBlockModal;
