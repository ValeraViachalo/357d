"use client";
import React, { useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./LangSwitch.scss";
// import { LinkPageTransition } from "@/utils/LinkPageTransition/LinkPageTransition";

export const LangSwitch = () => {
  const path = usePathname();

  const isGrePath = path.startsWith("/gre");
  const currentPath = isGrePath ? path.replace("/gre", "") : path;
  const grePath = `/gre${currentPath}`;
  const engPath = currentPath;

  return (
    <DropDown
      headText={isGrePath ? "GR" : "EN"}
    >
      <div className="dropdown__content">
        <Link href={isGrePath ? (engPath || "/") : grePath} className="dropdown__link">
          <p className="small-text">{isGrePath ? "EN" : "GR"}</p>
        </Link>
      </div>
    </DropDown>
  );
};

const DropDown = ({ headText, children, ...rest }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <div
      className={clsx("dropdown", {
        "dropdown--active": isHovered,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <div className="dropdown__head small-text">
        {headText}{" "}
          <svg
            className="icon"
            viewBox="0 0 17 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L8.5 8L16 1" strokeWidth="1.4" />
          </svg>
      </div>
      <div
        className={clsx("dropdown__wrapper", {
          "dropdown__wrapper--active": isHovered,
        })}
      >
        {children}
      </div>
    </div>
  );
};
