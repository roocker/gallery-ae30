import '../styles/logo.css';
import React, { useEffect } from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const rotate_variants = {
  i:  { 
    rotate: 0,
    opacity: .8,
  },
  a: (i) => {
    const delay = i * 0.5;
    return {
    rotate: 360,
    opacity: .8,
    originX: "50%",
    originY: "52%",
    transition: {
      rotate: { 
        delay,
        duration: .2,
        type: "spring",
        stiffness: 250,
        damping: 10,
      } },
    }
  },
  t: { 
    rotate: [null, 360],
    transition: { 
      rotate: { 
        duration: .2,
        type: "spring",
        stiffness: 250,
        damping: 10,
      } },
  },
  h: {
    opacity: 1,
    rotate: [ null, 10, -10 , 0],
    transition: {
      duration: .2,
      type: "spring",
      stiffness: 250,
      bounce: 1,
        // damping: 10,
    }
  },
  e: {
    opacity: 0,
  }
}

const path_variants = {
  i: { 
    opacity:0,
    pathLength:0,
    color:"var(--cwhite)"

  },
  a: (i) => {
    const delay = 1 + i * 0.5;
    return {
    opacity: 1,
    pathLength: [null , 1, 0],
    color:"var(--cblack)",
    transition: {
      color: {
        delay,
        duration: 1.5,
      },
      pathLength: {
        delay,
        duration: 1.5,
        type: "spring",
        stiffness: 250,
      },
      }
    }
  },
    e:{
      pathLength:0,
    }
  }

// onClick="menuToggle"

function Logo (){

  // Keyboard Hotkeys/Shortcuts
  useEffect(() => {

    const handleKeyDown = (event) => {
      switch(event.key) {
        case 'm':
          toggleMenu();
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


 const toggleMenu = () => {
   /* const nav = document.getElementById('mainnav');
   nav.classList.toggle('menue_hidden'), */
    document.getElementById('mainnav')?.classList.toggle('menue_hidden');
   /* nav.animate(
     {top: 200, display: block},
     {duration: 1200, fill: "forwards"}

   ) */
  }; 

  return (
    <h1>
    <span>AE30 Architekten - Kratochwil Gerhard, Waldbauer Peter, Zeinitzer Klaus</span>
    <a className="link" onClick={toggleMenu}>
    <AnimatePresence>
    <motion.svg
    className="logo svg-logo-use"
    custom={7}
    variants={rotate_variants}
    whileTap="t"
    whileHover="h"
    onHoverEnd="i"
    whileDrag="h"
    initial="i"
    animate="a"
    exit="e" 
    viewBox="0 0 128 128"
    >

    <g className="lg">
    <motion.path
    className="lpath A"
    custom={1}
    variants={path_variants}
    initial="i"
    animate="a"
    exit="e"
    d="M 179.2082,0.0022831 H 118.56063 L 34.000076,228.80236 h 41.14706 0.3672 L 95.48302,174.76467 h 106.80279 l 19.96878,54.03769 h 0.36088 41.14082 z M 109.5765,136.6377 148.88109,30.272156 188.19232,136.6377 Z" />

    <motion.path
    className="lpath E"
    custom={1.5}
    variants={path_variants}
    initial="i"
    animate="a"
    exit="e"
    d="m 308.38107,190.8188 h 128.81626 v 37.98118 H 308.38107 269.04467 V 6.713e-5 H 431.08794 L 437.19733,36.968461 H 308.38107 V 89.530894 H 412.09402 V 127.51208 H 308.38107 Z" />


    <motion.path
    className="lpath 3"
    custom={2.5}
    variants={path_variants}
    initial="i"
    animate="a"
    exit="e"
    d="m 203.69848,376.13389 c -3.80496,-7.97128 -8.84499,-14.72029 -14.9862,-20.07657 -6.12886,-5.35011 -13.32756,-9.364 -21.3805,-11.94718 -4.33061,-1.37373 -8.72486,-2.37424 -13.13144,-3.03238 l 52.63831,-58.51408 V 244.46854 H 34.000931 l 6.286957,38.09514 H 148.56579 l -45.28149,50.492 0.0631,37.36721 h 23.8056 c 12.15611,0 22.41282,2.87473 30.47906,8.54726 8.54109,6.02772 12.8717,15.54985 12.8717,28.30758 0,11.78858 -3.91939,21.4883 -11.64992,28.8133 -7.66689,7.26232 -18.58222,10.94049 -32.4416,10.94049 -16.151,0 -28.54121,-4.74847 -36.841551,-14.10583 -8.154753,-9.1997 -12.282748,-20.25416 -12.282748,-32.86564 v -8.62989 H 38.375852 v 10.78854 c 0,10.92768 2.076666,21.40615 6.153995,31.16902 4.083691,9.77569 10.028787,18.53189 17.638984,26.00884 7.610197,7.5026 17.012186,13.4985 27.946508,17.83007 11.009821,4.34011 23.476001,6.5529 37.037661,6.5529 13.34655,0 25.34453,-1.97062 35.63259,-5.85963 10.2059,-3.85386 18.87377,-9.1845 25.76192,-15.83855 6.83781,-6.60988 12.06778,-14.52417 15.56266,-23.52729 3.52005,-9.07909 5.30548,-19.1207 5.30548,-29.83326 v -4.33014 c 0,-10.83318 -1.91839,-20.34249 -5.71717,-28.25677" />

    <motion.path
    className="lpath 0"
    custom={4}
    variants={path_variants}
    initial="i"
    animate="a"
    exit="e"
    d="m 335.11501,284.98826 c 41.92574,0 76.02599,35.29069 76.02599,78.6728 0,43.38162 -34.10025,78.67897 -76.02599,78.67897 -41.91957,0 -76.026,-35.29735 -76.026,-78.67897 0,-43.38211 34.10643,-78.6728 76.026,-78.6728 m 0,-41.43808 c -64.8704,0 -117.46455,53.77795 -117.46455,120.11088 0,66.33909 52.59415,120.11847 117.46455,120.11847 64.87657,0 117.46454,-53.77938 117.46454,-120.11847 0,-66.33293 -52.58797,-120.11088 -117.46454,-120.11088" />

    </g>
    </motion.svg>

    </AnimatePresence>
    </a>
    </h1> 
  )}
  // <img src="/logo.svg#logo_symbol" alt=""/>

export default Logo

