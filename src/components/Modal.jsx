import "../styles/modal.css";

import {motion} from 'framer-motion';
import Backdrop from "../components/Backdrop";

import { handleClose } from "../state.ts";

const slideInBot = {

  i: {
    y: "-100vh",
    opacity: 0,
  },
  a: {
    y: "0",
    opacity: 1,
    transition: {
      duration: .2,
      type: "spring",
      damping: 25,
      stiffness: 500,
    }
  },
  e: {
    y: "100vh",
    opacity: 0,
  }
};


console.log(handleClose);

const TextBlockModal = ({ handleClose, text }) => {
  // let handleClose = useStore($handleClose);
return(
  <Backdrop onClick={handleClose}>
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="modal"
      variants={slideInBot}
      initial="i"
      animate="a"
      exit="e"
    >
  <div slot="text">{text}</div>
      </motion.div>
  </Backdrop>
)
};


export default TextBlockModal;

