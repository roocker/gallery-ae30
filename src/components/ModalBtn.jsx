import { useStore } from '@nanostores/react';
import { modalOpen } from '../states.jsx';
import '../styles/btn.css'

function ModalBtn({ children }) {
  const isOpen = useStore(modalOpen);
  const toggleModal = () => {
    modalOpen.set(!isOpen);
    // console.log('toggleModal is called and "isOpen":',isOpen);
  }

  return (
    console.log(children.props.value),
    <button
      onClick={toggleModal}
      className="btn modal_toggle_btn"
      title={children.props.value}
      >
    <svg className="btn_svg">
      <use className="btn_use" href="/svg.svg#text"/>
    </svg>

    </button>
  );
}


export default ModalBtn;
