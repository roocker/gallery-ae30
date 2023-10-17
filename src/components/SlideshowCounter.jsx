import React from 'react';
import { useStore } from '@nanostores/react';
import { slideshow_length, stateSlideshowIndex } from '../states.jsx';
import '../styles/counter.css'


export default function SlideshowCounter (){
  const index = useStore(stateSlideshowIndex);
  const length = useStore(slideshow_length);
  return(
    <p className="counter">
    <span className="slideshow_number index">{index +1}</span>&mdash;<span className="slideshow_number length">{length}</span>
    </p>
  );
}

