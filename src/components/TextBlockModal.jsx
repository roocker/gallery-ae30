import { useStore } from '@nanostores/react';
import { modalOpen } from '../states.jsx';
import Backdrop from './Backdrop.jsx';
import '../styles/modal.css';
import React, { useEffect } from 'react';

function TextBlockModal({ children }) {
  const isOpen = useStore(modalOpen);
  const handleClose = () => modalOpen.set(false);

  console.log('TextBlModal:', isOpen);

// event listener for Esc 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    }
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, []);

// return HTML
// onClick={(e) => e.stopPropagation()}
// variants={slideUp}
// initial="i"
// animate="a"
// exit="e"

  return isOpen ? (
    <Backdrop onClick={handleClose}>
      <div
        className="content"
        >{children}
      </div>

    </Backdrop>
  ) : null;
}

export default TextBlockModal;
