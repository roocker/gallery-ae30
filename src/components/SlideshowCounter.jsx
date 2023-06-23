import { useStore } from '@nanostores/react';
import { slideshow_index, slideshow_length } from '../states.jsx';
import '../styles/counter.css'


export default function SlideshowCounter (){
  const index = useStore(slideshow_index);
  const length = useStore(slideshow_length);
  return(
    <p className="counter">
    <span className="slideshow_number index">{index}</span> - <span className="slideshow_number length">{length}</span>
    </p>
  );
}

