import { atom } from 'nanostores';


// Modal
export const stateModal = atom(false);

// Slideshow

export const stateSlideshowIndex = atom(0);
export const stateSlideshowDirection = atom(0);

export const slideshow_length = atom(1);

export const stateSlideshow = atom(true);
export const statePlayback = atom(false);


// Should use unsubscribe or comment out later!
stateModal.subscribe((newValue) => {
  console.log('States: stateModal updated:', newValue);
})


stateSlideshowIndex.subscribe((newValue) => {
  console.log('States: SlideshowIndex updated:', newValue);
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
