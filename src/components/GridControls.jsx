import { getCollection } from 'astro:content';
import '../styles/grid_controls.css'
import SlideshowCounter from './SlideshowCounter';
import { useStore } from '@nanostores/react';
import { stateCurrentProjs, stateSelCatIndex, stateSelectedCat, stateSelectedSize1, stateSelectedSize2, stateSelectedTag, stateSelectedYear1 as stateSelectedYear1, stateSelectedYear2,} from '../states';
import { useEffect, useState } from 'react';

const allProjects = await getCollection('projects');
const allCategories = await getCollection('categories');

// console.log(allProjects[0]);

// Get all categorie shorts from project collection

const allCatsFromProjs = [... new Set(allProjects.map((proj) => {return proj.data.category}))];

/*
  // TEST compare all allCatsFromProjs to categories collection 

  const allShortsFromCats = [... new Set(allCategories.map((cat) => {return cat.data.short}))];

if (JSON.stringify(allCatsFromProjs.sort()) == JSON.stringify(allShortsFromCats.sort())) {
  console.log("APP-TEST(successful):","allCatsFromProjs === allTitlesFromCats");
} else {
  console.log("APP-TEST(error):","found categories in projects not matching categories, pls check your projects for exact string on the category property.", allCatsFromProjs, "!=" , allShortsFromCats)
}

*/

// ----------------------------------
// define allCats for select options 
// ----------------------------------
const allTitlesFromCats = [... new Set(allCategories.map((cat) => {return cat.data.title}))];

const allCatsTitles = allTitlesFromCats.map(cat => cat.split(' ')[0]);
// console.log("allCatsTitles", allCatsTitles)

const allCatsURLs = [... new Set(allCategories.map((cat) => {return cat.data.short}))]
// console.log("allCatsURLs", allCatsURLs)


// ----------------------------------
// define allTags for select options; sort all Tags by lower/uppercase; Tags = Typologien
// ----------------------------------

const allTagsUnsorted = [...new Set(allProjects.flatMap((proj) => proj.data.project_keys?.tags ?? []))];

const allTags = [...allTagsUnsorted];

allTags.sort((a, b) => {
  const lowerA = a.toLowerCase();
  const lowerB = b.toLowerCase();
  const isLowerA = lowerA[0] === a[0];
  const isLowerB = lowerB[0] === b[0];

  if (isLowerA && !isLowerB) {
    return -1;
  } else if (!isLowerA && isLowerB) {
    return 1;
  } else {
    return lowerA.localeCompare(lowerB);
  }
});

// console.log("allTags", allTags);

// ----------------------------------
// define allYears
// ----------------------------------
// min
// max

// ----------------------------------
// define allSizes
// ----------------------------------
// min
// max


