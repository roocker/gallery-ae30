import { getCollection } from 'astro:content';
import '../styles/grid_controls.css'
import SlideshowCounter from './SlideshowCounter';
import { useStore } from '@nanostores/react';
import { stateCurrentProjs, stateSelCatIndex, stateSelectedCat,} from '../states';
import { useEffect } from 'react';

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

// define allCats for select options 

const allTitlesFromCats = [... new Set(allCategories.map((cat) => {return cat.data.title}))];

const allCatsTitles = allTitlesFromCats.map(cat => cat.split(' ')[0]);
// console.log("allCatsTitles", allCatsTitles)

const allCatsURLs = [... new Set(allCategories.map((cat) => {return cat.data.short}))]
// console.log("allCatsURLs", allCatsURLs)


// const allCats = allProjects.data.category;


  function GridControls (props) {

    let index = "00";
    const defaultCat = props.defaultCat;  
    const defaultTag = props.defaultTag;  
    const defaultYear = props.defaultYear;
    const defaultSize = props.defaultSize;

    const selectedCat = useStore(stateSelectedCat)
    const selCatIndex = useStore(stateSelCatIndex)
    const currentProjs = useStore(stateCurrentProjs)
    
    const handleCategoryChange = (e) => {
      stateSelectedCat.set(e.target.value)
      console.log("e.target.value", e.target.value)
    };

    let indeciesBySelCat;
    useEffect(() => {
      console.log( "selectedCat now", selectedCat , "projects:", stateSelCatIndex)

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
      
      indeciesBySelCat ? stateSelCatIndex.set(indeciesBySelCat) && console.log("stateSelCatIndex=", indeciesBySelCat): console.log("asdfasdf");
      



    }, [selectedCat])





    return(
      <section className="controls" aria-label="Image Grid Controls">
      <p className="line test">live output without full site reload: {selectedCat}</p>

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


      <p className="line counter_line">
      <span className="counter_number index">{`${currentProjs ?
      currentProjs.length: "0"} `}
</span> / <span className="counter_number length">{allProjects.length}</span>
      </p>
      </section>
    )


  }
export default GridControls
