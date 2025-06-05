import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Gallery.scss";
import clsx from "clsx";

const SLIDE_DURATION = 1.3; // seconds
const AUTO_SLIDE_DELAY = 3000; // ms

const slideVariants = {
  initial: (direction) => ({
    // x: direction === "right" ? "10%" : "-10%",
    zIndex: 1,
    clipPath:
      direction === "right" ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
  }),
  animate: {
    x: 0,
    zIndex: 2,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: SLIDE_DURATION, ease: [0.07, 0.5, 0.19, 1] },
  },
  exit: (direction) => ({
    // x: direction === "right" ? "-10%" : "10%",
    zIndex: 1,
    clipPath:
      direction !== "right" ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
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
      if (isAnimating) return; // Block if animating
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
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={active}
            className="slide__image"
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <img
              src={images[active]}
              alt={`Slide ${active + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
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
