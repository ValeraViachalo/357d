"use client";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import "./RevealingItem.scss";

export const RevealingItem = ({ title, text, openedIndex, setOpenedIndex, index }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const handleOnClick = () => {
    if (openedIndex !== index) {
      setOpenedIndex(index);
    } else {
      setOpenedIndex(null);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      // Convert pixel height to vw
      const pixelHeight = contentRef.current.scrollHeight;
      const vwHeight = (pixelHeight / window.innerWidth) * 100;
      setHeight(openedIndex === index ? vwHeight + 1 : 0);
    }
  }, [openedIndex, index]);

  return (
    <div
      className={clsx("revealing-item", {
        "revealing-item__active": openedIndex === index,
      })}
    >
      <h2 className="head" onClick={handleOnClick}>
        {title}
        <span className="icon icon--plus"></span>
      </h2>
      <div 
        className="body" 
        style={{
          height: `${height}vw`,
        }}
      >
        <div ref={contentRef} className="body__content" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
};