function GridControls (props) {

  let defaultCat; props.defaultCat ? defaultCat = props.defaultCat : "all";
  const selectedCat = useStore(stateSelectedCat)

  let defaultTag; props.defaultTag ? defaultTag = props.defaultTag : "all";
  const selectedTag = useStore(stateSelectedTag);

  let defaultYear1 = props.defaultYear1;
  const selectedYear1 = useStore(stateSelectedYear1);
  defaultYear1 !== 0 ? stateSelectedYear1.set(defaultYear1) : ''
  // console.log("defaultYear1" , defaultYear1, "selectedYear1" ,selectedYear1)

  let defaultYear2 = props.defaultYear2;
  const selectedYear2 = useStore(stateSelectedYear2);
  defaultYear2 !== 0 ? stateSelectedYear2.set(defaultYear2) : ''
  // console.log("defaultYear2" , defaultYear2, "selectedYear2" ,selectedYear2)
  
  let defaultSize1 = props.defaultSize1;
  const selectedSize1 = useStore(stateSelectedSize1);
  defaultSize1 !== 0 ? stateSelectedSize1.set(defaultSize1) : ''
  // console.log("defaultSize1" , defaultSize1, "selectedSize1" ,selectedSize1)

  let defaultSize2 = props.defaultSize2;
  const selectedSize2 = useStore(stateSelectedSize2);
  defaultSize2 !== 0 ? stateSelectedSize2.set(defaultSize2) : ''
  // console.log("defaultSize2" , defaultSize2, "selectedSize2" ,selectedSize2)








  const currentProjs = useStore(stateCurrentProjs)

  // console.log(defaultYear)



  const handleCategoryChange = (e) => {
    stateSelectedCat.set(e.target.value)
    // console.log("e.target.value", e.target.value)
  };

  const handleTagChange = (e) => {
    stateSelectedTag.set(e.target.value)
  }


  // ---------------------------------------------- 
  // filter Function
  // ---------------------------------------------- 



  const params = {
    cat: selectedCat,
    // tags: ["wohnen", "privat"] 
    tags: selectedTag,
    year1: selectedYear1,
    year2: selectedYear2,
    size1: selectedSize1,
    size2: selectedSize2
  };

  console.log( "FILTER PARAMS !!!!!!" , params);


  let rmIndices = [];
  function filterProjectsByCriteria(allProjects, criteria) {
    rmIndices = allProjects.reduce((rmIndices, project, index) => {
      const projectTitle = project.data.title
      const { cat, tags, year1, year2, size1, size2 } = criteria;
      const projectYear1 = parseInt(project.data.project_keys.year);
      const projectYear2 = parseInt(project.data.project_keys.year2);
      const projectSize = parseInt(project.data.project_keys.area);

      const hasCat = cat && cat !== "all" ? project.data.category === cat : true;
      const hasTag = tags && tags !== "all" ? project.data.project_keys.tags.includes(tags) : true;

      const inYearRange = year2 && year2 !== 0 ? (projectYear1 <= year1 || projectYear2 <= year2 || projectYear1 == year2 || projectYear2 == year1 ) : true;

     
      const inSizeRange = size2 && size2 !== 0 ? (size1 <= projectSize && projectSize <= size2) : true;

       
        /* if(year1){
        console.log( "year1", year1, "vorhanden" )
        }
        if(year2 ){
        console.log( "year2", year2, "vorhanden" )
        } */

        /* if(size1){
        console.log( "size1", size1, "vorhanden" )
        }else{console.log("size1 NOT" , size1)}
        if(size2){
        console.log( "size2", size2, "vorhanden" )
        } */

      // console.log("CAT", hasCat)

      /* if ( size1 <= projectSize && projectSize <= size2){
        console.log("wahr");
      } else { console.log("falsch")
      } */

        // console.log(index, projectTitle , ":", "hasCat" , hasCat , "hasTag" , hasTag , "inYearRange" , inYearRange , "inSizeRange", inSizeRange)
      
      // console.log("projSIZE", typeof projectSize)
      // console.log("SIZE", typeof size1)
      //  console.log("SIZE2", typeof size2)
      // console.log("Year1", typeof projectYear1)

      if ( hasCat && hasTag && inYearRange && inSizeRange ) {
        rmIndices.push(index);
      }
      return rmIndices;
    }, []);
    return rmIndices;
  }

  // console.log(allProjects[0].data.title)
  // console.log(allProjects[0].data.project_keys.area)
  filterProjectsByCriteria(allProjects, params);


  let projs = [];
  const filterProjects = () => {
    projs = allProjects.filter((_,index) => rmIndices.includes(index));
    stateCurrentProjs.set(projs);
  }

  useEffect(() => {
    filterProjects();
    console.log( "USEEFFECT!" , selectedSize2)

    console.log('Projekte', currentProjs , 'gem. Parameter:' , params);
    
  },[selectedCat, defaultCat, selectedTag, defaultCat, selectedYear1, defaultYear1, selectedYear2, defaultYear2,selectedSize1, defaultSize1, selectedSize2, defaultSize2])





    //  https://zillow.github.io/react-slider/




    return(
      <section className="controls" aria-label="Image Grid Controls">
      <p className="line test">filter: {selectedCat}, {selectedTag}, {selectedYear1}, {selectedYear2} {selectedSize1}, {selectedSize2} </p>

      <select
      className="select_cat"
      onChange={handleCategoryChange}
      defaultValue={defaultCat}
      >
      <option value="all">Kategorie</option>
      {allCatsTitles.map((cat, indexCat) => (
        <option
        key={indexCat}
        value={allCatsURLs[indexCat]}
        >
        {cat}
        </option>
      ))}
      </select>

      <select
      className="select_tag"
      onChange={handleTagChange}
      defaultValue={defaultTag}
      >
      <option value="all">Typologie</option>
      {allTags.map((tag, indexTag) => (
        <option
        key={indexTag}
        value={tag}
        >
        {tag}
        </option>
      ))}
      </select>



    

      <p className="line counter_line">
      <span className="counter_number index">
      {`${currentProjs ? currentProjs.length.toString().padStart(2, '0') : '00'}`}
      </span> / <span className="counter_number length">{allProjects.length}</span>
      </p>
      </section>
    )


}
export default GridControls
  /* <div className="range">
      <div className="range-slider">
      <span className="range-selected"></span>
      </div>
      <div className="range-input">
      <label for="filter_year_from">Jahres Filter von</label>
      <input
      id="filter_year_from"
      type="range"
      className="min"
      min="1980"
      max="2023"
      // value="300"
      step="1"
      />
      <label for="filter_year_until">Jahres Filter bis</label>
      <input
      type="range"
      id="filter_year_until"
      name="filter_year_until"
      className="max"
      min="1980"
      max="2023"
      // value="700"
      step="1"
      />
      </div>
      </div> 


      <div className="range">
      <div className="range-slider">
      <span className="range-selected"></span>
      </div>
      <div className="range-input">
      <label for="filter_size_from">Größe Filter von</label>
      <input
      id="filter_size_from"
      type="range"
      className="min"
      min="1980"
      max="2023"
      // value="300"
      step="1"
      />
      <label for="filter_size_until">Größe Filter bis</label>
      <input
      type="range"
      id="filter_size_until"
      name="filter_size_until"
      className="max"
      min="1980"
      max="2023"
      // value="700"
      step="1"
      />
      </div>
      </div> 
*/
