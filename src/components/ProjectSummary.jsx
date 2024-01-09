import { stateSlideshowIndex, stateSlideshow, stateModal } from "../states.jsx";
import SimilarProjects from "./SimilarProjects.jsx";

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

  return (
    <div className="project_summary">
      {children}

      <p className="read_more">
        <a href="#" onClick={() => toggleModal()}>
          mehr lesen...
        </a>
      </p>

      <h3> Fotos </h3>
      <ol>
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
          <h3> Pläne </h3>
          <ol>
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

      <h2>Ähnliche Projekte:</h2>
      <SimilarProjects items="4" currentProj={props.currentProj} />
      <h2>
        <a href="/">Kehre zur Galerie zurück</a>
      </h2>
    </div>
  );
}
