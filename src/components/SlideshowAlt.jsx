import { useStore } from '@nanostores/react';
import { slideshowCurrentAlt } from '../states';

function SlideshowAlt() {

  const alt = useStore(slideshowCurrentAlt);
  return (
    <span className="slideshow_alt">{alt}</span>
  )
}
export default SlideshowAlt;

