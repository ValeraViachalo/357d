import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

import "./Gallery.scss";
import clsx from "clsx";

const SLIDE_DURATION = 0.5; // seconds
const AUTO_SLIDE_DELAY = 3000; // ms

const slideVariants = {
  active: {
    x: 0,
    opacity: 1,
    filter: "blur(0vw)",
    zIndex: 2,
    transition: { duration: SLIDE_DURATION, ease: [0.07, 0.5, 0.19, 1] },
  },
  inactive: (slideDirection) => ({
    x: slideDirection === "right" ? "10%" : "-10%",
    opacity: 0,
    filter: "blur(.9vw)",
    zIndex: 1,
    transition: { duration: SLIDE_DURATION, ease: [0.07, 0.5, 0.19, 1] },
  }),
};

export default function Gallery({ data }) {
  const images = data.images;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoSlideRef = useRef();

  // Helper function to determine slide direction relative to active slide
  const getSlideDirection = useCallback((slideIndex, activeIndex, totalSlides) => {
    if (slideIndex === activeIndex) return "right"; // fallback for active slide
    
    // Calculate distances in both directions (accounting for circular nature)
    const forwardDistance = (slideIndex - activeIndex + totalSlides) % totalSlides;
    const backwardDistance = (activeIndex - slideIndex + totalSlides) % totalSlides;
    
    // Choose the shorter path to determine direction
    if (forwardDistance <= backwardDistance) {
      return "right"; // slide is ahead in sequence
    } else {
      return "left"; // slide is behind in sequence
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goToSlide(active - 1, "left");
      if (e.key === "ArrowRight") goToSlide(active + 1, "right");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  // Drag/swipe support
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) goToSlide(active + 1, "right");
    else if (info.offset.x > 100) goToSlide(active - 1, "left");
  };

  // Slide navigation
  const goToSlide = useCallback(
    (index, dir) => {
      setDirection(dir);
      setActive((prev) => {
        if (index < 0) return images.length - 1;
        if (index >= images.length) return 0;
        return index;
      });
      setIsAnimating(true); // Start animation
    },
    [images.length, isAnimating]
  );

  return (
    <div
      className="gallery"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      {/* Slides */}
      <div className="slide">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="slide__image"
            variants={slideVariants}
            animate={active === index ? "active" : "inactive"}
            custom={getSlideDirection(index, active, images.length)}
            drag={active === index ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            onAnimationComplete={() => setIsAnimating(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
              }}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <button
        data-image-button="prev"
        className="slider-btn slider-btn--prev"
        onClick={() => goToSlide(active - 1, "left")}
        aria-label="Previous Slide"
      ></button>
      <button
        data-image-button="next"
        className="slider-btn slider-btn--next"
        onClick={() => goToSlide(active + 1, "right")}
        aria-label="Next Slide"
      ></button>

      <div className="pagination">
        {images.map((_, index) => (
          <button
            key={index}
            className={clsx("pagination__dot", {
              "pagination__dot--active": active === index,
            })}
            onClick={() => goToSlide(index, index > active ? "right" : "left")}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}