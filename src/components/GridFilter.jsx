import { getCollection } from "astro:content";

import { atom } from "nanostores";

import "../styles/grid_controls.css";
import { useStore } from "@nanostores/react";
import {
  stateCurrentProjs,
  stateSelectedCat,
  stateSelectedTag,
  stateSelectedYear1,
  stateSelectedYear2,
  stateSelectedSize1,
  stateSelectedSize2,
} from "../states";
import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";

// const allProjects = await getCollection("projects");
const allCategories = await getCollection("categories");
const settings = await getCollection("settings");

function GridFilter(props) {
  const projects = props.allProjects;

  const settingsFilter = settings[0].data.filter;

  const settingFilterCat = settingsFilter.cat;
  const settingFilterTag = settingsFilter.tag;
  const settingFilterYear = settingsFilter.year;
  const settingFilterSize = settingsFilter.size;

  // console.log("Settings Filter:", settingsFilter , settingFilterCat );
  // console.log(allProjects[0]);

  // Get all categorie shorts from project collection

  const allCatsFromProjs = [
    ...new Set(
      projects.map(proj => {
        return proj.data.category;
      })
    ),
  ];

  // ----------------------------------
  // define allCats for select options
  // ----------------------------------
  const allTitlesFromCats = [
    ...new Set(
      allCategories.map(cat => {
        return cat.data.title;
      })
    ),
  ];

  const allCatsTitles = allTitlesFromCats.map(cat => cat.split(" ")[0]);
  // console.log("allCatsTitles", allCatsTitles)

  const allCatsURLs = [
    ...new Set(
      allCategories.map(cat => {
        return cat.data.short;
      })
    ),
  ];
  // console.log("allCatsURLs", allCatsURLs)

  // ----------------------------------
  // define allTags for select options; sort all Tags by lower/uppercase; Tags = Typologien
  // ----------------------------------

  const allTagsUnsorted = [
    ...new Set(projects.flatMap(proj => proj.data.project_keys?.tags ?? [])),
  ];

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

  // ----------------------------------------------
  // Parameter Definitions for Filter
  // ----------------------------------------------
  const defaultCat = settingFilterCat
    ? props.defaultCat
      ? props.defaultCat
      : "all"
    : "all";

  const selectedCat = useStore(stateSelectedCat);

  // console.log("defaultCat" , defaultCat, "selectedCat" ,selectedCat)
  const defaultTag = settingFilterTag
    ? props.defaultTag
      ? props.defaultTag
      : "all"
    : "all";
  const selectedTag = useStore(stateSelectedTag);

  const defaultYear1 = settingFilterYear
    ? props.defaultYear1
      ? props.defaultYear1
      : 0
    : 0;

  // console.log("defaultYear1", props.defaultYear1);
  // console.log("defaultYear1", defaultYear1);

  const selectedYear1 = useStore(stateSelectedYear1);
  // console.log("defaultYear1" , defaultYear1, "selectedYear1" ,selectedYear1)

  const defaultYear2 = settingFilterYear
    ? props.defaultYear2
      ? props.defaultYear2
      : 0
    : 0;
  const selectedYear2 = useStore(stateSelectedYear2);
  // console.log("defaultYear2" , defaultYear2, "selectedYear2" ,selectedYear2)

  const defaultSize1 = settingFilterSize
    ? props.defaultSize1
      ? props.defaultSize1
      : 0
    : 0;
  const selectedSize1 = useStore(stateSelectedSize1);
  // console.log("defaultSize1" , defaultSize1, "selectedSize1" ,selectedSize1)

  const defaultSize2 = settingFilterSize
    ? props.defaultSize2
      ? props.defaultSize2
      : 0
    : 0;
  const selectedSize2 = useStore(stateSelectedSize2);
  // console.log("defaultSize2" , defaultSize2, "selectedSize2" ,selectedSize2)

  const currentProjs = useStore(stateCurrentProjs);

  const isCatPage = defaultCat !== "all" ? true : false;
  // console.log ( "isCatPage", isCatPage )

  // ----------------------------------------------
  // Event (User Input) Handlers
  // ----------------------------------------------
  // was

  /*
  if(!settingFilterTag){ setSelectedTag("all"); }else { "" };
  if(!settingFilterYear){ setSelectedYear1(0); setSelectedYear2(0); }else { "" };
  if(!settingFilterSize){ setSelectedSize1(0); setSelectedSize2(0); }else { "" }; 
  */

  const handleCategoryChange = e => {
    stateSelectedCat.set(e.target.value);
    // console.log("this cat is requested:", e.target.value);
    // setSelectedCat(e.target.value);
  };

  const handleTagChange = e => {
    stateSelectedTag.set(e.target.value);
    // setSelectedTag(e.target.value)
    // console.log("TagChange:",selectedYear1, selectedYear2);
  };

  const handleYearChange = e => {
    stateSelectedYear1.set(e[0]);
    stateSelectedYear2.set(e[1]);
    // setSelectedYear1(e[0])
    // setSelectedYear2(e[1])
    // console.log("YearChange:",selectedYear1, selectedYear2);
  };

  const handleSizeChange = e => {
    stateSelectedSize1.set(e[0]);
    stateSelectedSize2.set(e[1]);
    // setSelectedSize1(e[0])
    // setSelectedSize2(e[1])
    // console.log("SizeChange:", selectedSize1, selectedSize2);
  };

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
    size2: selectedSize2,
  };

  // console.log( "FILTER PARAMS !!!!!!" , params);

  /* console.log(
    "FILTER INFOS of PROJS:",
    projects.map((proj,i) => (
  {
      index: i,
      title: proj.id,
      cat: proj.data.category,
      tags: proj.data.project_keys.tags,
      year1: proj.data.project_keys.year,
      year2: proj.data.project_keys.year2,
      size: proj.data.project_keys.area
    }
  ))); */

  let rmIndices = [];
  function filterProjectsByCriteria(projects, criteria) {
    rmIndices = projects.reduce((rmIndices, project, index) => {
      const projectTitle = project.data.title;
      const { cat, tags, year1, year2, size1, size2 } = criteria;
      const projectYear1 = project.data.project_keys.year;
      const projectYear2 = project.data.project_keys.year2;
      const projectSize = parseInt(project.data.project_keys.area);

      const hasCat =
        cat && cat !== "all" ? project.data.category === cat : true;
      const hasTag =
        tags && tags !== "all"
          ? project.data.project_keys.tags.includes(tags)
          : true;

      const inYearRange =
        year2 && year2 !== 0
          ? projectYear1 >= year1 && projectYear2 <= year2
          : true;

      /* console.log(
        project.slug,
        ":",
        "TEST Date:",
        projectYear1 >= year1 && projectYear2 <= year2 ? "true" : "falsch",
        "projectYear1",
        projectYear1,
        "year1",
        year1,
        "projectYear2",
        projectYear2,
        "year2",
        year2
      ); */

      const inSizeRange =
        projectSize >= 10000 && size2 == 10000
          ? true
          : size2 && size2 !== 0
            ? size1 <= projectSize && projectSize <= size2
            : true;

      console.log(
        index,
        projectTitle,
        ":",
        "hasCat",
        hasCat,
        "hasTag",
        hasTag,
        "inYearRange",
        inYearRange,
        "inSizeRange",
        inSizeRange
      );

      if (hasCat && hasTag && inYearRange && inSizeRange) {
        rmIndices.push(index);
      }
      // console.log("rmIndices", rmIndices)
      return rmIndices;
    }, []);
    return rmIndices;
  }

  filterProjectsByCriteria(projects, params);

  let projs = [];

  const filterProjects = () => {
    projs = projects.filter((_, index) => rmIndices.includes(index));
    stateCurrentProjs.set(projs);
  };

  useEffect(() => {
    filterProjects();
  }, [
    selectedCat,
    selectedTag,
    selectedYear1,
    selectedYear2,
    selectedSize1,
    selectedSize2,
    defaultCat,
  ]);

  // console.log('Projekte', currentProjs , 'gem. Parameter:' , params);

  /* console.log(
    "fiter var:" ,
    selectedCat,
    selectedTag,
    selectedYear1,
    selectedYear2,
    selectedSize1,
    selectedSize2,
  )
    console.log(
    "store vars:" ,
      useStore(stateSelectedCat),
      useStore(stateSelectedTag),
      useStore(stateSelectedYear1),
      useStore(stateSelectedYear2),
      useStore(stateSelectedSize1),
      useStore(stateSelectedSize2)
    ) */

  const handleToggle = () => {
    stateFilter.set(!tFilter);
  };
  // ----------------------------------------------
  // Returns
  // ----------------------------------------------

  // <p className="line test">filter: {selectedCat}, {selectedTag}, {selectedYear1}, {selectedYear2}, {selectedSize1}, {selectedSize2} </p>
  return (
    <div className="filterdiv">
      <button
        className="filter_close_btn"
        type="button"
        title="Hauptmenü schließen"
        aria-label="Hauptmenü schließen"
        onClick={handleToggle}
      >
        <svg className="svg-icon">
          <use id="icon-close" className="svg-icon-use" href="/svg.svg#close" />
        </svg>
      </button>

      <div className="line select_line" onClick={e => e.stopPropagation()}>
        {settingFilterCat && !isCatPage && (
          <select
            className="select select_cat"
            onChange={handleCategoryChange}
            defaultValue={defaultCat}
          >
            <option value="all">Kategorien (alle)</option>
            padding: 2px;
            {allCatsTitles.map((cat, indexCat) => (
              <option key={indexCat} value={allCatsURLs[indexCat]}>
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
              <option key={indexTag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        )}
      </div>

      {settingFilterYear && (
        <div className="line" onClick={e => e.stopPropagation()}>
          <label id="label-year">Jahr</label>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            withTracks={true}
            defaultValue={[defaultYear1, defaultYear2]}
            onChange={handleYearChange}
            markClassName="slider-marks"
            marks={[1980, 1990, 2000, 2010, 2020]}
            min={1980}
            max={2023}
            ariaLabelledby="label-year"
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            pearling
            minDistance={1}
          />
        </div>
      )}

      {settingFilterSize && (
        <div className="line" onClick={e => e.stopPropagation()}>
          <label id="label-size">Fläche</label>

          <ReactSlider
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            defaultValue={[defaultSize1, defaultSize2]}
            onChange={handleSizeChange}
            markClassName="slider-marks"
            marks={[
              0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
            ]}
            min={minSize}
            max={maxSize}
            step={100}
            ariaLabelledby="label-size"
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            pearling
            minDistance={100}
          />
        </div>
      )}
    </div>
  );
}
export default GridFilter;
