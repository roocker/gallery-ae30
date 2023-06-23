import React from 'react';
import { motion } from 'framer-motion';
import '../styles/modal.css';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {children}
    </motion.div>
  );
}

