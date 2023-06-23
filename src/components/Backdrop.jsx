import React from 'react';
import { motion } from 'framer-motion';
import '../styles/modal.css';

const backdropVariants = {
  i: { opacity: 0 },
  a: { opacity: 1 },
  e: { opacity: 0 },
};

export default function Backdrop({ children, onClick, bdlabel }) {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      variants={backdropVariants}
      initial="i"
      animate="a"
      exit="e"
    >
      {children}
    </motion.div>
  );
}

