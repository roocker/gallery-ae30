import { useStore } from '@nanostores/react';
import { modalOpen } from '../states.jsx';

export default function ModalBtn({ BtnName }) {
  const isOpen = useStore(modalOpen);
  const toggleModal = () => modalOpen.set(!isOpen);

  console.log('ModBtn:',isOpen);

  return <button onClick={toggleModal} className="modal_toggle_btn">{BtnName}</button>;
}
