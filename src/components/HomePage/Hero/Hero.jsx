"use client";
import { Logo } from "@/utils/Logo/Logo";
import React, { useEffect, useState } from "react";

import "./Hero.scss";
import { anim, ContactTitle } from "@/lib/helpers/anim";
import { AnimatePresence, motion } from "framer-motion";
import { Content } from "@/utils/Content/Content";

export default function HeroHome() {
  return (
    <section className="hero container">
      <div className="top">
        <Logo className="hero__logo" />
        <h1 className="hero__title upperCase">
          {/* <span className="hero__title--line">Estate</span> */}
          <AnimTitle
            titles={[
              "Estate",
              "INVESTMENT",
              "SOLUTIONS",
              "PARTNERSHIP",
              "iNNOVATIONS",
              "QUALITY",
              "address",
            ]}
          />
          <span className="hero__title--line bold">TO BE PROUD OF</span>
        </h1>
      </div>
      <div className="hero__video">
        <Content
          url="/images/home/MainComp_1.webm"
        />
      </div>
    </section>
  );
}

const AnimTitle = ({ titles }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <div className="title-anim__wrapper">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.h1
          className="title-anim"
          key={titles[activeIndex]}
          aria-label={titles[activeIndex]}
        >
          {titles[activeIndex].split("").map((currL, i) => (
            <motion.span
              key={i}
              style={{ display: "inline-block" }}
              {...anim(ContactTitle)}
              custom={(i / titles[activeIndex].split("").length) * 0.08}
              className="bold"
            >
              {currL}
            </motion.span>
          ))}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};
