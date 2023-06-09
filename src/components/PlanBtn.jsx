import { useStore } from '@nanostores/react';
import { stateSlideshow,  stateSlideshowIndex} from '../states';
import '../styles/btn.css'

function PlanBtn({ children }) {

  // const [toggle, setToggle] = useStore(stateSlideshow);
  const sToggle = useStore(stateSlideshow);
  const setToggle = () => {
    stateSlideshow.set(!sToggle);
    stateSlideshowIndex.set(0);
  }

  return (
    // console.log(children.props.value),
    <button
      onClick={setToggle}
      className="btn modal_toggle_btn"
      title={children.props.value}
      >
    <svg className="btn_svg">
      <use className="btn_use" href="/svg.svg#plans"/>
    </svg>

    </button>
  );
}


export default PlanBtn;
