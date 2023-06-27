import { atom } from 'nanostores';

export const stateModal = atom(false);

export const slideshow_index = atom(1);
export const slideshow_length = atom(1);


/* export const togglePlayback = atom(() => {
  let pptoggle = false;
  function setPPtoggle(value) {
    togglePlayback.set(value);
  }
  togglePlayback.setPPtoggle = setPPtoggle;
}); */

export const stateSlideshow = atom(false);
export const statePlayback = atom(false);

/* export const toggleSlideshow = atom(() => {
  let stoggle = false;
  function setStoggle(value) {
    toggleSlideshow.set(value);
  }
}); */


// Should use unsubscribe or comment out later!
stateModal.subscribe((newValue) => {
  console.log('States: stateModal updated:', newValue);
})

slideshow_index.subscribe((newValue) => {
  console.log('States: slideshow_index updated:', newValue);
});
slideshow_length.subscribe((newValue) => {
  console.log('States: slideshow_length updated:', newValue);
});

stateSlideshow.subscribe((newValue) => {
  console.log('States: Slideshow updated (true = fotos , false = plans):', newValue);
});

statePlayback.subscribe((newValue) => {
  console.log('States: Playback updated:', newValue);
});
