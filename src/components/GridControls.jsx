import { getCollection } from 'astro:content';

import { atom } from 'nanostores';

import '../styles/grid_controls.css'
import SlideshowCounter from './SlideshowCounter';
import { useStore } from '@nanostores/react';
import { stateCurrentProjs } from '../states';
import { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

const allProjects = await getCollection('projects');
const allCategories = await getCollection('categories');
const settings = await getCollection('settings');

const settingsFilter = settings[0].data.filter;

const settingFilterCat = settingsFilter.cat;
const settingFilterTag = settingsFilter.tag;
const settingFilterYear = settingsFilter.year;
const settingFilterSize = settingsFilter.size;

// console.log("Settings Filter:", settingsFilter , settingFilterCat );
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
// define allYears for Slider
// ----------------------------------
// min
// max

// ----------------------------------
// define allSizes for Slider
// ----------------------------------
// min
// max

  const minSize = 0;
  const maxSize = 10000;


// export const stateSelectedCatProjs = atom();


function GridControls (props) {


  // ---------------------------------------------- 
  // Parameter Definitions for Filter
  // ---------------------------------------------- 

  const defaultCat = settingFilterCat ? (props.defaultCat ? props.defaultCat : "all") : "all";
  const [selectedCat, setSelectedCat] = useState(defaultCat);

  const defaultTag = settingFilterTag ? (props.defaultTag ? props.defaultTag : "all") : "all";
  const [selectedTag, setSelectedTag] = useState(defaultTag);

  const defaultYear1 = settingFilterYear ? (props.defaultYear1 ? props.defaultYear1 : 0) : 0;
  const [selectedYear1 , setSelectedYear1] = useState(defaultYear1)
  // console.log("defaultYear1" , defaultYear1, "selectedYear1" ,selectedYear1)

  const defaultYear2 = settingFilterYear ? (props.defaultYear2 ? props.defaultYear2 : 0) : 0;
  const [selectedYear2 , setSelectedYear2] = useState(defaultYear2)
  // console.log("defaultYear2" , defaultYear2, "selectedYear2" ,selectedYear2)

  const defaultSize1 = settingFilterSize ? (props.defaultSize1 ? props.defaultSize1 : 0) : 0;
  const [selectedSize1 , setSelectedSize1] = useState(defaultSize1)
  // console.log("defaultSize1" , defaultSize1, "selectedSize1" ,selectedSize1)

  const defaultSize2 = settingFilterSize ? (props.defaultSize2 ? props.defaultSize2 : 0) : 0;
  const [selectedSize2 , setSelectedSize2] = useState(defaultSize2)
  // console.log("defaultSize2" , defaultSize2, "selectedSize2" ,selectedSize2)

  const currentProjs = useStore(stateCurrentProjs)



  // ---------------------------------------------- 
  // Event (User Input) Handlers 
  // ---------------------------------------------- 
  
  /*
  if(!settingFilterTag){ setSelectedTag("all"); }else { "" };
  if(!settingFilterYear){ setSelectedYear1(0); setSelectedYear2(0); }else { "" };
  if(!settingFilterSize){ setSelectedSize1(0); setSelectedSize2(0); }else { "" }; 
  */

  const handleCategoryChange = (e) => {
   setSelectedCat(e.target.value);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value)
  }

  const handleYearChange = (e) => {
    setSelectedYear1(e[0])
    setSelectedYear2(e[1])
    console.log(selectedYear1, selectedYear2)
  }

  const handleSizeChange = (e) => {
    setSelectedSize1(e[0])
    setSelectedSize2(e[1])
    console.log(selectedSize1, selectedSize2)
  }

  // console.log("HANDLEEESS AUCH OK?")
  
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

  // console.log( "FILTER PARAMS !!!!!!" , params);


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

      const inYearRange = year2 && year2 !== 0 ? (projectYear1 >= year1 && projectYear2 <= year2 ) : true;

      const inSizeRange = size2 && size2 !== 0 ? (size1 <= projectSize && projectSize <= size2) : true;
      // #rev projectSize >= 10000 also true

      // console.log(index, projectTitle , ":", "hasCat" , hasCat , "hasTag" , hasTag , "inYearRange" , inYearRange , "inSizeRange", inSizeRange)


      if ( hasCat && hasTag && inYearRange && inSizeRange ) {
        rmIndices.push(index);
      }
      return rmIndices;
    }, []);
    return rmIndices;
  }

  filterProjectsByCriteria(allProjects, params);


  let projs = [];
  const filterProjects = () => {
    projs = allProjects.filter((_,index) => rmIndices.includes(index));
    stateCurrentProjs.set(projs);
  }

  useEffect(() => {

    filterProjects();

    // console.log('Projekte', currentProjs , 'gem. Parameter:' , params);

  },[selectedCat, selectedTag, selectedYear1, selectedYear2, selectedSize1, selectedSize2])


  // ---------------------------------------------- 
  // Remove Filter with button or CMS
  // ---------------------------------------------- 
  const handleRemoveFilter = () => {
    setSelectedCat("all")
    setSelectedTag("all")
    setSelectedYear1(0)
    setSelectedYear2(0)
    setSelectedSize1(0)
    setSelectedSize2(0)
    console.log("Removed all Filters")
  }


  // ---------------------------------------------- 
  // Returns
  // ---------------------------------------------- 
  
  //  https://zillow.github.io/react-slider/
    
        // <p className="line test">filter: {selectedCat}, {selectedTag}, {selectedYear1}, {selectedYear2}, {selectedSize1}, {selectedSize2} </p>
      return(
        <section className="controls" aria-label="Image Grid Controls">

          <div className="line select_line">
        {settingFilterCat && (
          <select
          className="select select_cat"
          onChange={handleCategoryChange}
          defaultValue={defaultCat}
          >
          <option value="all">Kategorien (alle)</option>
    padding: 2px;
          {allCatsTitles.map((cat, indexCat) => (
            <option
            key={indexCat}
            value={allCatsURLs[indexCat]}
            >
            {cat}
            </option>
          ))}
          </select>
        )}

        {settingFilterTag && (
          <select
          className="select select_tag"
          onChange={handleTagChange}
          defaultValue={defaultTag}
          >
          <option value="all">Typologien (alle)</option>
          {allTags.map((tag, indexTag) => (
            <option
            key={indexTag}
            value={tag}
            >
            {tag}
            </option>
          ))}
          </select>
        )}
        </div>
          
        {settingFilterYear && (
          <div className="line">
          <label id="label-year">Jahr</label>
          <ReactSlider
          className="horizontal-slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          withTracks={true}
          defaultValue={[defaultYear1, defaultYear2]}
          onChange={handleYearChange}
          markClassName="slider-marks"
          marks={[1980 , 1990, 2000, 2010, 2020]}
          min={1980}
          max={2023}
          ariaLabelledby="label-year"
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={state => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          pearling
          minDistance={1}
          />
          </div>
        )}

        {settingFilterSize && (
          <div className="line">
          <label id="label-size">Fläche</label>
          <ReactSlider
          className="horizontal-slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          defaultValue={[defaultSize1, defaultSize2]}
          onChange={handleSizeChange}
          markClassName="slider-marks"
          marks={[0, 1000,2000,3000,4000,5000,6000,7000,8000,9000, 10000]}
          min={minSize}
          max={maxSize}
          step={100}
          ariaLabelledby="label-size"
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={state => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          pearling
          minDistance={100}
          />
          </div>
        )}


          <div className="line counter_line">
        <p className="counter_p">
        <span className="counter_number index">
        {`${currentProjs ? rmIndices.length.toString().padStart(2, '0') : '00'}`}
        </span> / <span className="counter_number length">{allProjects.length}</span>
        </p>
        </div>
        </section>
      )


    // }
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
