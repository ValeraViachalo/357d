import React, { useEffect, useRef, useState } from "react";
import "./RangeInput.scss";

export const DoubleRangeSlider = ({ 
  minValue = 0, 
  maxValue = 150000, 
  onChange,
  initialMin,
  initialMax 
}) => {
  const thumbLeftRef = useRef(null);
  const thumbRightRef = useRef(null);
  const rangeBetweenRef = useRef(null);
  const isInitialRender = useRef(true);
  const prevValues = useRef({ min: initialMin, max: initialMax });
  
  // Track internal state for the slider values
  const [startVal, setStartVal] = useState(initialMin);
  const [endVal, setEndVal] = useState(initialMax);

  const formatPrice = (price) => {
    return Math.round(price / 1000 / 10) * 10;
  };

  const setStartValueCustomSlider = (start, end) => {
    const maximum = Math.min(parseInt(start), parseInt(end) - 1);
    const percent = ((maximum - minValue) / (maxValue - minValue)) * 100;
    if (thumbLeftRef.current && rangeBetweenRef.current) {
      thumbLeftRef.current.style.left = `${percent}%`;
      rangeBetweenRef.current.style.left = `${percent}%`;
    }
  };

  const setEndValueCustomSlider = (end, start) => {
    const minimum = Math.max(parseInt(end), parseInt(start) + 1);
    const percent = ((minimum - minValue) / (maxValue - minValue)) * 100;
    if (thumbRightRef.current && rangeBetweenRef.current) {
      thumbRightRef.current.style.right = `${100 - percent}%`;
      rangeBetweenRef.current.style.right = `${100 - percent}%`;
    }
  };

  // Initialize the slider on mount
  useEffect(() => {
    if (isInitialRender.current) {
      setStartVal(initialMin);
      setEndVal(initialMax);
      setStartValueCustomSlider(initialMin, initialMax);
      setEndValueCustomSlider(initialMax, initialMin);
      prevValues.current = { min: initialMin, max: initialMax };
      isInitialRender.current = false;
    }
  }, [initialMin, initialMax]);

  // Update the slider when internal state changes - but don't include onChange in deps
  useEffect(() => {
    setStartValueCustomSlider(startVal, endVal);
    setEndValueCustomSlider(endVal, startVal);
    
    // Only notify parent if values actually changed and it's not the initial render
    if (!isInitialRender.current && 
        (prevValues.current.min !== startVal || prevValues.current.max !== endVal) && 
        onChange) {
      prevValues.current = { min: startVal, max: endVal };
      onChange({ min: startVal, max: endVal });
    }
  }, [startVal, endVal]); // Remove onChange from dependencies

  const handleStartChange = (e) => {
    const value = Math.min(Number(e.target.value), endVal - 1);
    setStartVal(value);
  };

  const handleEndChange = (e) => {
    const value = Math.max(Number(e.target.value), startVal + 1);
    setEndVal(value);
  };

  return (
    <div className="range-slider__wrapper">
      <div className="range-slider">
        <div className="range-labels">
          <span className="small-text range-label range-label-start">
            {formatPrice(startVal)}
          </span>
          <span className="small-text range-label range-label-end">
            {formatPrice(endVal)}
            {endVal === maxValue && "+"}
          </span>
        </div>

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={startVal}
          onChange={handleStartChange}
          onMouseOver={() => thumbLeftRef.current?.classList.add("hover")}
          onMouseOut={() => thumbLeftRef.current?.classList.remove("hover")}
          onMouseDown={() => thumbLeftRef.current?.classList.add("active")}
          onMouseUp={() => thumbLeftRef.current?.classList.remove("active")}
          onTouchStart={() => thumbLeftRef.current?.classList.add("active")}
          onTouchEnd={() => thumbLeftRef.current?.classList.remove("active")}
        />

        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={endVal}
          onChange={handleEndChange}
          onMouseOver={() => thumbRightRef.current?.classList.add("hover")}
          onMouseOut={() => thumbRightRef.current?.classList.remove("hover")}
          onMouseDown={() => thumbRightRef.current?.classList.add("active")}
          onMouseUp={() => thumbRightRef.current?.classList.remove("active")}
          onTouchStart={() => thumbRightRef.current?.classList.add("active")}
          onTouchEnd={() => thumbRightRef.current?.classList.remove("active")}
        />

        <div className="track-wrapper">
          <div className="track"></div>
          <div className="range-between" ref={rangeBetweenRef}></div>
          <div className="thumb left" ref={thumbLeftRef}></div>
          <div className="thumb right" ref={thumbRightRef}></div>
        </div>
      </div>
    </div>
  );
};