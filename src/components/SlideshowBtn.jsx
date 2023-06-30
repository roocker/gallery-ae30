import { useStore } from '@nanostores/react';
import { stateSlideshowIndex, stateSlideshowDirection, slideshow_length   } from '../states';
import '../styles/btn.css'

function SlideshowBtn({ dir, children }) {

  const index = useStore(stateSlideshowIndex)
  const direction = useStore(stateSlideshowDirection)
  const numberOFimages = useStore(slideshow_length)

  function nextSlide(){
    stateSlideshowDirection.set(1)
    if(index === numberOFimages -1){
      stateSlideshowIndex.set(0)
    } else {
      stateSlideshowIndex.set(index + 1);
    }
  }

  function prevSlide(){
    stateSlideshowDirection.set(-1)
    if(index === 0){
      stateSlideshowIndex.set(numberOFimages -1)
    } else {
      stateSlideshowIndex.set(index - 1);
    }
  }

  return (
    <button
      onClick={dir === "next" ? nextSlide : prevSlide}
      className="btn modal_toggle_btn"
      title={children.props.value}
      >
    <svg className={`btn_svg ${dir === "next" ? 'btn_arrowL' : ''}`} >
      <use className="btn_use" href="/svg.svg#arrowL" />
    </svg>

    </button>
  );
}

export default SlideshowBtn;
