import { getCollection } from 'astro:content';
import '../styles/grid_controls.css'
import SlideshowCounter from './SlideshowCounter';
import { useStore } from '@nanostores/react';
import { stateCurrentProjs, stateSelCatIndex, stateSelectedCat, stateSelectedSize, stateSelectedTag, stateSelectedYear,} from '../states';
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


// -------------------------------------------------------------------------------------
// define allCats for select options 
// -------------------------------------------------------------------------------------
const allTitlesFromCats = [... new Set(allCategories.map((cat) => {return cat.data.title}))];

const allCatsTitles = allTitlesFromCats.map(cat => cat.split(' ')[0]);
// console.log("allCatsTitles", allCatsTitles)

const allCatsURLs = [... new Set(allCategories.map((cat) => {return cat.data.short}))]
// console.log("allCatsURLs", allCatsURLs)


// -------------------------------------------------------------------------------------
// define allTags for select options; sort all Tags by lower/uppercase; Tags = Typologien
// -------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------
// define allYears
// -------------------------------------------------------------------------------------


  function GridControls (props) {

    let defaultCat; props.defaultCat ? defaultCat = props.defaultCat : "all";
    const selectedCat = useStore(stateSelectedCat)
    const selCatIndex = useStore(stateSelCatIndex)


    let defaultTag; props.defaultTag ? defaultTag = props.defaultTag : "all";
    const selectedTag = useStore(stateSelectedTag);

    let defaultYear = props.defaultYear;
    const selectedYear = useStore(stateSelectedYear);

    let defaultSize = props.defaultSize;
    const selectedSize = useStore(stateSelectedSize);

    const currentProjs = useStore(stateCurrentProjs)
    


    const handleCategoryChange = (e) => {
      stateSelectedCat.set(e.target.value)
      // console.log("e.target.value", e.target.value)
    };

    const handleTagChange = (e) => {
      stateSelectedTag.set(e.target.value)
    }


// -------------------------------------------------------------------------------------
// filter Function
// -------------------------------------------------------------------------------------
 
/*
      const [selCatIndex, setSelCatIndex ] = useState(defaultCat)
      const [selTagIndex, setSelTagIndex ] = useState(defaultTag)
      const [selYearStartIndex, setSelYearStartIndex ] = useState(defaultYearStart)
      const [selYearEndIndex, setSelYearEndIndex ] = useState(defaultYearEnd)
      const [selSizeStartIndex, setSelSizeStartIndex ] = useState(defaultSizeStart)
      const [selSizeEndIndex, setSelSizeEndIndex ] = useState(defaultSizeEnd)

    let selectedIndecies;

  //filterProjsByIndex(selection to vgl with, source, )
  // filterProjsByIndex( selectedCat , _ , proj.data.category )

    function filterProjsByIndex(sel1, sel2, source) {
      let sel = sel2 - sel1

      const indecies = allProjects
        .map((proj, index) =>{
          
          if(sel2 != undefined){


          } else {
            // wenn sel1 = sel2
            // range = sel2 - sel1;
          }
        })

    }

    useEffect(() => {
      allProjects
      rmProjsByCat = allProjects
        .map((proj, index) =>{
          if(proj.data.category === selectedCat){
            return index;
          } else if(selectedCat == "all"){
            return index;
          }
          return null;
        })
        .filter((index) => index !== null);

      rmProjsByCat ? stateSelCatIndex.set(indeciesBySelCat) : console.log("ERROR IndeciesBySelCat empty");

      rmProjsByTag
      rmProjsByYear
      rmProjsBySize
      rmIncies


      const filterProjs = () => {
        const projs = selCatIndex ? allProjs.filter((_,index) => selCatIndex.includes(index)) : projs = allProjs;
        stateCurrentProjs.set(projs);
        // selCatIndex? console.log(selCat, ": i filtered out:", selCatIndex, "leaving us with projs:", projs) : console.log("no projects to filter")


      }
      filterProjs();

    },[selectedCat, defaultCat, selectedTag, defaultCat, selectedYear, defaultYear, selectedSize, defaultSize])


    */


   



    // ------------------------------------------ WORKS FOR CAT
    useEffect(() => {
      let indeciesBySelCat;
      if (selectedCat === undefined && defaultCat !== undefined){
        stateSelectedCat.set(defaultCat);
      } else if(selectedCat == undefined) {
        stateSelectedCat.set("all");
      }

        indeciesBySelCat = allProjects
          .map((proj, index) =>{
            if(proj.data.category === selectedCat){
              return index;
            } else if(selectedCat == "all"){
              return index;
            }
            return null;
          })
          .filter((index) => index !== null);
      
      indeciesBySelCat ? stateSelCatIndex.set(indeciesBySelCat) : console.log("ERROR IndeciesBySelCat empty");
      
      // console.log( "SelectedCat now: '", selectedCat , "' with projects Index:", stateSelCatIndex , "and those Projects:", currentProjs);

    }, [selectedCat , defaultCat])




//  https://zillow.github.io/react-slider/




    return(
      <section className="controls" aria-label="Image Grid Controls">
      <p className="line test">filter: {selectedCat}, {selectedTag}, {selectedYear}, {selectedSize}</p>

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



<div className="range">
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


      <p className="line counter_line">
      <span className="counter_number index">
{`${currentProjs ? currentProjs.length.toString().padStart(2, '0') : '00'}`}
</span> / <span className="counter_number length">{allProjects.length}</span>
      </p>
      </section>
    )


  }
export default GridControls
