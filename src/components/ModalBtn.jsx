import { useState } from 'react';
// import {motion} from "framer-motion";

import TextBlockModal from './Modal';


function ModalBTN(){
  // const text = props.text;
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return(
    <div>
    <button
    className="save-button"
    onClick={() => (modalOpen ? close() : open())}
    >
    Launch Modal
    </button>

    {modalOpen && <TextBlockModal modalOpen={modalOpen} handleClose={close} />}

    </div>
  )
}
export default ModalBTN;


