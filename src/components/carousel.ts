  // runs on client!
  // mouse slider
  // Prinzip:
  // <--- 100%(maxDelta)-----------54%(mouseDelta)--------------O%(mouseDownAt) --->

  //definiere carousel = section id image-carousel
  const carousel: HTMLElement | null = document.getElementById('image-carousel'); 
  if (!carousel) throw new Error("Carousel not found");

  //track x position maus + definiere handleOnDown f touch events
  const handleOnDown = (e:MouseEvent | TouchEvent) => {
    if(e instanceof MouseEvent){
      carousel.dataset.mouseDownAt = e.clientX.toString(); //why tostring? gpt bullshit?
    } 
    else if (e instanceof TouchEvent) {
      carousel.dataset.mouseDownAt = e.touches[0].clientX.toString(); }
    else if (e instanceof WheelEvent) {
      carousel.dataset.mouseDownAt = (e.clientX || -e.deltaX).toString();
    }
  }

  const handleOnUp = () => {
    // Problem: wenn wir klicken dann ist das mousedelta nicht mehr 0, also müssen wirs wieder 0 machen, wenn die maus released wird.
      carousel.dataset.mouseDownAt = "0";
    //speichern der prev%, wenn mouseup aus dem tracking/updaten v unten
    carousel.dataset.prevPercentage = carousel.dataset.percentage; 
  }

  // Mouse Position Listener +
  const handleOnMove = (e:MouseEvent | TouchEvent) => { 
    // weil der mouselistener noch nicht weiß wann die maus down ist wird immer translate gemacht, obwohl wir die maus noch nicht geklickt haben; -> wenn die start pos 0 ist, dann return (also code wird nicht ausgeführt). img braucht draggable = false; 
    if(carousel!.dataset.mouseDownAt === "0") return; 

    //current pos minus starting point:
    const mouseDelta = parseFloat(carousel.dataset.mouseDownAt) - e.clientX, 
      // halbe viewport width
      maxDelta = window.innerWidth / 1; 

    // delta durch maximal * 100 = pos in % links/rechts fix
    const percentage = (mouseDelta / maxDelta) * -100, 
      // neuer startpunkt, nicht 0 bei x-tem versuch, wenn schon bewegt wurde dann addieren wir diesen mit der neue distanz um nicht immer bei 0 anzufangen
    nextPercentageUnconstrained = parseFloat(carousel.dataset.prevPercentage) + percentage,
    //drag limitation
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained,0), -100);

    //updaten(tracking) der prev% f. weitergabe an onmouseup 
    carousel.dataset.percentage = nextPercentage; 

    //translate the carousel by calculated distance/percentage
    // anstelle CSS direkt updzudaten -> animation
    // carousel.style.transform = `translate(${nextPercentage}%, -50%)`;
    carousel.animate(
      { transform: `translate(${nextPercentage}%, -50%)` }, 
      {duration: 1200, fill: "forwards"},
    );

    // paralax effekt: für jedes bild definieren wir object-position % val
    for(const image of carousel.getElementsByClassName('titleimg')) {
      // nextPercentage geht von 0 bis -100% also 100% addieren
      // anstelle CSS direkt updzudaten (.style) -> animation (.animate)
      // image.style.objectPosition= `${nextPercentage + 100}%, 50%`;
      image.animate(
        {objectPosition: `${100 + nextPercentage}% center` },
        {duration: 1200, fill: "forwards"},
      )
    }
  }
  // Touch events
  window.onmousedown = e => handleOnDown(e);
  window.ontouchstart = e => handleOnDown(e.touches[0]);
  window.onmouseup = e => handleOnUp(e);
  window.ontouchend = e => handleOnUp(e.touches[0]);
  window.onmousemove = e => handleOnMove(e);
  window.ontouchmove = e => handleOnMove(e.touches[0]);

