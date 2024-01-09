import { getCollection } from "astro:content";

const allProjects = await getCollection("projects");
console.log("allprojects ", allProjects);

export default function SimilarProjects(props) {
  let items = props.items;
  // let currentProj = props.currentProj;

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

  const test = similarProjects.map(p => p.proj.data.titleimg.img);
  console.log("test", test);

  return (
    <div className="similar_projects">
      <ul>
        {similarProjects.map(p => (
          <li key={p.proj.slug}>{p.proj.slug}</li>
        ))}
      </ul>
    </div>
  );
}
