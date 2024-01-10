import {
  stateSlideshowIndex,
  stateSlideshow,
  stateModal,
  slideshowCurrentAlt,
} from "../states.jsx";
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
      <p className="read_more link">
        <a href="#" onClick={() => toggleModal()}>
          mehr lesen
        </a>
      </p>
      <div class="project_navigation">
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
      <p className="link center">
        <a href="/">Kehre zur Galerie zurück</a>
      </p>
    </div>
  );
}
