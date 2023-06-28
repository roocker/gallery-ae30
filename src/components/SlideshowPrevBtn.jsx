import { useStore } from '@nanostores/react';
import { statePlayback } from '../states';
import { Slideshow } from '../components/Slideshow';
import '../styles/btn.css'

function SlideshowNextBtn({ children }) {

  // const [toggle, setToggle] = useStore(stateSlideshow);
  const pToggle = useStore(statePlayback);
  const setToggle = () => {
    statePlayback.set(!pToggle)
  }

  // nextSlide();

  return (
    // console.log(children.props.value),
    // {`${pToggle ? 'an' : 'aus'}`}
    <button
      onClick={setToggle}
      className="btn modal_toggle_btn"
      title={children.props.value}
      >
    <svg className="btn_svg">
      <use className="btn_use" href="/svg.svg#arrowL" />
    </svg>

    </button>
  );
}


export default SlideshowNextBtn;
