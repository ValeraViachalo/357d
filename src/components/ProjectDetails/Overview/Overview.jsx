import React, { useState, useRef, useEffect } from "react";

import "./Overview.scss";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { anim, ProjectsAnim } from "@/lib/helpers/anim";
import Image from "next/image";
import MapElement from "./MapElement/MapElement";

export const Overview = ({ data }) => {
  const interests = data?.interests;
  const [activeInterest, setActiveInterest] = useState(interests.list[0]);
  const mapRef = useRef(null);

  const handleInterestClick = (interest) => {
    setActiveInterest(interest);
    
    // Add this check to prevent errors
    if (mapRef.current) {
      try {
        mapRef.current.handleMarkerClick(interest);
      } catch (error) {
        console.error("Error handling interest click:", error);
      }
    }
  };

  return (
    <section className="overview">
      <div className="container">
        <div className="title">
          <p className="title__text">{data?.title?.identText}</p>
          <h1 className="title__title">{data?.title?.text}</h1>
        </div>
        <div className="interests">
          <div className="interests__list">
            <p>{interests?.title}</p>
            <div className="links">
              {interests.list.map((link, index) => (
                <div
                  key={index}
                  className={clsx("link__wrapper", {
                    "link__wrapper--active": activeInterest.slug === link.slug,
                  })}
                >
                  <button
                    className="link"
                    onClick={() => handleInterestClick(link)}
                  >
                    {link.name}
                  </button>
                  <p className="hover-text">{link?.farness}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="interests__content">
            <div className="image__wrapper">
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  className="image"
                  src={activeInterest.image}
                  key={activeInterest.slug}
                  {...anim(ProjectsAnim.slideshow)}
                />
              </AnimatePresence>
            </div>
            <MapElement
              ref={mapRef}
              mainMarker={interests.main}
              pointsOfInterest={interests.list}
              activeMarker={activeInterest}
              setActiveMarker={setActiveInterest}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
