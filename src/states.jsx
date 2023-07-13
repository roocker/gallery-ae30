import { atom } from 'nanostores';

import { getCollection } from 'astro:content';
const allProjects = await getCollection('projects');

export const stateMainNav = atom(false);

// Grid
export const stateSelectedCat = atom("all");
export const stateSelectedTag = atom("all");
export const stateSelectedYear1 = atom(0);
export const stateSelectedYear2 = atom(0); //rev 2023 sollte immer aktuelles Jahr sein!
export const stateSelectedSize1 = atom(0);
export const stateSelectedSize2 = atom(0);

// export const stateSelectedCatProjs = atom();

export const stateSelCatIndex = atom();
export const stateCurrentProjs = atom(allProjects); //hier sollte standard allProjects geladen werden 

// Modal
export const stateModal = atom(false);

// Slideshow
export const stateSlideshowIndex = atom(0);
export const stateSlideshowDirection = atom(1);
export const slideshow_length = atom(1);
export const slideshowCurrentAlt = atom();

export const stateSlideshow = atom(true);
// #rev default value should control via CMS
export const statePlayback = atom(false);
export const stateSlideshowZoom = atom(false);
export const slideshowAutoPlayInterval = atom();



// Should use unsubscribe or comment out later!
/* stateSelectedCat.subscribe((newValue) => {
    console.log('States: stateSelectedCat updated:', newValue);
  })

stateSelectedCatProjs.subscribe((newValue) => {
    console.log('States: stateSelectedCatProjs updated:', newValue);
  }) */


/*
  
stateMainNav.subscribe((newValue) => {
    console.log('States: stateMainNav updated:', newValue);
  })

slideshowCurrentAlt.subscribe((newValue) => {
  console.log('States: currentAlt updated:', newValue);
})
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
stateSlideshowZoom.subscribe((newValue) => {
  console.log('States: SlideshowZoom updated:', newValue);
}); */
