import { useStore } from "@nanostores/react";
import {
  slideshowCurrentAlt,
  stateSlideshow,
  stateSlideshowIndex,
} from "../states";
import "../styles/source.css";

function SlideshowAlt({ sources, sources_plans }) {
  const alt = useStore(slideshowCurrentAlt);
  const index = useStore(stateSlideshowIndex);
  const pToggle = useStore(stateSlideshow);

  return (
    <>
      {sources && (
        <span className="source">
          © {pToggle && <a href={sources[1][index]}>{sources[0][index]}</a>}
          {!pToggle && (
            <a href={sources_plans[1][index]}>{sources_plans[0][index]}</a>
          )}
        </span>
      )}
      <span className="slideshow_alt">{alt}</span>
    </>
  );
}
export default SlideshowAlt;
