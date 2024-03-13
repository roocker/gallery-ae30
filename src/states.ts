import { atom } from "nanostores";

import { CURRENTYEAR } from "./consts";
export const stateMainNav = atom(false);

export const stateSelectedCat = atom("all");
export const stateSelectedTag = atom("all");
export const stateSelectedYear1 = atom(1980);
export const stateSelectedYear2 = atom(CURRENTYEAR);
export const stateSelectedSize1 = atom(0);
export const stateSelectedSize2 = atom(10000);

export const stateCurrentProjs = atom(0);

export const stateFilter = atom(false);
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
export const stateSlideshowZoom2 = atom(0);
export const stateZoomComplete = atom(false);
export const slideshowAutoPlayInterval = atom();

// ----------------------------------------------
// Remove Filter with button or CMS
// ----------------------------------------------
export const handleRemoveFilter = () => {
  stateSelectedCat.set("all");
  stateSelectedTag.set("all");
  stateSelectedYear1.set(1980);
  stateSelectedYear2.set(CURRENTYEAR);
  stateSelectedSize1.set(0);
  stateSelectedSize2.set(10000);
  console.log(
    "Removed all Filters",
    stateSelectedCat.get(),
    stateSelectedTag.get(),
    stateSelectedYear1.get(),
    stateSelectedYear2.get(),
    stateSelectedSize1.get(),
    stateSelectedSize2.get()
  );
};

export const handleToggleFilter = () => {
  stateFilter.set(!stateFilter.get());
};

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
