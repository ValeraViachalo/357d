import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { anim, BluredPresence, ProjectsAnim } from "@/lib/helpers/anim";
import { DoubleRangeSlider } from "./RangeInput/RangeInput";

import "./Filters.scss";
import clsx from "clsx";

const getPriceRange = (projectsList) => {
  const prices = projectsList.map((item) => {
    // Handle price format by removing spaces and converting to number
    const priceValue = item.price.value.replace(/\s/g, "");
    return parseInt(priceValue);
  });
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

export const Filters = ({
  data,
  worksList,
  setWorksList,
  activeFilters,
  setActiveFilters,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [height, setHeight] = useState(0);

  // #region
  const contentRef = useRef(null);
  const originalProjects = useRef(data.lists);
  const priceRangeInfo = useRef(getPriceRange(data.lists));

  // Use the refs for initial state
  const [priceRange, setPriceRange] = useState({
    min: priceRangeInfo.current.min,
    max: priceRangeInfo.current.max,
  });
  const [startValue, setStartValue] = useState(priceRangeInfo.current.min);
  const [endValue, setEndValue] = useState(priceRangeInfo.current.max);

  const applyFilters = useCallback(() => {
    let filteredProjects = [...originalProjects.current];

    // Filter by type
    if (activeFilters.type) {
      filteredProjects = filteredProjects.filter(
        (item) => item.type.toLowerCase() === activeFilters.type.toLowerCase()
      );
    }

    // Filter by bedrooms
    if (activeFilters.bedrooms) {
      if (activeFilters.bedrooms === "more-4") {
        // Filter for 4+ bedrooms
        filteredProjects = filteredProjects.filter(
          (item) => item.bedrooms.value >= 4
        );
      } else {
        // Filter for specific bedroom count
        filteredProjects = filteredProjects.filter(
          (item) => item.bedrooms.value.toString() === activeFilters.bedrooms
        );
      }
    }

    // Filter by availability
    if (showOnlyAvailable) {
      filteredProjects = filteredProjects.filter((item) => item.avialable);
    }

    // Filter by price range
    if (
      priceRange.min !== priceRangeInfo.current.min ||
      priceRange.max !== priceRangeInfo.current.max
    ) {
      filteredProjects = filteredProjects.filter((item) => {
        const priceValue = parseInt(item.price.value.replace(/\s/g, ""));
        return priceValue >= priceRange.min && priceValue <= priceRange.max;
      });
    }

    setWorksList(filteredProjects);
  }, [activeFilters, showOnlyAvailable, priceRange, setWorksList]); // Remove minPrice and maxPrice from dependencies

  // Initialize only once when component mounts
  useEffect(() => {
    // Save original data
    originalProjects.current = data.lists;

    // Initial filter application
    applyFilters();
  }, []); // Empty dependency array means "run only once on mount"

  // Apply filters when filter parameters change
  useEffect(() => {
    applyFilters();
  }, [activeFilters, showOnlyAvailable, priceRange]);

  useEffect(() => {
    if (contentRef.current) {
      // Convert pixel height to vw
      const pixelHeight = contentRef.current.scrollHeight;
      const vwHeight = (pixelHeight / window.innerWidth) * 100;
      setHeight(isOpened ? vwHeight + 1 : 0);
    }
  }, [isOpened]);

  const updateFilter = (filterType, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[filterType] === value) {
      newFilters[filterType] = "";
    } else {
      newFilters[filterType] = value;
    }
    setActiveFilters(newFilters);
  };

  const toggleAvailability = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
  };

  const clearAllFilters = () => {
    setActiveFilters({ type: "", bedrooms: "" });
    setShowOnlyAvailable(true);
    setPriceRange({
      min: priceRangeInfo.current.min,
      max: priceRangeInfo.current.max,
    });
    setStartValue(priceRangeInfo.current.min);
    setEndValue(priceRangeInfo.current.max);
    setWorksList([...originalProjects.current]);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setStartValue(range.min);
    setEndValue(range.max);
  };

  const anyFiltersActive =
    activeFilters.type ||
    activeFilters.bedrooms ||
    priceRange.min !== priceRangeInfo.current.min ||
    priceRange.max !== priceRangeInfo.current.max;

  // #endregion

  return (
    <section className={clsx("filters", { "filters--active": isOpened })}>
      <div className="top table-grid">
        <label className="availability-toggle">
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={toggleAvailability}
            style={{ display: "none" }}
          />
          <span className={clsx("toggle-checkbox", {
            "toggle-checkbox--active": showOnlyAvailable
          })}></span>
          <span className="toggle-text">{data.filters.aviableText}</span>
        </label>
        <button className="filter__button" onClick={() => setIsOpened(!isOpened)}>
          {data.filters.type.title}
          <span className="shadow">{isOpened ? ` (-)` :` (+)`}</span>
        </button>
        <button className="filter__button" onClick={() => setIsOpened(!isOpened)}>
          {data.filters.bedrooms.title}
          <span className="shadow">{isOpened ? ` (-)` :` (+)`}</span>
        </button>
        <button className="filter__button" onClick={() => setIsOpened(!isOpened)}>
          {data.filters.budget.title}
          <span className="shadow">{isOpened ? ` (-)` :` (+)`}</span>
        </button>
      </div>

      <motion.div
        className={clsx("filters-body table-grid", {
          "filters-body--active": isOpened,
        })}
        style={{
          height: `${height}vw`,
        }}
        ref={contentRef}
      >
        <div className="filters-body__wrapper">
          <motion.div
            className="filter-wrapper"
            variants={BluredPresence}
            initial="initial"
            animate={isOpened ? "animate" : "initial"}
            custom={{ id: 1, duration: 1 }}
          >
            <div className="options">
              <button
                onClick={() => updateFilter("type", "")}
                className={clsx("link", {
                  "link--active": activeFilters.type === "",
                })}
              >
                <span className="link-text">
                  {data.filters.type.reset.text}
                </span>
              </button>

              {data.filters.type.filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => updateFilter("type", filter.slug)}
                  className={clsx("link", {
                    "link--active": activeFilters.type === filter.slug,
                  })}
                >
                  <span className="link-text">{filter.text}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="filter-wrapper"
            variants={BluredPresence}
            initial="initial"
            animate={isOpened ? "animate" : "initial"}

            custom={{ id: 2, duration: 1 }}
          >
            <div className="options">
              <button
                onClick={() => updateFilter("bedrooms", "")}
                className={clsx("link", {
                  "link--active": activeFilters.bedrooms === "",
                })}
              >
                <span className="link-text">
                  {data.filters.bedrooms.reset.text}
                </span>
              </button>

              {data.filters.bedrooms.filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => updateFilter("bedrooms", filter.slug)}
                  className={clsx("link", {
                    "link--active": activeFilters.bedrooms === filter.slug,
                  })}
                >
                  <span className="link-text">{filter.text}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="filter-range"
            variants={BluredPresence}
            initial="initial"
            animate={isOpened ? "animate" : "initial"}
            custom={{ id: 3, duration: 1 }}
          >
            <div className="filter-range__wrapper">
              <DoubleRangeSlider
                minValue={priceRangeInfo.current.min}
                maxValue={priceRangeInfo.current.max}
                onChange={handlePriceRangeChange}
                initialMin={startValue}
                initialMax={endValue}
              />
            </div>
          </motion.div>
        </div>

        <button
          onClick={clearAllFilters}
          className={clsx("clear-button", {
            "clear-button--active": anyFiltersActive,
          })}
        >
          <svg
            className="clear-button-icon"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1.5L8.5 8.5L16 1.5" stroke="black" strokeWidth="1.4" />
            <path
              d="M1 15.5L8.5 8.5L16 15.5"
              stroke="black"
              strokeWidth="1.4"
            />
          </svg>

          <span className="link-text">{data.filters.clear.title}</span>
        </button>
      </motion.div>
    </section>
  );
};
