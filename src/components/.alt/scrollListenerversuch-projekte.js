
  const carousel = document.getElementById('project_presentation');

carousel.addEventListener('MouseWheel', (event) => {
  event.preventDefault();

  carousel.scrollBy({
    left: event.deltaY < 0 ? -30 : 30,
  });
});

