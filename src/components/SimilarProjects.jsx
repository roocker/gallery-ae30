// import { getCollection } from "astro:content";

// const allProjects = await getCollection("projects");

export default function SimilarProjects(props) {
  let items = props.items;
  // let currentProj = props.currentProj;
  const allProjects = props.allProjects;
  console.log("allprojects ", allProjects);

  let currentProj = allProjects.find(p => p.slug === props.currentProj);

  console.log("items ", items);
  console.log("currentProj ", currentProj);

  let tagsOfCurrentProj = currentProj.data.project_keys.tags;

  console.log("tagsOfCurrentProj", tagsOfCurrentProj);

  let similarProjects = allProjects
    .filter(proj => proj.slug !== currentProj.slug)
    .map(proj => {
      let matchingTags = proj.data.project_keys.tags.filter(tag =>
        tagsOfCurrentProj.includes(tag)
      );

      return {
        proj,
        matchingTagsCount: matchingTags.length,
      };
    });

  similarProjects.sort((a, b) => b.matchingTagsCount - a.matchingTagsCount);
  similarProjects = similarProjects.slice(0, items);

  console.log("Similar projects:", similarProjects);

  const test = similarProjects.map(p => p.proj.data.titleimg.img.src);
  console.log("test", test);

  return (
    <div className="similar_projects">
      <ul>
        {similarProjects.map(p => (
          <li key={p.proj.slug}>
            <a href={`../${p.proj.data.category}/${p.proj.slug}`}>
              <figure>
                <img src={p.proj.data.titleimg.img.src} />
                <figcaption>{p.proj.data.title_l}</figcaption>
              </figure>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
