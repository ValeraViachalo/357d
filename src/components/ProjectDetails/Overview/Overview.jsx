import React, { useState, useRef, useEffect } from "react";

import "./Overview.scss";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { anim, ProjectsAnim } from "@/lib/helpers/anim";
import Image from "next/image";
import MapElement from "./MapElement/MapElement";

  const slideVariants = {
    active: {
      x: 0,
      opacity: 1,
      filter: "blur(0vw)",
      zIndex: 2,
      transition: { duration: 0.5, ease: [0.07, 0.5, 0.19, 1] },
    },
    inactive: (slideDirection) => ({
      x: "10%",
      opacity: 0,
      filter: "blur(.9vw)",
      zIndex: 1,
      transition: { duration: 0.5, ease: [0.07, 0.5, 0.19, 1] },
    }),
  };

export const Overview = ({ data }) => {
  const interests = data?.interests;
  const [activeInterest, setActiveInterest] = useState({...interests.list[0], index: 0});
  const mapRef = useRef(null);

  const handleInterestClick = (interest, index) => {
    setActiveInterest({interest, index});

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
          <p className="title__text">{data?.title?.text}</p>
          <h1 className="title__title">{data?.title?.identText}</h1>
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
                    onClick={() => handleInterestClick(link, index)}
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
              {interests.list.map((interest, index) => (
                <motion.div
                  className={clsx("image", {
                    "image--active": activeInterest.slug === interest.slug,
                  })}
                  key={index}
                  variants={slideVariants}
                  animate={activeInterest.slug === interest.slug ? "active" : "inactive"}
                >
                  <Image
                    src={interest.image}
                    alt={interest.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              ))}
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
