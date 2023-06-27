import { useStore } from '@nanostores/react';
import { statePlayback } from '../states';
import '../styles/btn.css'

function PlaybackBtn({ children }) {

  // const [toggle, setToggle] = useStore(stateSlideshow);
  const pToggle = useStore(statePlayback);
  const setToggle = () => {
    statePlayback.set(!pToggle)
  }

  return (
    // console.log(children.props.value),
    // {`${pToggle ? 'an' : 'aus'}`}
    <button
      onClick={setToggle}
      className="btn modal_toggle_btn"
      title={children.props.value}
      >
    <svg className="btn_svg">
      <use className="btn_use" href={!pToggle ? "/svg.svg#play" : "/svg.svg#pause"}/>
    </svg>

    </button>
  );
}


export default PlaybackBtn;
