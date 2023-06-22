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
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// const { pictures } = Astro.props;

/* const images = [
  '/media/24.jpg', 
  '/media/IMG_20220112_085913.jpg',
  '/media/IMG_20220112_085958.jpg',
  '/media/IMG_20220112_090306.jpg'
]

const titles = [
  "1", "2", "3", "4"
] */


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

// #rev should only be one function
  function nextSlide(){
    setDirection(1)
    if(index === props.images.length -1){
      setIndex(0)
      return
    };
    setIndex(index + 1);
  }

  function prevSlide(){
    setDirection(-1)
    if(index === 0){
      setIndex(props.images.length -1)
      return
    }
    setIndex(index - 1);
  }

  return (
    <div className="slideshow_div">

    <AnimatePresence initial={false} custom={direction}>
      <figure className="slideshow_fig">


        <motion.img
        className="slideshow_img"
        variants={animation_variants}
        initial="i"
        animate="a"
        exit="e"
        key={props.images[index]}
        custom={direction}
        src={props.images[index]}
        alt={props.titles[index]} 
        /> 

        <figcaption>{props.titles[index]}</figcaption>

      <button className="slideshow_btn btn_prev" onClick={prevSlide} > ◀️ vorheriges Bild </button>
      <button className="slideshow_btn btn_next" onClick={nextSlide} > ▶️ nächstes Bild </button>

      </figure>
    </AnimatePresence>


    </div>
  )
}
// <p class="reactcomp">{props.proj_title} - cool aber unnötig</p>
  // <map name="clickable">
  // <are shape="rect" 
export default Slideshow
