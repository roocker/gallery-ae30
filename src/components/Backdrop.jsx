import {motion} from "framer-motion";
import '../styles/modal.css';

const backdrop_variants = {
  i: {
    opacity: 0,
  },
  a: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 1,
      }
    }
  },
  e: {
    opacity: 0
  }

}

const Backdrop = ({ children, onClick }) => {
  return(
    <motion.div
      className="backdrop"
      onClick={onClick}
      variants={backdrop_variants}
      initial="i"
      animate="a"
      exit="e"
    >
    {children}

  </motion.div>
  );

};
export default Backdrop;
