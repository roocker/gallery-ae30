import React from 'react';
import {motion} from 'framer-motion';
import "../styles/modal.css";

function Modal(props) {
  return ( 
    <div className="modal_div">
    <h2>{props.proj_title}</h2>
    </div>
  )
}
export default Modal
