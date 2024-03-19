/* 
TODO
- [x] images sizes and resolutions!!!! no @astro/images here!
  - Is the answer here?: All images in Slideshow are max-res anyway, cause most detailed?
  - Or can we use generated images from @astro/images, already generated for grid gallery on build? (hardlinkS?)

- [x] animate it 

- [ ] image preloading! --> index?!
- [ ] need to set index to current index for page reload!?

- [ ] Mouse Click and drag left/right =  prev/next
- [ ] Touch swipe left right? = prev/next

- [ ] simplify next/prevSlide funcitons into one funciton

- [ ] Zoomed View on Click or on Click Button Zoom ?!
*/

import "../styles/slideshow.css";
import React, { useState, useEffect, useRef, } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

import { useStore } from '@nanostores/react';
import { slideshow_length, stateSlideshow, statePlayback, stateSlideshowIndex, stateSlideshowDirection, slideshowCurrentAlt, slideshowAutoPlayInterval, stateSlideshowZoom } from '../states.jsx';

const slideanimation = {
  enter: (direction) =>  { 
    return{
      x: direction > 0 ? 1000 : -1000,
      zIndex: 2,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return{
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
}

const animation_zoom = {
  i:{
    minHeight: "0vh",
    minWidth: "0vw",
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
  a:{
    minHeight: "100vh", 
    minWidth: "100vw", 
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}


function Slideshow(props) {
  
  const index = useStore(stateSlideshowIndex)
  const direction = useStore(stateSlideshowDirection)

  //Toggle for Images/Plans
  const sToggle = useStore(stateSlideshow);
  const setSlidesToggle = () => {
    stateSlideshow.set(!sToggle);
    stateSlideshowZoom.set(false);
  }

  let images = sToggle ? props.pictures : props.plans;
  let alts = sToggle ? props.pictureTitles : props.planTitles;
  ;
  
  // console.log("images to work with", images)

  //Toggle for Zoom
  const zToggle = useStore(stateSlideshowZoom);
  const setZoomToggle = () => {
    stateSlideshowZoom.set(!zToggle);
  }

  // change Controls color on Plan/Picture Toggle
  useEffect(() => {
    const footerControls = document.querySelector(".controls");
    footerControls.style.color = sToggle ?  'var(--cwhite)' : 'var(--cgrey)';
    footerControls.style.color = zToggle && sToggle ?  'var(--cwhite)' : 'var(--cgrey)';
  }, [sToggle, zToggle]) 

  // export current States for counter etc.
    useEffect(() => {
  const exportToStates = () => {
    slideshow_length.set(images.length);
    slideshowCurrentAlt.set(alts[index]);
    slideshowAutoPlayInterval.set(props.autoPlayInterval);
    // console.log(interval)

      }
      exportToStates();
    }, [images], [index])
  

  // Keyboard Hotkeys/Shortcuts
  useEffect(() => {

    const handleKeyDown = (event) => {
      switch(event.key) {
        case 'ArrowLeft':
        case 'h':
          prevSlide(event);
          break;
        case 'ArrowRight':
        case 'l':
          nextSlide(event);
          break;
          // somehow only sets to false 
        case 'p':
          setSlidesToggle();
          stateSlideshowIndex.set(0);
          break;
        case ' ':
        case 'w':
          togglePlayback();
          break;
        case 'z':
          setZoomToggle();
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

  // Auto Playback 

  const pToggle = useStore(statePlayback);
  const togglePlayback = () => {
    statePlayback.set(!pToggle);
  }

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  })

  useEffect(() => {
    const play = () => {
     const dummyEvent = { stopPropagation: () => {} };
      autoPlayRef.current(dummyEvent)
    }
    if(props.autoPlayInterval > 0 && pToggle){
      const interval = setInterval(play, props.autoPlayInterval * 1000);
      return () => clearInterval(interval);
    };
  }, [props.autoPlayInterval, pToggle])


  // Next- & Prev Slide functions
  // #rev should only be one function
  function nextSlide(event){
    event.stopPropagation();
    stateSlideshowDirection.set(1)
    if(index === images.length -1){
      stateSlideshowIndex.set(0)
    } else {
      stateSlideshowIndex.set(index + 1);
    }
  }

  function prevSlide(event){
    event.stopPropagation();
    stateSlideshowDirection.set(-1)
    if(index === 0){
      stateSlideshowIndex.set(images.length -1)
    } else {
      stateSlideshowIndex.set(index - 1);
    }
  }

  // Zoom Drag

  /* const img = document.querySelector('.slideshow_img');
  maxDelta = window.innerWidth; */

    const zoomDragDown = (e) => {
      console.log('zoomDraaaaag')
      if (e instanceof MouseEvent) {
        const downXval = e.clientX;
        console.log("x:",downXval)
      }
    }
  const zoomDragMove = (e) =>{
    
      console.log('zoomMooove')
    if (e instanceof MouseEvent) {
      const moveXval = e.clientX;
      console.log("x:", moveXval)
    }
  }

  console.log('index:', index, 'direction:', direction)
    
  return (
    <>
    <AnimatePresence initial={false} custom={direction}> 
    <motion.figure
    className={`slideshow_fig ${!zToggle ?'slidshow_fig_zoomed_out' : ''}`}

    key={index}
    variants={slideanimation}
    custom={direction}

    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
    }}

    onAnimationStart={ () => console.log("figure animation started", "index:", index, "direction:", direction)}
    onAnimationComplete={ () => console.log("figure animation completed", "index:",index)}
    >

    <motion.img
    className="slideshow_img" 

    key={index}
    src={images[index]}
    alt={alts[index]} 
    onClick={setZoomToggle}

    variants={animation_zoom}
    animate={zToggle ? "a" : "i"}
    initial={zToggle ? "a" : "i"}
    exit="e"
    onAnimationComplete={ () => console.log("img animation completed")}



    draggable={false}
    /> 


    <figcaption>{alts[index]}</figcaption>
    </motion.figure>
    </AnimatePresence>

    <button className="slideshow_btn btn_prev" onClick={prevSlide}> ◀️ vorheriges Bild </button>
    <button className="slideshow_btn btn_next" onClick={nextSlide} > ▶️ nächstes Bild </button>

    </>
  )
}

export default Slideshow;
