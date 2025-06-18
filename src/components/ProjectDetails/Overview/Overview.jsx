import React, { useState, useRef, useEffect } from "react";
import "./Overview.scss";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from 'next/dynamic';

const MapElement = dynamic(
  () => import('./MapElement/MapElement'),
  { 
    ssr: false,
    loading: () => <p>Loading map...</p>
  }
);

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
  const interests = data?.interests || { list: [] };
  const [activeInterest, setActiveInterest] = useState(
    interests.list.length > 0 
      ? {...interests.list[0], index: 0}
      : null
  );
  const mapRef = useRef(null);

  const handleInterestClick = (interest, index) => {
    setActiveInterest({...interest, index});

    if (mapRef.current) {
      try {
        mapRef.current.handleMarkerClick(interest);
      } catch (error) {
        console.error("Error handling interest click:", error);
      }
    }
  };

  // Handle case where interests.list is empty
  if (!activeInterest && interests.list.length > 0) {
    setActiveInterest({...interests.list[0], index: 0});
  }

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
                    "link__wrapper--active": activeInterest?.slug === link.slug,
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
                    "image--active": activeInterest?.slug === interest.slug,
                  })}
                  key={index}
                  variants={slideVariants}
                  animate={activeInterest?.slug === interest.slug ? "active" : "inactive"}
                >
                  <Image
                    src={interest.image}
                    alt={interest.name || "Interest Image"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              ))}
            </div>
            {interests.list.length > 0 && (
              <MapElement
                ref={mapRef}
                mainMarker={interests.main}
                pointsOfInterest={interests.list}
                activeMarker={activeInterest}
                setActiveMarker={setActiveInterest}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};