import { stateSlideshowIndex } from "../states.jsx";
export default function ProjectSummary(props) {
  console.log("summary,picture", props.pictureTitles);
  console.log("pläne:", props.planTitles);

  const children = props.children;
  const pictureTitles = props.pictureTitles;
  const planTitles = props.planTitles;

  const setIndex = i => {
    console.log("MOOOVE", i);
    stateSlideshowIndex.set(i);
  };

  return (
    <div className="project_summary">
      {children}

      <h3> Fotos </h3>
      <ol>
        {pictureTitles.map((img, i) => (
          <li key={img}>
            <a href="#" onClick={() => setIndex(i)}>
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
                <a href="#" onClick={() => setIndex(i)}>
                  {img}
                </a>
              </li>
            ))}
          </ol>
        </>
      )}

      <h2>Ähnliche Projekte:</h2>
      <div className="summary_nav"></div>
      <h2>
        <a href="/">Kehre zur Galerie zurück</a>
      </h2>
    </div>
  );
}
