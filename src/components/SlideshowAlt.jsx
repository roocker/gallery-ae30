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

  const [source, sourceurl] = pToggle
    ? [sources[0][index], sources[1][index]]
    : [sources_plans[0][index], sources_plans[1][index]];

  return (
    <div className="slide_title">
      {source && (
        <span className="source">
          {sourceurl && <a href={sourceurl} target="_blank">© {source}</a>}
          {!sourceurl && <>© {source}</>}
        </span>
      )}
      <span className="">{alt}</span>
    </div>
  );
}
export default SlideshowAlt;

/* {sources || sources_plans && (
        <span className="source">
          © {pToggle && <a href={sources[1][index]}>{sources[0][index]}</a>}
          {!pToggle && (
            <a href={sources_plans[1][index]}>{sources_plans[0][index]}</a>
          )}
        </span>
      )} */
