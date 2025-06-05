import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

import "./NewFilters.scss";
import { BluredPresence } from "@/lib/helpers/anim";
import { motion } from "framer-motion";

export const NewFilters = ({
  data,
  worksList,
  setWorksList,
  activeFilters,
  setActiveFilters,
}) => {
  const [isOpened, setIsOpened] = useState(null);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [inputPrice, setInputPrice] = useState({ min: 0, max: 0 });
  const originalProjects = useRef(data.lists);
  const debounceTimeout = useRef(null);

  const toggleAvailability = () => {
    setShowOnlyAvailable(!showOnlyAvailable);
  };

  // Fixed toggle function with proper event handling
  const toggleFilter = (filterType, e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpened(prevState => prevState === filterType ? null : filterType);
  };

  const updateFilter = (filterType, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[filterType] === value) {
      newFilters[filterType] = "";
    } else {
      newFilters[filterType] = value;
    }
    setActiveFilters(newFilters);
  };

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
      activeFilters.priceMin !== undefined &&
      activeFilters.priceMax !== undefined &&
      activeFilters.priceMin !== null &&
      activeFilters.priceMax !== null
    ) {
      filteredProjects = filteredProjects.filter((item) => {
        const priceValue = parseInt(item.price.value.replace(/\s/g, ""));
        return (
          priceValue >= activeFilters.priceMin &&
          priceValue <= activeFilters.priceMax
        );
      });
    }

    setWorksList(filteredProjects);
  }, [activeFilters, showOnlyAvailable, setWorksList]);

  useEffect(() => {
    applyFilters();
  }, [activeFilters, showOnlyAvailable]);

  // Calculate min/max price from projects list on mount
  useEffect(() => {
    if (!originalProjects.current || !originalProjects.current.length) return;
    const prices = originalProjects.current.map((item) =>
      parseInt(item.price.value.replace(/\s/g, ""))
    );
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    setPriceRange({ min, max });
    setInputPrice({ min: Math.floor(min / 1000), max: Math.ceil(max / 1000) });
  }, [data.lists]);

  // Debounced update for price filter (convert to real value)
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setActiveFilters((prev) => ({
        ...prev,
        priceMin: inputPrice.min * 1000,
        priceMax: inputPrice.max * 1000,
      }));
    }, 1000);
    return () => clearTimeout(debounceTimeout.current);
  }, [inputPrice.min, inputPrice.max]);

  // Close popup on outside click or ESC
  const popupRefs = useRef({});
  useEffect(() => {
    if (!isOpened) return;
    
    function handleClick(e) {
      const ref = popupRefs.current[isOpened];
      // Check if click is outside the entire filter wrapper, not just the popup
      const filterWrapper = ref?.closest('.filter-wrapper');
      if (filterWrapper && !filterWrapper.contains(e.target)) {
        setIsOpened(null);
      }
    }
    
    function handleEsc(e) {
      if (e.key === "Escape") setIsOpened(null);
    }
    
    // Add slight delay to prevent immediate closing
    setTimeout(() => {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
    }, 0);
    
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpened]);

  return (
    <div className="filters">
      <div className="filter-wrapper">
        <button
          className={clsx("filter__button upperCase", {
            "filter__button--active": isOpened === "bedrooms",
          })}
          onClick={(e) => toggleFilter("bedrooms", e)}
          type="button"
        >
          {data.filters.bedrooms.title}
          <span className="icon icon--arrow-down" />
        </button>
        <motion.div
          ref={(el) => (popupRefs.current["bedrooms"] = el)}
          className={clsx("filter-body", {
            "filter-body--active": isOpened === "bedrooms",
          })}
        >
          <button
            type="button"
            onClick={() => updateFilter("bedrooms", "")}
            className={clsx("link link--reset", {
              "link--active": activeFilters.bedrooms === "",
            })}
            role="radio"
            aria-checked={activeFilters.bedrooms === ""}
          >
            <span className="link-radio">
              <span
                className={clsx("link-radio-dot", {
                  "link-radio-dot--active": activeFilters.bedrooms === "",
                })}
              />
            </span>
            <span className="link-text">
              {data.filters.bedrooms.reset.text}
            </span>
          </button>

          {data.filters.bedrooms.filters.map((filter, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                activeFilters.bedrooms === filter.slug
                  ? updateFilter("bedrooms", "") // Reset if already active
                  : updateFilter("bedrooms", filter.slug)
              }
              className={clsx("link", {
                "link--active": activeFilters.bedrooms === filter.slug,
              })}
              role="radio"
              aria-checked={activeFilters.bedrooms === filter.slug}
            >
              <span className="link-radio">
                <span
                  className={clsx("link-radio-dot", {
                    "link-radio-dot--active":
                      activeFilters.bedrooms === filter.slug,
                  })}
                />
              </span>
              <span className="link-text">{filter.text}</span>
            </button>
          ))}
        </motion.div>
      </div>
      
      <div className="filter-wrapper">
        <button
          className={clsx("filter__button upperCase", {
            "filter__button--active": isOpened === "price",
          })}
          onClick={(e) => toggleFilter("price", e)}
          type="button"
        >
          {data.filters.budget.title}
          <span className="icon icon--arrow-down" />
        </button>

        <motion.div
          ref={(el) => (popupRefs.current["price"] = el)}
          className={clsx("filter-body", {
            "filter-body--active": isOpened === "price",
          })}
        >
          <div className="price-popup-inputs">
            <label>
              <span>Min</span>
              <div className="input-wrapper">
                <input
                  type="number"
                  min={Math.floor(priceRange.min / 1000)}
                  max={inputPrice.max}
                  value={inputPrice.min}
                  onChange={(e) =>
                    setInputPrice((prev) => ({
                      ...prev,
                      min: Number(e.target.value),
                    }))
                  }
                  className="input"
                />
                <span className="input-currency">€k</span>
              </div>
            </label>
            <label>
              <span>Max</span>
              <div className="input-wrapper">
                <input
                  type="number"
                  min={inputPrice.min}
                  max={Math.ceil(priceRange.max / 1000)}
                  value={inputPrice.max}
                  onChange={(e) =>
                    setInputPrice((prev) => ({
                      ...prev,
                      max: Number(e.target.value),
                    }))
                  }
                  className="input"
                />
                <span className="input-currency">€k</span>
              </div>
            </label>
            {(inputPrice.min !== Math.floor(priceRange.min / 1000) ||
              inputPrice.max !== Math.ceil(priceRange.max / 1000)) && (
              <button
                type="button"
                className="price-popup-clear"
                onClick={() =>
                  setInputPrice({
                    min: Math.floor(priceRange.min / 1000),
                    max: Math.ceil(priceRange.max / 1000),
                  })
                }
              >
                {data.filters.budget.reset?.text || "Clear"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
      
      <label className="availability-toggle">
        <input
          type="checkbox"
          checked={showOnlyAvailable}
          onChange={toggleAvailability}
          style={{ display: "none" }}
        />
        <span
          className={clsx("toggle-checkbox", {
            "toggle-checkbox--active": showOnlyAvailable,
          })}
        ></span>
        <span className="toggle-text upperCase">{data.filters.aviableText}</span>
      </label>
    </div>
  );
};