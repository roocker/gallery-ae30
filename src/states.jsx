import { atom } from 'nanostores';

export const modalOpen = atom(false);
// export const img_plan_toggle = atom(false);

export const slideshow_index = atom(1);
export const slideshow_length = atom(1);

export const toggleSlideshow = atom(() => {
  let toggle = true;
  function setToggle(value) {
    toggle = value;
    toggleSlideshow.set(toggle);
  }
  toggleSlideshow.setToggle = setToggle;
});

// Should use unsubscribe or comment out later!
modalOpen.subscribe((newValue) => {
  console.log('States: modalOpen updated:', newValue);
})

slideshow_index.subscribe((newValue) => {
  console.log('States: slideshow_index updated:', newValue);
})
slideshow_length.subscribe((newValue) => {
  console.log('States: slideshow_length updated:', newValue);
})
toggleSlideshow.subscribe((newValue) => {
  console.log('States: toggleSlideshow updated:', newValue);
})
