  // change Controls color on Plan/Picture Toggle
  useEffect(() => {
    const footerControls = document.querySelector(".controls");
    footerControls.style.color = sToggle ?  'var(--cwhite)' : 'var(--cgrey)';
    footerControls.style.color = zToggle && sToggle ?  'var(--cwhite)' : 'var(--cgrey)';
  }, [sToggle, zToggle]) 



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




  //Toggle for Images/Plans
  const sToggle = useStore(stateSlideshow);
  const setSlidesToggle = () => {
    stateSlideshow.set(!sToggle);
    stateSlideshowZoom.set(false);
  }

  
  // console.log("images to work with", images)

  //Toggle for Zoom
  const zToggle = useStore(stateSlideshowZoom);
  const setZoomToggle = () => {
    stateSlideshowZoom.set(!zToggle);
  }

  // export current States for counter etc.
    const exportToStates = () => {
      slideshow_length.set(images.length);
      slideshowCurrentAlt.set(alts[index]);
      slideshowAutoPlayInterval.set(props.autoPlayInterval);
    }
  exportToStates();



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

//USE STATE SHIT HERE

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1)

  function nextSlide(event){
    event.stopPropagation();
    setDirection(1)
    stateSlideshowDirection.set(1)
    if(index === images.length -1){
      setIndex(0)
      stateSlideshowIndex.set(0)
    } else {
      setIndex(index+1)
      stateSlideshowIndex.set(index + 1);
    }
  }

  function prevSlide(event){
    event.stopPropagation();
    setDirection(-1)
    stateSlideshowDirection.set(-1)
    if(index === 0){
      setIndex(images.length -1)
      stateSlideshowIndex.set(images.length -1)
    } else {
      setIndex(index -1)
      stateSlideshowIndex.set(index - 1);
    }
  }

