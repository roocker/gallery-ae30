import {
  stateSlideshowIndex,
  stateSlideshow,
  stateModal,
  slideshowCurrentAlt,
  stateSlideshowZoom2,
  stateZoomComplete,
} from "../states";
import SimilarProjects from "./SimilarProjects.jsx";
import "../styles/summary.css";

export default function ProjectSummary(props) {
  // console.log("summary,picture", props.pictureTitles);
  // console.log("pläne:", props.planTitles);

  const children = props.children;
  const pictureTitles = props.pictureTitles;
  const planTitles = props.planTitles;

  const setIndexFotos = i => {
    stateSlideshow.set(true);
    stateSlideshowIndex.set(i);
  };
  const setIndexPlans = i => {
    stateSlideshow.set(false);
    stateSlideshowIndex.set(i);
  };
  const toggleModal = () => {
    stateModal.set(true);
  };

  const exportToStates = () => {
    slideshowCurrentAlt.set("Zusammenfassung");
  };
  exportToStates();

  return (
    <div className="project_summary">
      {children}
      <button className="read_more link center">
        <a href="#" onClick={() => toggleModal()}>
          mehr lesen
        </a>
      </button>
      <div className="project_navigation">
        <ol>
          <h3> Fotos </h3>
          {pictureTitles.map((img, i) => (
            <li key={img}>
              <a href="#" onClick={() => setIndexFotos(i)}>
                {img}
              </a>
            </li>
          ))}
        </ol>
        {planTitles && (
          <>
            <ol>
              <h3> Pläne </h3>
              {planTitles.map((img, i) => (
                <li key={img}>
                  <a href="#" onClick={() => setIndexPlans(i)}>
                    {img}
                  </a>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
      <h2>Ähnliche Projekte</h2>
      <SimilarProjects
        items="4"
        currentProj={props.currentProj}
        allProjects={props.allProjects}
      />
      <div className="link_nav">
        <button className="link ">
          <a
            onClick={() => {
              stateSlideshowZoom2.set(0);
              stateZoomComplete.set(false);
            }}
          >
            Projekt Übersicht
          </a>
        </button>
        <button className="link ">
          <a href="/">Kehre zur Galerie zurück</a>
        </button>
      </div>
    </div>
  );
}
