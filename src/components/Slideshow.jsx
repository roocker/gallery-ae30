/* 
TODO
- [x] images sizes and resolutions!!!! no @astro/images here!
  - Is the answer here?: All images in Slideshow are max-res anyway, cause most detailed?
  - Or can we use generated images from @astro/images, already generated for grid gallery on build? (hardlinkS?)

- [x] animate it 


- [ ] image preloading! --> index?!
- [ ] need to set index to current index for page reload!?

- [ ] Keyboard support prev/next arrow keys and J/K
- [ ] Mouse Click and drag left/right =  prev/next
- [ ] Touch swipe left right? = prev/next

- [ ] simplify next/prevSlide funcitons into one funciton

- [ ] Zoomed View on Click or on Click Button Zoom ?!
- [ ] button markup type title aria-label SEO
*/

import "../styles/slideshow.css";
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useStore } from '@nanostores/react';
import { slideshow_index, slideshow_length, stateSlideshow, statePlayback  } from '../states.jsx';



const animation_variants = {
  i: direction =>  { 
    //test if direction > 0 dann 1000 sonst -1000
    return{
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      // scale: 0.5,
    }
  },
  a: {
    x: 0,
    opacity: 1,
    // scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: {duration: 0.2 }
    },
    // transition: 'ease-in',
  },
  e: direction => {
    return{
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      // scale: 0.5,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: {duration: 0.2 }
      },
      // transition: 'ease-in',
    }
  }
}

function Slideshow(props) {

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  //Toggle for Autoplayback
  // const ppToggle = useStore(statePlayback)

  //Toggle for Images/Plans
  const sToggle = useStore(stateSlideshow);
  const setSlidesToggle = () => {
    console.log('toggleSlides being used in slideshow')
    stateSlideshow.set(!sToggle);
  }

  let images = sToggle ? props.pictures : props.plans;
  console.log("slideshow images used: ", `${sToggle? 'pictures (true)' : 'plans (false)'}`);
  let alts = sToggle ? props.pictureTitles : props.planTitles;
  ;
  
  // export current Index and Image Array lengh for counter
  const slideshowIndex = (newIndex) => {
    slideshow_index.set(newIndex +1); 
  };
  const slideShowLengh = () => {
    slideshow_length.set(images.length);
  }

  // auto Playback
  const playback = useStore(statePlayback);
  const setPlayback = () => {
    statePlayback.set(!playback)
  }

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide
  })

  /* useEffect(() => {
   if (playback) {
    const interval = setInterval(autoPlayRef.current, props.autoPlayInterval * 1000)
   };
  }) */


  /* useEffect(() => {
    let interval;
    if (playback) {
      interval = setInterval(() => {
        console.log('1sec ist um next');
      }, 1000 );
    }
    return () => {
      clearInterval(interval);
    }
  }, [playback]); */


  // need to run slideShowLengh here bc error, then keybaord shortcuts

  useEffect(() => {
    slideShowLengh();
  },) 

  // Keyboard Hotkeys/Shortcuts 
  useEffect(() => {

    const handleKeyDown = (event) => {
      switch(event.key) {
        case 'ArrowLeft':
        case 'h':
          prevSlide();
          break;
        case 'ArrowRight':
        case 'l':
          nextSlide();
          break;
          // somehow only sets to false 
        case 'p':
          setSlidesToggle();
          break;
        case 'Space':
          setPlayback();
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },);




  // #rev should only be one function
  function nextSlide(){
    setDirection(1)
    console.log('nextSlide')
    if(index === images.length -1){
      slideshowIndex(0);
      setIndex(0)
    } else {
      slideshowIndex(index + 1);
      setIndex(index + 1);
    }
  }

  function prevSlide(){
    setDirection(-1)
    console.log('prevSlide')
    if(index === 0){
      slideshowIndex(images.length -1);
      setIndex(images.length -1)
    } else {
      slideshowIndex(index - 1);
      setIndex(index - 1);
    }
  }

  return (
    <div className="slideshow_div">

    <AnimatePresence 
    initial={false}
    custom={direction}
    >
    <figure className="slideshow_fig">

    <motion.img
    className={`slideshow_img ${!sToggle ? 'slideshow_plan' : ''}`} 
    variants={animation_variants}
    initial="i"
    animate="a"
    exit="e"
    key={images[index]}
    custom={direction}
    src={images[index]}
    alt={alts[index]} 
    /> 

    <figcaption>{alts[index]}</figcaption>

    <button className="slideshow_btn btn_prev" onClick={prevSlide} > ◀️ vorheriges Bild </button>
    <button className="slideshow_btn btn_next" onClick={nextSlide} > ▶️ nächstes Bild </button>

    </figure>
    </AnimatePresence>
    </div>
  )
}
export default Slideshow
