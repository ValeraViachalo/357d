import { useScroll, useSpring, motion, useTransform } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { anim } from "@/lib/helpers/anim";

import "./ScrollBar.scss";
import { ScrollContext } from "@/lib/providers/ScrollProvider/context";

const presence = {
  initial: {
    x: "100%"
  },
  animate: {
    x: "0%",
    transition: {
      duration: .3,
      delay: .3
    }
  },
  exit: {
    x: "100%",
    transition: {
      duration: .3,
    }
  }
}

export const ScrollBar = ({}) => {
  const [rangeValue, setRangeValue] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 100,
  });
  const y = useTransform(scrollSpring, [0, 1], ["0%", "-100%"]);
  const top = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);

  const { rangeScrollTo } = useContext(ScrollContext);

  useEffect(() => {
    setIsMounted(true);
    setDocumentHeight(
      document.documentElement.scrollHeight - window.innerHeight
    );
  }, []);

  const handleRangeChange = (e) => {
    const value = e.target.value;
    setRangeValue(value);
    const scrollTo = (documentHeight * value) / 100;
    rangeScrollTo(scrollTo);
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setRangeValue(v * 100);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <motion.div
      {...anim(presence)}
      className="progressBar"
      data-desktop-element
    >
      <motion.div className="progressBar__bar" style={{ top, y }} />
      <input
        type="range"
        min="0"
        max="100"
        value={rangeValue}
        onChange={handleRangeChange}
        className="progressBar__range"
      />
    </motion.div>
  );
};
