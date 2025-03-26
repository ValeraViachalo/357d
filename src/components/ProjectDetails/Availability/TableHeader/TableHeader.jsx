"use client";
import clsx from "clsx";
import React, { useState, useRef } from "react";

import "./TableHeader.scss";

export const TableHeader = ({ tableHeader, projectsList, setProjectsList, activeSort, setActiveSort }) => {
  
  
  // Store original list order to reset when needed
  // const originalList = useRef([...projectsList]);

  const handleSort = (key) => {
    // If clicking the same column that's currently active
    if (activeSort.value === key) {
      // If not already reversed, reverse the sort
      if (!activeSort.revert) {
        const reversedList = [...projectsList].reverse();
        setActiveSort({ value: key, revert: true });
        setProjectsList(reversedList);
      } 
      // If already reversed, reset to original order (third click)
      else {
        setActiveSort({ value: null, revert: false });
        setProjectsList([...projectsList]);
      }
    } 
    // If clicking a new column
    else {
      const sortedList = [...projectsList].sort((a, b) => {
        if (a[key].value > b[key].value) return 1;
        if (a[key].value < b[key].value) return -1;
        return 0;
      });

      setActiveSort({ value: key, revert: false });
      setProjectsList([...sortedList]);
    }
  };

  return (
    <div className="table-header table-grid">
      <span className="shadow">{tableHeader?.type}</span>
      <span></span>
      <Item
        item={tableHeader?.bedrooms}
        activeSort={activeSort}
        handleSort={handleSort}
      />
      <Item
        item={tableHeader?.bathroom}
        activeSort={activeSort}
        handleSort={handleSort}
      />
      <Item
        item={tableHeader?.floor}
        activeSort={activeSort}
        handleSort={handleSort}
      />
      <Item
        item={tableHeader?.area}
        activeSort={activeSort}
        handleSort={handleSort}
      />
      <Item
        item={tableHeader?.price}
        activeSort={activeSort}
        handleSort={handleSort}
      />
    </div>
  );
};

const Item = ({ item, activeSort, handleSort }) => {
  return (
    <span
      className={clsx("table-header__item", {
        "table-header__item--active": activeSort.value === item.value,
        "table-header__item--revert": activeSort.value === item.value && activeSort.revert,
      })}
      onClick={() => handleSort(item.value)}
    >
      {item.text}
      <svg
        width="8"
        height="14"
        className="table-header__item-icon"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.15694 7.71163L1.49994 13.3686L0.0859375 11.9546L5.03594 7.00462L0.0859375 2.05463L1.49994 0.640625L7.15694 6.29763C7.34441 6.48515 7.44972 6.73946 7.44972 7.00462C7.44972 7.26979 7.34441 7.5241 7.15694 7.71163Z"
          fill="black"
        />
      </svg>
    </span>
  );
};
